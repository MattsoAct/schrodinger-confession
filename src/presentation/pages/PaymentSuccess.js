// src/pages/PaymentSuccess.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../infrastructure/storage/supabase.js';
import { PortOnePaymentServiceV2 } from '../../infrastructure/api/PortOnePaymentServiceV2.js';
import '../styles/payment-result-schro.css';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationResult, setVerificationResult] = useState(null);
  const navigate = useNavigate();

  // 포트원과 토스페이먼츠 모두 지원
  const paymentId = searchParams.get('paymentId') || searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!paymentId || !orderId || !amount) {
        setVerificationResult({ success: false, message: '결제 정보가 올바르지 않습니다.' });
        setIsVerifying(false);
        return;
      }

      try {
        // 테스트 결제 ID 처리 (localhost 환경)
        if (paymentId.startsWith('DemoTest_') || paymentId.startsWith('test_payment_')) {
          console.log('🧪 테스트 결제 모드 - 편지 저장 및 알림 전송 진행');
          
          // 세션스토리지에서 편지 데이터 가져오기
          const letterDataString = sessionStorage.getItem('pendingLetter_' + orderId);
          let letterData = null;
          
          if (letterDataString) {
            try {
              letterData = JSON.parse(letterDataString);
              console.log('📧 편지 데이터 확인:', letterData);
            } catch (error) {
              console.error('편지 데이터 파싱 실패:', error);
              setVerificationResult({ 
                success: false, 
                message: '편지 데이터를 읽을 수 없습니다.' 
              });
              setIsVerifying(false);
              return;
            }
          } else {
            console.error('편지 데이터가 세션스토리지에 없습니다.');
            setVerificationResult({ 
              success: false, 
              message: '편지 데이터를 찾을 수 없습니다.' 
            });
            setIsVerifying(false);
            return;
          }

          // 편지 데이터를 Supabase에 저장
          try {
            console.log('💾 Supabase에 편지 저장 시도...');
            
            const dbLetterData = {
              ...letterData,
              letter_type: letterData.letter_type === 'email' || letterData.letter_type === 'sms' ? 'premium' : 'basic',
              payment_id: null // 무료 계정은 payment_id 없음
            };

            const { data: letterDbData, error: letterError } = await supabase
              .from('confessions')
              .insert([dbLetterData])
              .select()
              .single();

            if (letterError) {
              console.error('❌ 편지 저장 실패:', letterError);
              setVerificationResult({ 
                success: false, 
                message: `편지 저장에 실패했습니다: ${letterError.message}` 
              });
              setIsVerifying(false);
              return;
            }

            console.log('✅ 편지 저장 성공:', letterDbData);

            // 알림 전송
            try {
              console.log('📨 알림 전송 시작, letter_type:', letterData.letter_type);
              
              if (letterData.letter_type === 'email') {
                console.log('📧 이메일 알림 전송 시도...');
                const emailResponse = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/functions/v1/send-letter-notification`, {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    receiver_email: letterData.receiver_contact,
                    receiver_name: letterData.receiver_name,
                    letter_id: letterDbData.id,
                    hint: letterData.hint,
                  }),
                });

                if (emailResponse.ok) {
                  console.log('✅ 이메일 알림 전송 성공');
                } else {
                  console.error('❌ 이메일 알림 전송 실패:', await emailResponse.text());
                }
              } else if (letterData.letter_type === 'sms') {
                console.log('📱 SMS 알림 전송 시도...');
                const smsResponse = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/functions/v1/send-sms-notification`, {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    receiver_phone: letterData.receiver_contact,
                    receiver_name: letterData.receiver_name,
                    letter_id: letterDbData.id,
                    hint: letterData.hint,
                  }),
                });

                if (smsResponse.ok) {
                  console.log('✅ SMS 알림 전송 성공');
                } else {
                  console.error('❌ SMS 알림 전송 실패:', await smsResponse.text());
                }
              }
            } catch (notificationError) {
              console.error('알림 전송 중 오류:', notificationError);
            }

            // 세션스토리지에서 편지 데이터 삭제
            sessionStorage.removeItem('pendingLetter_' + orderId);
            
            console.log('🎉 테스트 결제 완료! 편지 ID:', letterDbData.id);

            // 성공 페이지로 리다이렉트
            const deliveryParams = new URLSearchParams({
              paymentId: paymentId,
              orderId: orderId,
              amount: amount.toString()
            });
            
            navigate(`/letter-delivery?${deliveryParams.toString()}`);
            
            // 테스트 결제 완료 - 실제 결제 로직으로 넘어가지 않도록 함
            setVerificationResult({ 
              success: true, 
              message: '테스트 결제가 완료되었습니다!' 
            });
            setIsVerifying(false);
            return;
            
          } catch (error) {
            console.error('테스트 결제 처리 중 오류:', error);
            setVerificationResult({ 
              success: false, 
              message: '결제 처리 중 오류가 발생했습니다.' 
            });
            setIsVerifying(false);
            return;
          }
        }

        // 포트원 V2 API를 통한 결제 검증 (실제 결제인 경우)
        const paymentService = new PortOnePaymentServiceV2();
        const paymentInfo = await paymentService.getPaymentInfo(paymentId);

        if (paymentInfo.status === 'PAID') {
          // 세션스토리지에서 편지 데이터 가져오기
          const letterDataString = sessionStorage.getItem('pendingLetter_' + orderId);
          let letterData = null;
          
          if (letterDataString) {
            try {
              letterData = JSON.parse(letterDataString);
            } catch (error) {
              console.error('편지 데이터 파싱 실패:', error);
            }
          }

          // Supabase에 결제 정보와 편지 저장 (포트원 V2 스키마)
          const { data: paymentData, error: paymentError } = await supabase
            .from('payments')
            .insert([
              {
                payment_id: paymentId,
                order_id: orderId,
                amount: parseInt(amount),
                status: 'paid',
                payment_method: paymentInfo.payMethod || 'card',
                payment_gateway: 'portone_v2',
                store_id: process.env.REACT_APP_PORTONE_STORE_ID,
                channel_key: process.env.REACT_APP_PORTONE_CHANNEL_KEY,
                created_at: new Date().toISOString(),
              }
            ])
            .select()
            .single();

          if (paymentError) {
            console.error('결제 정보 저장 실패:', paymentError);
            setVerificationResult({ 
              success: true, 
              message: '결제는 완료되었지만 정보 저장에 실패했습니다.' 
            });
          } else {
            // 편지 데이터가 있으면 편지도 저장
            if (letterData) {
              const { data: letterDbData, error: letterError } = await supabase
                .from('confessions')
                .insert([
                  {
                    ...letterData,
                    payment_id: paymentData.id,
                  }
                ])
                .select()
                .single();

              if (letterError) {
                console.error('편지 저장 실패:', letterError);
                setVerificationResult({ 
                  success: true, 
                  message: '결제는 완료되었지만 편지 저장에 실패했습니다.' 
                });
              } else {
                // 편지 저장 성공 후 알림 전송 (이메일 또는 SMS)
                try {
                  if (letterData.letter_type === 'email') {
                    // 이메일 전송
                    const emailResponse = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/functions/v1/send-letter-notification`, {
                      method: 'POST',
                      headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        receiver_email: letterData.receiver_contact,
                        receiver_name: letterData.receiver_name,
                        letter_id: letterDbData.id,
                        hint: letterData.hint,
                      }),
                    });

                    if (emailResponse.ok) {
                      console.log('이메일 알림 전송 성공');
                    } else {
                      console.error('이메일 알림 전송 실패:', await emailResponse.text());
                    }
                  } else if (letterData.letter_type === 'sms') {
                    // SMS 전송
                    const smsResponse = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/functions/v1/send-sms-notification`, {
                      method: 'POST',
                      headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        receiver_phone: letterData.receiver_contact,
                        receiver_name: letterData.receiver_name,
                        letter_id: letterDbData.id,
                        hint: letterData.hint,
                      }),
                    });

                    if (smsResponse.ok) {
                      console.log('SMS 알림 전송 성공');
                    } else {
                      console.error('SMS 알림 전송 실패:', await smsResponse.text());
                    }
                  }
                } catch (notificationError) {
                  console.error('알림 전송 중 오류:', notificationError);
                  // 알림 전송 실패해도 전체 프로세스는 성공으로 처리
                }

                // 세션스토리지에서 편지 데이터 삭제
                sessionStorage.removeItem('pendingLetter_' + orderId);
                const successMessages = {
                  'email': '결제와 편지 전송이 성공적으로 완료되었습니다! 받는 분에게 이메일 알림을 보냈어요 📧',
                  'sms': '결제와 편지 전송이 성공적으로 완료되었습니다! 받는 분에게 SMS 알림을 보냈어요 📱',
                  'kakao': '결제와 편지 전송이 성공적으로 완료되었습니다! 받는 분에게 카카오톡 알림을 보냈어요 💬'
                };

                // 실제 결제 성공 시에도 편지 배달 페이지로 리다이렉트
                const deliveryParams = new URLSearchParams({
                  paymentId: paymentId,
                  orderId: orderId,
                  amount: amount.toString()
                });
                
                navigate(`/letter-delivery?${deliveryParams.toString()}`);
              }
            } else {
              // 편지 데이터가 없어도 편지 배달 페이지로 리다이렉트
              const deliveryParams = new URLSearchParams({
                paymentId: paymentId,
                orderId: orderId,
                amount: amount.toString()
              });
              
              navigate(`/letter-delivery?${deliveryParams.toString()}`);
            }
          }
        } else {
          setVerificationResult({ 
            success: false, 
            message: '결제 검증에 실패했습니다.' 
          });
        }
      } catch (error) {
        console.error('결제 검증 오류:', error);
        setVerificationResult({ 
          success: false, 
          message: '결제 검증 중 오류가 발생했습니다.' 
        });
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [paymentId, orderId, amount]);

  if (isVerifying) {
    return (
      <div className="payment-result-container">
        <div className="payment-result-content">
          <div className="loading-spinner"></div>
          <h2>결제 확인 중...</h2>
          <p>잠시만 기다려주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-result-container">
      <div className="payment-result-content">
        <div className={`result-icon ${verificationResult?.success ? 'success' : 'error'}`}>
          {verificationResult?.success ? '✅' : '❌'}
        </div>
        
        <h1 className="result-title">
          {verificationResult?.success ? '결제 완료!' : '결제 실패'}
        </h1>
        
        <p className="result-message">
          {verificationResult?.message}
        </p>

        {verificationResult?.success && (
          <div className="payment-info">
            <div className="info-item">
              <span className="info-label">주문번호:</span>
              <span className="info-value">{orderId}</span>
            </div>
            <div className="info-item">
              <span className="info-label">결제금액:</span>
              <span className="info-value">{parseInt(amount).toLocaleString()}원</span>
            </div>
          </div>
        )}

        <div className="result-actions">
          <button 
            className="primary-btn"
            onClick={() => navigate('/')}
          >
            홈으로 돌아가기
          </button>
          
          {verificationResult?.success && (
            <button 
              className="secondary-btn"
              onClick={() => navigate('/confess')}
            >
              편지 쓰러 가기
            </button>
          )}
        </div>

        <div className="schro-decoration">
          <img src="/src/assets/schro_letter.png" alt="SchRo" className="result-schro-img" />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;