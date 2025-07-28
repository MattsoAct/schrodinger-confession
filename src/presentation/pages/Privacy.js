import { HiShieldCheck } from 'react-icons/hi';
import '../styles/schro-mailcat-system.css';

function Privacy() {
  return (
    <div className="cyber-legal-container">
      <div className="cyber-legal-content">
        {/* Header */}
        <div className="cyber-legal-header">
          <div className="cyber-legal-icon">
            <HiShieldCheck />
          </div>
          <h1 className="cyber-legal-title">개인정보 처리방침</h1>
          <p className="cyber-legal-subtitle">
            SchRo 비밀편지함 개인정보 보호 정책
          </p>
          <div className="cyber-legal-updated">
            적용일자: 2025년 7월 25일
          </div>
        </div>

        {/* Legal Document */}
        <div className="cyber-legal-card">
          {/* Navigation */}
          <nav className="cyber-legal-nav">
            <h2 className="cyber-legal-nav-title">목차</h2>
            <div className="cyber-legal-nav-list">
              <a href="#purpose" className="cyber-legal-nav-link">목적</a>
              <a href="#principles" className="cyber-legal-nav-link">개인정보 처리의 원칙</a>
              <a href="#policy-changes" className="cyber-legal-nav-link">본 방침의 공개 및 변경</a>
              <a href="#collection-items" className="cyber-legal-nav-link">수집하는 개인정보의 항목</a>
              <a href="#collection-methods" className="cyber-legal-nav-link">개인정보 수집방법</a>
              <a href="#usage" className="cyber-legal-nav-link">개인정보의 이용</a>
              <a href="#retention" className="cyber-legal-nav-link">개인정보의 보유 및 이용기간</a>
              <a href="#destruction" className="cyber-legal-nav-link">개인정보의 파기절차 및 파기방법</a>
              <a href="#marketing" className="cyber-legal-nav-link">광고성 정보의 전송 조치</a>
              <a href="#third-party" className="cyber-legal-nav-link">개인정보의 제3자 제공</a>
              <a href="#outsourcing" className="cyber-legal-nav-link">개인정보 처리 위탁</a>
              <a href="#rights" className="cyber-legal-nav-link">정보주체의 권리·의무</a>
              <a href="#cookies" className="cyber-legal-nav-link">쿠키 설치 및 허용</a>
              <a href="#links" className="cyber-legal-nav-link">링크 사이트</a>
              <a href="#officer" className="cyber-legal-nav-link">개인정보 보호책임자</a>
              <a href="#security" className="cyber-legal-nav-link">개인정보의 안전성 확보조치</a>
              <a href="#contact" className="cyber-legal-nav-link">문의</a>
            </div>
          </nav>

          {/* Content Sections */}
          <section id="purpose" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">목적</h2>
            <p className="cyber-legal-text">
              ㈜소액트(이하 '회사')는 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보 보호법」제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
            </p>
          </section>

          <section id="principles" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">개인정보 처리의 원칙</h2>
            <p className="cyber-legal-text">
              회사는 회사의 제반 서비스(이하 '서비스')의 개인정보처리방침을 통하여 이용자의 개인정보가 남용되거나 유출되지 않도록 최선을 다할 것이며, 이용자가 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있고, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
            </p>
          </section>

          <section id="policy-changes" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">본 방침의 공개 및 변경</h2>
            <p className="cyber-legal-text">
              회사는 본 개인정보처리방침을 홈페이지 첫 화면에 공개함으로써 이용자가 언제나 용이하게 볼 수 있도록 조치하고 있습니다. 단, 본 개인정보처리방침은 정부의 법령 및 지침의 변경, 또는 보다 나은 서비스의 제공을 위하여 그 내용이 변경될 수 있으니, 이용자는 홈페이지 방문 시 수시로 그 내용을 확인하여 주시기 바라며, 회사는 개인정보처리방침을 개정하는 경우 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
          </section>

          <section id="collection-items" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">수집하는 개인정보의 항목과 수집한 개인정보의 이용목적</h2>
            
            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">회원 가입을 위한 정보</h3>
              <ul className="cyber-legal-list">
                <li><strong>필수 수집 정보:</strong> 이메일주소, 비밀번호, 이름, 닉네임, 생년월일, 휴대폰 번호</li>
              </ul>
            </div>

            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">본인 인증을 위한 정보</h3>
              <ul className="cyber-legal-list">
                <li><strong>필수 수집 정보:</strong> 휴대폰번호, 이메일주소, 이름, 생년월일, 성별, 본인확인값(CI, DI), 이동통신사, 아이핀정보(아이핀 확인 시), 내/외국인 여부</li>
              </ul>
            </div>

            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">회사 서비스 제공을 위한 정보</h3>
              <ul className="cyber-legal-list">
                <li><strong>필수 수집 정보:</strong> 이름, 이메일주소, 연락처, 주소, 주민등록번호 및 계좌번호</li>
                <li><strong>선택 수집 정보:</strong> (실물상품 지급시) 이름, 전화번호, 주소, (모바상품 지급 시) 전화번호 및 (제세공과금 처리 시) 이름, 주민등록번호, 전화번호, 주소, 이메일 주소</li>
              </ul>
            </div>

            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">서비스 이용 및 부정이용 확인을 위한 정보</h3>
              <p className="cyber-legal-text">
                서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용 기록, 기기정보, 위치정보, 세션, 쿠키가 자동으로 생성되어 수집될 수 있습니다. 수집되는 정보는 회원탈퇴 후 재가입 등을 반복적으로 행하여 회사가 제공하는 혜택 등의 경제상 이익을 불법적으로 수취하는 행위, 이용 약관에서 금지하고 있는 행위 등의 불/편법 행위인 부정이용을 확인하거나 회사 서비스 이용에 따른 통계 분석에 이용될 수 있습니다.
              </p>
            </div>
          </section>

          <section id="collection-methods" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">개인정보 수집방법</h2>
            <p className="cyber-legal-text">
              회사는 아래의 방법을 통해 개인정보를 수집합니다.
            </p>
            <ul className="cyber-legal-list">
              <li>회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의를 하고 직접 정보를 입력하는 경우</li>
              <li>오프라인에서 진행되는 이벤트, 세미나 등에서 서면을 통하는 경우</li>
              <li>기기정보와 같은 생성정보는 PC웹, 모바일 웹/앱 이용 과정에서 자동으로 생성되어 수집되는 경우</li>
            </ul>
          </section>

          <section id="usage" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">개인정보의 이용</h2>
            <p className="cyber-legal-text">
              회사는 개인정보를 다음 각호의 경우 이용합니다.
            </p>
            <ul className="cyber-legal-list">
              <li>공지사항의 전달 등 회사 운영에 필요한 경우</li>
              <li>이용문의에 대한 회신, 불만의 처리 등 이용자에 대한 서비스 개선을 위한 경우</li>
              <li>회사의 서비스를 제공하기 위한 경우</li>
              <li>신규 서비스 개발을 위한 경우</li>
              <li>이벤트 및 행사 안내 등 마케팅을 위한 경우</li>
              <li>인구통계학적 분석, 서비스 방문 및 이용기록의 분석을 위한 경우</li>
              <li>개인정보 및 관심에 기반한 이용자간 관계의 형성을 위한 경우</li>
              <li>법령 및 회사 약관을 위반하는 회원에 대한 이용제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재를 위한 경우</li>
            </ul>
          </section>

          <section id="retention" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">개인정보의 보유 및 이용기간</h2>
            <p className="cyber-legal-text">
              1. 회사는 이용자의 개인정보에 대해 개인정보의 수집 이용 목적이 달성을 위한 기간동안 개인정보를 보유 이용합니다.
            </p>
            <p className="cyber-legal-text">
              2. 전항에도 불구하고 회사는 내부 방침에 의해 서비스 부정이용기록은 부정 가입 및 이용 방지를 위하여 회원 탈퇴 시점으로부터 최대 1년간 보관합니다.
            </p>

            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">법령의 개인정보 의무준수</h3>
              
              <div className="cyber-legal-subsection">
                <h4 className="cyber-legal-subsection-title">전자상거래 등에서의 소비자 보호에 관한 법률에 따른 표시광고, 계약내용 및 이행 등 거래에 관한 기간</h4>
                <ul className="cyber-legal-list">
                  <li>표시광고에 관한 기록: 6개월</li>
                  <li>계약 또는 청약철회, 대금결제, 재화 등의 공급 기록: 5년</li>
                  <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                </ul>
              </div>

              <div className="cyber-legal-subsection">
                <h4 className="cyber-legal-subsection-title">통신비밀보호법에 따른 통신사실확인자료 보관</h4>
                <ul className="cyber-legal-list">
                  <li>컴퓨터통신, 인터넷 로그기록자료, 접속지 추적자료: 3개월</li>
                </ul>
              </div>

              <div className="cyber-legal-subsection">
                <h4 className="cyber-legal-subsection-title">전자금융거래법에 따른 보유정보 및 보유기간</h4>
                <ul className="cyber-legal-list">
                  <li>전자금융거래에 관한 기록: 5년</li>
                </ul>
              </div>

              <div className="cyber-legal-subsection">
                <h4 className="cyber-legal-subsection-title">위치정보의 보호 및 이용 등에 관한 법률</h4>
                <ul className="cyber-legal-list">
                  <li>개인 위치정보에 관한 기록: 6개월</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="destruction" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">개인정보의 파기절차 및 파기방법</h2>
            <p className="cyber-legal-text">
              1. 회사는 원칙적으로 회원 탈퇴 시 또는 수집한 개인정보의 이용목적이 달성된 후에는 별도의 DB 또는 서류함으로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보 보호 사유에 따라 일정기간 저장된 후 파기되어집니다.
            </p>
            <p className="cyber-legal-text">
              2. 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.
            </p>
            <p className="cyber-legal-text">
              3. 회사는 전자적 파일 형태로 기록 저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록 저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
            </p>
          </section>

          <section id="marketing" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">광고성 정보의 전송 조치</h2>
            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">사전 동의 원칙</h3>
              <p className="cyber-legal-text">
                1. 회사는 전자적 전송매체를 이용하여 영리목적의 광고성 정보를 전송하는 경우 이용자의 명시적인 사전동의를 받습니다. 다만, 다음 각호 어느 하나에 해당하는 경우에는 사전 동의를 받지 않습니다.
              </p>
              <ul className="cyber-legal-list">
                <li>회사가 재화 등의 거래관계를 통하여 수신자로부터 직접 연락처를 수집한 경우, 거래가 종료된 날로부터 6개월 이내에 회사가 처리하고 수신자와 거래한 것과 동종의 재화 등에 대한 영리목적의 광고성 정보를 전송하려는 경우</li>
                <li>방문판매 등에 관한 법률에 따른 전화권유판매자가 육성으로 수신자에게 개인정보의 수집출처를 고지하고 전화권유를 하는 경우</li>
              </ul>
            </div>

            <p className="cyber-legal-text">
              2. 회사는 전항에도 불구하고 수신자가 수신거부의사를 표시하거나 사전 동의를 철회한 경우에는 영리목적의 광고성 정보를 전송하지 않으며 수신거부 및 수신동의 철회에 대한 처리 결과를 알립니다.
            </p>

            <p className="cyber-legal-text">
              3. 회사는 오후 9시부터 그다음 날 오전 8시까지의 시간에 전자적 전송매체를 이용하여 영리목적의 광고성 정보를 전송하는 경우에는 제1항에도 불구하고 그 수신자로부터 별도의 사전 동의를 받습니다.
            </p>

            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">광고성 정보 표시사항</h3>
              <p className="cyber-legal-text">
                4. 회사는 전자적 전송매체를 이용하여 영리목적의 광고성 정보를 전송하는 경우 다음의 사항 등을 광고성 정보에 구체적으로 밝힙니다.
              </p>
              <ul className="cyber-legal-list">
                <li>회사명 및 연락처</li>
                <li>수신 거부 또는 수신 동의의 철회 의사표시에 관한 사항의 표시</li>
              </ul>
            </div>

            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">금지사항</h3>
              <p className="cyber-legal-text">
                5. 회사는 전자적 전송매체를 이용하여 영리목적의 광고성 정보를 전송하는 경우 다음 각 호의 어느 하나에 해당하는 조치를 하지 않습니다.
              </p>
              <ul className="cyber-legal-list">
                <li>광고성 정보 수신자의 수신거부 또는 수신동의의 철회를 회피하거나 방해하는 조치</li>
                <li>숫자 부호 또는 문자를 조합하여 전자번호 및 전자우편주소 등 수신자의 연락처를 자동으로 만들어 내는 조치</li>
                <li>영리 목적의 광고성 정보를 전송할 목적으로 전자번호 또는 전자우편주소를 자동으로 등록하는 조치</li>
                <li>광고성 정보 전송자의 신원이나 광고 전송 출처를 감추기 위한 각종 조치</li>
                <li>영리목적의 광고성 정보를 전송할 목적으로 수신자를 기망하여 회신을 유도하는 각종 조치</li>
              </ul>
            </div>
          </section>

          <section id="third-party" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">개인정보의 제3자 제공에 관한 사항</h2>
            <p className="cyber-legal-text">
              회사는 이용자의 개인정보를 이용자가 동의로 명시한 범위 내에서만 처리하며, 정보주체의 동의가 있거나 법률에 근거가 있는 경우 이외에는 개인정보를 제3자에게 제공하지 않습니다. 회사는 이용자의 별도 동의를 얻어 다음과 같이 개인정보를 제3자에게 제공할 수 있습니다.
            </p>

            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">알림 발송 시</h3>
              <ul className="cyber-legal-list">
                <li><strong>제공받는 자:</strong> (주)알리는 사람들</li>
                <li><strong>제공받는자의 개인정보 이용목적:</strong> 알림을 위한 카카오 알림톡 메시지</li>
                <li><strong>제공하는 개인정보의 항목:</strong> 휴대폰번호</li>
                <li><strong>개인정보 보유 및 이용기간:</strong> 최대 1년까지</li>
              </ul>
            </div>

            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">멤버십 결제 시</h3>
              <ul className="cyber-legal-list">
                <li><strong>제공받는 자:</strong> 토스페이먼츠</li>
                <li><strong>제공받는자의 개인정보 이용목적:</strong> 멤버십 가입 및 유지를 위한 결제</li>
                <li><strong>제공하는 개인정보의 항목:</strong> 결제정보 (카드번호, 유효기간, 생년월일 또는 사업자번호)</li>
                <li><strong>개인정보 보유 및 이용기간:</strong> 최대 5년까지</li>
              </ul>
            </div>
          </section>

          <section id="outsourcing" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">개인정보의 처리 위탁에 관한 사항</h2>
            <p className="cyber-legal-text">
              회사는 원활한 개인정보 업무처리를 위하여 개인정보의 처리업무를 위탁할 수 있으며, 회사는 위탁 계약 체결 시 관련법령에 따라 수탁자가 이용자의 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
            </p>
            <ul className="cyber-legal-list">
              <li><strong>토스페이먼츠:</strong> 멤버십 결제</li>
              <li><strong>(주)알리는사람들:</strong> 알림톡 발송</li>
            </ul>
            <p className="cyber-legal-text">
              위탁업무의 내용이나 수탁자가 추가, 변경될 경우에는 지체 없이 관련 법령에 따른 사전 동의 안내 또는 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.
            </p>
          </section>

          <section id="rights" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">정보주체의 권리·의무 및 행사방법</h2>
            <p className="cyber-legal-text">
              이용자는 언제든지 이용자 본인의 개인정보 관련하여, 다음과 같은 권리를 행사할 수 있습니다.
            </p>

            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">정보주체의 권리</h3>
              <ul className="cyber-legal-list">
                <li>개인정보 열람요구</li>
                <li>오류 등이 있을 경우 정정 및 삭제 요구</li>
                <li>가공하여 공개된 결과 데이터에 개인정보가 남아있는 경우 개인정보의 비식별화 요구</li>
                <li>처리정지 요구</li>
                <li>개인정보의 오류 등에 대한 정정 또는 삭제를 요청한 경우에는 정정 또는 삭제를 완료하기 전까지 당해 개인정보를 이용하거나 제공하지 않습니다.</li>
                <li>개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.</li>
              </ul>
            </div>

            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">정보주체의 의무</h3>
              <p className="cyber-legal-text">
                이용자는 개인정보주체로서 다음과 같은 의무를 가집니다.
              </p>
              <ul className="cyber-legal-list">
                <li>이용자는 자신의 개인정보를 최신의 상태로 유지해야 하며, 부정확한 정보 입력으로 발생하는 문제의 책임은 이용자 자신에게 있습니다.</li>
                <li>이용자는 계정 등에 대해 보안을 유지할 책임이 있으며 제3자에게 이를 양도하거나 대여할 수 없습니다.</li>
                <li>타인의 개인정보를 도용하여 서비스 신청 시 이용자격 상실과 함께 관계법령에 의거하여 처벌될 수 있습니다.</li>
                <li>개인정보 보호 관련 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</li>
              </ul>
            </div>
          </section>

          <section id="cookies" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">쿠키 설치 및 허용 지정 방법</h2>
            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">자동생성정보 수집</h3>
              <p className="cyber-legal-text">
                서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용 기록, 기기정보, 위치정보, 세션, 쿠키가 자동으로 생성되어 수집될 수 있습니다.
              </p>
              <ul className="cyber-legal-list">
                <li><strong>자동생성정보:</strong> 방문일시, 서비스 이용기록, 접속IP정보, 접속 로그, 기기정보(고유기기식별값, OS버전), 쿠키(쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자 PC 컴퓨터의 하드디스크에 저장되기도 합니다.)</li>
                <li><strong>쿠키의 사용목적:</strong> 이용자가 방문한 각 서비스와 웹사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보제공을 위해 사용됩니다.</li>
              </ul>
            </div>

            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">쿠키 설정 방법</h3>
              <p className="cyber-legal-text">
                이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 이용자는 옵션을 설정하여 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
              </p>
              <p className="cyber-legal-text">
                쿠키 저장 옵션 설정 방법은 아래와 같습니다.
              </p>
              <ul className="cyber-legal-list">
                <li><strong>Internet Explorer의 경우:</strong> 웹브라우저 상단의 도구 > 인터넷 옵션 > 개인정보 메뉴의 옵션 설정</li>
              </ul>
              <p className="cyber-legal-text">
                쿠키 저장을 거부할 경우, 서비스 이용에는 문제가 없으나 맞춤형 서비스를 이용하실 수 없습니다.
              </p>
            </div>
          </section>

          <section id="links" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">링크 사이트</h2>
            <p className="cyber-legal-text">
              1. 이용자에게 회사의 다른 웹사이트 또는 자료에 대한 링크를 제공할 수 있습니다. 이 경우 회사는 외부 웹사이트 및 자료에 대한 아무런 통제권이 없으므로 그로부터 제공받는 서비스나 자료의 유용성에 대해 책임질 수 없으며 보증할 수 없습니다.
            </p>
            <p className="cyber-legal-text">
              2. 링크를 통하여 타 웹사이트의 페이지로 옮겨갈 경우 해당 웹사이트의 개인정보처리방침은 회사와 무관하므로 새로 방문한 웹사이트의 정책을 검토해보시기 바랍니다.
            </p>
          </section>

          <section id="officer" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">개인정보 보호책임자 및 담당자 안내</h2>
            <p className="cyber-legal-text">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자 및 담당자를 지정하고 있습니다.
            </p>
            
            <div className="cyber-legal-notice">
              <div className="cyber-legal-notice-content">
                <h3 className="cyber-legal-notice-title">개인정보보호 담당 및 책임자</h3>
                <p className="cyber-legal-notice-text">
                  <strong>성명:</strong> 전성욱<br />
                  <strong>연락처:</strong> so.act.kr@gmail.com
                </p>
              </div>
            </div>

            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">개인정보 열람청구</h3>
              <p className="cyber-legal-text">
                정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의 개인정보 열람 담당 및 책임자에게 할 수 있습니다. 회사는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.
              </p>
              <p className="cyber-legal-text">
                <strong>개인정보보호 담당 및 책임자</strong><br />
                성명: 전성욱<br />
                연락처: so.act.kr@gmail.com
              </p>
            </div>
          </section>

          <section id="security" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">개인정보의 안전성 확보조치</h2>
            <p className="cyber-legal-text">
              회사는 서비스 이용자의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적 · 관리적 대책을 강구하고 있습니다.
            </p>

            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">해킹 등에 대비한 대책</h3>
              <p className="cyber-legal-text">
                회사는 해킹이나 컴퓨터 바이러스 등에 의해 이용자의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다. 개인정보의 훼손에 대비해서 자료를 수시로 백업하고 있고, 최신 백신프로그램을 이용하여 이용자의 개인정보나 자료가 누출되거나 손상되지 않도록 방지하고 있으며, 암호화 통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다. 그리고 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있으며, 기타 시스템적으로 보안성을 확보하기 위한 가능한 모든 기술적 장치를 갖추려 노력하고 있습니다.
              </p>
            </div>

            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">관리적 대책</h3>
              <p className="cyber-legal-text">
                회사는 이용자의 개인정보에 대한 접근권한을 최소한의 인원으로 제한하고 있으며 그 최소한의 인원에 해당하는 자는 다음과 같습니다.
              </p>
              <ul className="cyber-legal-list">
                <li>고객을 직접 상대로 하여 마케팅 업무를 수행하는 자</li>
                <li>개인정보관리책임자 및 담당자 등 개인정보관리업무를 수행하는 자</li>
                <li>기타 업무상 개인정보의 처리가 불가피한 자</li>
              </ul>
            </div>

            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">개정 전 고지의무 및 개인정보처리방침의 변경에 관한 사항</h3>
              <p className="cyber-legal-text">
                회사는 개인정보처리방침을 개정하는 경우 개정 최소 7일전에 홈페이지를 통하여 공지합니다.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="cyber-legal-contact">
            <h2 className="cyber-legal-contact-title">개인정보 관련 문의</h2>
            <p className="cyber-legal-contact-text">
              개인정보 처리방침에 대해 문의사항이 있으시거나 개인정보와 관련된 권리 행사를 원하시는 경우 아래 연락처로 문의해주시기 바랍니다.
            </p>
            <p className="cyber-legal-contact-text">
              <strong>(주)소액트</strong><br />
              개인정보보호책임자: 전성욱<br />
              이메일: <a href="mailto:so.act.kr@gmail.com" className="cyber-legal-contact-link">so.act.kr@gmail.com</a>
            </p>
            <div className="cyber-legal-notice">
              <div className="cyber-legal-notice-content">
                <h3 className="cyber-legal-notice-title">부칙</h3>
                <p className="cyber-legal-notice-text">
                  본 개인정보처리방침은 2025년 7월 25일부터 시행됩니다.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Privacy;