import { HiDocumentText } from 'react-icons/hi';
import '../styles/schro-mailcat-system.css';

function Terms() {
  return (
    <div className="cyber-legal-container">
      <div className="cyber-legal-content">
        {/* Header */}
        <div className="cyber-legal-header">
          <div className="cyber-legal-icon">
            <HiDocumentText />
          </div>
          <h1 className="cyber-legal-title">서비스 이용 약관</h1>
          <p className="cyber-legal-subtitle">
            SchRo 비밀편지함 서비스 이용약관
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
              <a href="#article1" className="cyber-legal-nav-link">제1조 목적</a>
              <a href="#article2" className="cyber-legal-nav-link">제2조 약관의 개시와 효력, 개정</a>
              <a href="#article3" className="cyber-legal-nav-link">제3조 용어의 정의</a>
              <a href="#article4" className="cyber-legal-nav-link">제4조 약관 이외의 준칙</a>
              <a href="#article5" className="cyber-legal-nav-link">제5조 이용계약의 체결</a>
              <a href="#article6" className="cyber-legal-nav-link">제6조 개인정보보호 의무</a>
              <a href="#article7" className="cyber-legal-nav-link">제7조 회원의 아이디 및 비밀번호</a>
              <a href="#article8" className="cyber-legal-nav-link">제8조 회원의 의무</a>
              <a href="#article9" className="cyber-legal-nav-link">제9조 회사의 의무</a>
              <a href="#article10" className="cyber-legal-nav-link">제10조 전자우편을 통한 정보의 제공</a>
              <a href="#article11" className="cyber-legal-nav-link">제11조 서비스 이용의 제한</a>
              <a href="#article12" className="cyber-legal-nav-link">제12조 서비스 이용의 중지 및 해지</a>
              <a href="#article13" className="cyber-legal-nav-link">제13조 권리의 귀속 및 저작물의 이용</a>
              <a href="#article14" className="cyber-legal-nav-link">제14조 게시물의 관리</a>
              <a href="#article15" className="cyber-legal-nav-link">제15조 회원 가입 및 취소</a>
              <a href="#article16" className="cyber-legal-nav-link">제16조 책임제한</a>
              <a href="#article17" className="cyber-legal-nav-link">제17조 준거법 및 재판관할</a>
              <a href="#contact" className="cyber-legal-nav-link">문의</a>
            </div>
          </nav>

          {/* Content Sections */}
          <section id="article1" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">제 1조 목적</h2>
            <p className="cyber-legal-text">
              이 약관은 (주)소액트(이하 '회사')가 제공하는 모든 서비스와 관련하여 회사와 회원간의 권리와 의무, 책임사항 및 회원의 서비스이용절차에 관한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section id="article2" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">제 2조 약관의 개시와 효력, 개정</h2>
            <p className="cyber-legal-text">
              회사는 서비스의 가입 과정에 본 약관을 게시합니다.
            </p>
            <p className="cyber-legal-text">
              회사는 관련법에 위배되지 않는 범위에서 본 약관을 변경할 수 있습니다.
            </p>
            <p className="cyber-legal-text">
              회원은 회사가 전항에 따라 변경하는 약관에 동의하지 않을 권리가 있으며, 이 경우 회원은 회사에서 제공하는 서비스 이용 중단 및 탈퇴 의사를 표시하고 서비스 이용 종료를 요청할 수 있습니다. 다만, 회사가 회원에게 변경된 약관의 내용을 통보하면서 회원에게 "7일 이내 의사 표시를 하지 않을 경우 의사 표시가 표명된 것으로 본다는 뜻"을 명확히 통지하였음에도 불구하고, 거부의 의사표시를 하지 아니한 경우 회원이 변경된 약관에 동의하는 것으로 봅니다. 본 약관에 명시되지 않은 사항이 관계법령에 규정되어 있을 경우에는 그 규정에 따릅니다.
            </p>
          </section>

          <section id="article3" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">제 3조 용어의 정의</h2>
            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">1. 서비스</h3>
              <p className="cyber-legal-text">
                개인용 컴퓨터 (PC), TV, 휴대형 단말기, 전기통신설비 등 포함 각종 유무선 장치와 같이 구현되는 단말기와 상관없이 회원이 이용할 수 있는 회사의 모든 서비스를 의미합니다.
              </p>
            </div>
            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">2. 회원</h3>
              <p className="cyber-legal-text">
                회사와 서비스 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 모든 사용자를 의미합니다.
              </p>
            </div>
            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">3. 아이디</h3>
              <p className="cyber-legal-text">
                회원의 식별 및 서비스 이용을 위하여 회원이 선정하고 회사가 부여한 문자 또는 숫자, 특수문자 등의 조합을 의미합니다.
              </p>
            </div>
            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">4. 비밀번호</h3>
              <p className="cyber-legal-text">
                회원의 개인 정보 및 확인을 위해서 회원이 정한 문자 또는 숫자, 특수문자 등의 조합을 의미합니다.
              </p>
            </div>
            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">5. 게시물</h3>
              <p className="cyber-legal-text">
                회원이 서비스를 이용함에 있어 회원이 서비스에 게시한 문자, 문서, 그림, 음성, 링크, 파일 혹은 이들의 조합으로 이루어진 정보 등 모든 정보나 자료를 의미합니다.
              </p>
            </div>
            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">6. 멤버십</h3>
              <p className="cyber-legal-text">
                등급별 권한을 설정하고 해당 등급에 따라 비용을 결제 후 콘텐츠를 제공하는 그룹을 의미합니다.
              </p>
            </div>
          </section>

          <section id="article4" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">제 4조 약관 이외의 준칙</h2>
            <p className="cyber-legal-text">
              이 약관에 명시되지 않은 사항에 대해서는 관계법령 및 회사가 정한 서비스의 세부이용지침 등의 규정에 의합니다.
            </p>
          </section>

          <section id="article5" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">제 5조 이용계약의 체결</h2>
            <p className="cyber-legal-text">
              1. 이용계약은 회원이 회사에서 제공하는 회원 가입 페이지에서 서비스 이용약관에 동의한 후 이용신청을 하고 신청한 내용에 대해서 회사가 승낙함으로써 체결됩니다.
            </p>
            <p className="cyber-legal-text">
              2. 회사는 이용약관에 동의한 후 이용신청한 사용자에 대해서 원칙적으로 접수 순서에 따라 서비스 이용을 승낙함을 원칙으로 합니다. 다만 업무 수행상 또는 기술상 지장이 있을 경우 일정시간 가입승인을 유보할 수 있습니다.
            </p>
            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">3. 회사는 다음 각 호에 해당하는 신청에 대해서 승낙하지 않거나 사후에 이용계약을 해지할 수 있습니다.</h3>
              <ul className="cyber-legal-list">
                <li>가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
                <li>제3자의 전자우편 주소 혹은 제3자의 SNS계정을 이용하여 신청한 경우</li>
                <li>회사가 제시하는 내용을 기재하지 않은 경우</li>
                <li>신청자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우</li>
                <li>부정한 용도로 서비스를 사용하고자 하는 경우</li>
                <li>비정상적인 방법을 통하여 아이디 및 도메인을 대량으로 생성하는 행위</li>
              </ul>
            </div>
            <p className="cyber-legal-text">
              4. 회원은 회사에 언제든지 회원 탈퇴를 요청하여 이용계약을 해지할 수 있습니다. 탈퇴 요청은 설정 페이지를 통해 이루어질 수 있습니다.
            </p>
            <p className="cyber-legal-text">
              5. 회원은 회원 가입 시 기재한 개인정보의 내용에 변경이 발생한 경우, 즉시 변경사항을 정정하여 기재하여야 합니다. 변경의 지체로 인하여 발생한 회원의 손해에 대해 회사는 책임을 지지 않습니다.
            </p>
            <p className="cyber-legal-text">
              6. 회사는 관련 법률 및 회사의 개인정보처리방침에서 정한 바에 따라 회원에게 요청하는 회원정보 및 기타정보 항목을 추가, 삭제 등 변경하여 수집 및 이용할 수 있습니다.
            </p>
            <p className="cyber-legal-text">
              7. 회원가입을 하기 위해서는 만 14세 이상이어야 합니다. 만 14세 이상이 아닌 경우 회사는 회원가입을 승낙하지 않거나, 취소할 수 있습니다.
            </p>
          </section>

          <section id="article6" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">제 6조 개인정보보호 의무</h2>
            <p className="cyber-legal-text">
              1. 회사는 관계법령이 정하는 바에 따라 회원등록정보를 포함한 회원의 개인정보를 보호하기 위하여 노력을 합니다.
            </p>
            <p className="cyber-legal-text">
              2. 회원의 개인정보보호에 관하여 관계법령 및 회사가 정하는 개인정보처리방침에 정한 바에 따릅니다. 단, 회원의 귀책사유로 인해 노출된 정보에 대해 회사는 일체의 책임을 지지 않습니다.
            </p>
            <p className="cyber-legal-text">
              3. 회사는 회원이 미풍양속에 저해되거나 국가안보에 위배되는 파일 등 위법한 자료를 등록 배포할 경우 관련기관의 요청이 있을 시 회원의 자료를 열람 및 해당 자료를 관련기관에 제출할 수 있습니다.
            </p>
          </section>

          <section id="article7" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">제 7조 회원의 아이디 및 비밀번호</h2>
            <p className="cyber-legal-text">
              1. 회원은 아이디와 비밀번호에 관해서 관리책임이 있습니다.
            </p>
            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">2. 회원의 아이디는 다음 각 호에 해당하는 경우에는 이용고객 또는 회사의 요청으로 변경할 수 있습니다.</h3>
              <ul className="cyber-legal-list">
                <li>타인에게 혐오감을 주거나 미풍양속에 어긋나는 경우</li>
                <li>기타 합리적인 사유가 있는 경우</li>
              </ul>
            </div>
            <p className="cyber-legal-text">
              3. 회원은 아이디 및 비밀번호를 제3자가 이용하도록 제공하여서는 안됩니다.
            </p>
            <p className="cyber-legal-text">
              4. 회사는 회원이 아이디 및 비밀번호를 소홀히 관리하여 발생하는 서비스 이용상의 손해 또는 회사의 고의 또는 중대한 과실이 없는 제3자의 부정이용 등으로 인한 손해에 대해 책임을 지지 않습니다.
            </p>
            <p className="cyber-legal-text">
              5. 회원은 아이디 및 비밀번호가 도용되거나 제3자가 사용하고 있음을 인지한 경우에는 이를 즉시 회사에 통지하고 회사의 안내에 따라야 합니다.
            </p>
          </section>

          <section id="article8" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">제 8조 회원의 의무</h2>
            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">1. 회원은 다음 각호에 해당하는 행위를 해서는 안됩니다.</h3>
              <ul className="cyber-legal-list">
                <li>이용 신청 또는 회원정보 변경 시 허위내용 등록</li>
                <li>타인의 정보 도용</li>
                <li>캠페인즈 그룹의 운영자, 회사를 사칭하거나 관련 정보를 도용</li>
                <li>회사가 게시한 정보의 변경</li>
                <li>회사와 기타 제3자의 저작권, 영업비밀, 특허권 등 지적재산권에 대한 침해</li>
                <li>회사와 다른 회원 및 기타 제3자를 희롱하거나, 위협하거나 명예를 손상시키는 행위</li>
                <li>외설, 폭력적인 메시지, 기타 공서양속에 반하는 정보를 공개 또는 게시하는 행위</li>
                <li>해킹을 통해서 다른 사용자의 정보를 취득하는 행위</li>
                <li>기타 현행 법령에 위반되는 불법적인 행위</li>
              </ul>
            </div>
            <p className="cyber-legal-text">
              2. 회사는 회원이 전항에서 금지한 행위를 하는 경우, 위반 행위의 경중에 따라 서비스의 이용정지/계약의 해지 등 서비스 이용 제한, 수사 기관에의 고발 조치 등 합당한 조치를 취할 수 있습니다.
            </p>
            <p className="cyber-legal-text">
              3. 회원은 회사의 명시적 사전 동의가 없는 한 서비스의 이용권한 및 기타 이용계약상의 지위를 제3자에게 양도, 증여, 대여할 수 없으며 이를 담보로 제공할 수 없습니다.
            </p>
            <p className="cyber-legal-text">
              4. 회원은 관계법, 이 약관의 규정, 이용안내 및 서비스와 관련하여 공지한 주의사항, 회사가 통지하는 사항 등을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 안 됩니다.
            </p>
            <p className="cyber-legal-text">
              5. 회원은 회사의 사전 허락 없이 회사가 정한 이용 목적과 방법에 반하여 영업/광고활동 등을 할 수 없고, 회원의 서비스 이용이 회사의 재산권, 영업권 또는 비즈니스 모델을 침해하여서는 안됩니다.
            </p>
            <p className="cyber-legal-text">
              6. 회사는 회원이 제1항의 행위를 하는 경우 해당 게시물 등을 삭제 또는 임시삭제할 수 있고 서비스의 이용을 제한하거나 일방적으로 본 계약을 해지할 수 있습니다.
            </p>
          </section>

          <section id="article9" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">제 9조 회사의 의무</h2>
            <p className="cyber-legal-text">
              1. 회사는 계속적이고 안정적인 서비스의 제공을 위하여 최선을 다하여 노력합니다.
            </p>
            <p className="cyber-legal-text">
              2. 회사는 회원이 안전하게 서비스를 이용할 수 있도록 현재 인터넷 보안기술의 발전수준과 회사가 제공하는 서비스의 성격에 적합한 보안시스템을 갖추고 운영해야 합니다.
            </p>
            <p className="cyber-legal-text">
              3. 회사는 서비스를 이용하는 회원으로부터 제기되는 의견이나 불만이 정당하다고 인정할 경우에 이를 처리하여야 합니다. 이때 처리과정에 대해서 고객에게 메일 및 게시판 등의 방법으로 전달합니다.
            </p>
            <p className="cyber-legal-text">
              4. 회사는 정보통신망 이용촉진 및 정보보호에 관한 법률, 통신비밀보호법, 전기통신사업법 등 서비스의 운영, 유지와 관련 있는 법규를 준수합니다.
            </p>
          </section>

          <section id="article10" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">제 10조 전자우편을 통한 정보의 제공</h2>
            <p className="cyber-legal-text">
              1. 회사는 회원의 서비스 이용에 필요하다고 인정되는 다양한 정보를 회원이 제공한 이메일 주소로 제공할 수 있습니다.
            </p>
            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">2. 회사는 다음 각호에 해당하는 경우 회원의 동의여부와 상관없이 이메일로 발송할 수 있습니다.</h3>
              <ul className="cyber-legal-list">
                <li>이용 신청 혹은 이메일 변경 신청에서 입력한 전자우편 주소의 소유를 확인하기 위해서 인증메일을 발송하는 경우</li>
                <li>회원의 정보가 변경되어 확인하기 위해서 인증메일을 발송하는 경우</li>
                <li>기타 서비스를 제공함에 있어 회원이 반드시 알아야 하는 중대한 정보라고 회사가 판단하는 경우</li>
              </ul>
            </div>
          </section>

          <section id="article11" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">제 11조 서비스 이용의 제한</h2>
            <p className="cyber-legal-text">
              1. 회사는 천재지변이나 국가비상사태, 해결이 곤란한 기술적 결함 또는 서비스 운영의 심각한 변화 등 불가항력적인 경우가 발생 또는 발생이 예상될 때는 서비스의 전부 또는 일부를 예고 없이 제한하거나 중지할 수 있습니다.
            </p>
            <p className="cyber-legal-text">
              2. 서비스를 이용하게 됨으로써 서비스 영역에서 발생하는 회원 사이의 문제에 대해 회사는 책임을 지지 않습니다.
            </p>
            <p className="cyber-legal-text">
              3. 회원의 관리 소홀로 인하여 ID 및 비밀번호의 유출로 인해 회원에게 서비스 이용상의 손해가 발생하거나 제3자에 의한 부정이용 등으로 회원의 의무조항을 위반한 경우 ID 및 해당 도메인의 이용이 제한될 수 있습니다.
            </p>
            <p className="cyber-legal-text">
              4. 회사가 본 약관 제8조의 위반 행위를 조사하는 과정에서 당해 회원 ID 및 도메인이 특정 위반행위에 직접적으로 관련되어 있는 경우 등 다른 회원의 권익 보호 및 서비스의 질서유지를 위해 불가피할 경우에는 해당 ID 및 도메인의 이용을 일시적으로 정지할 수 있습니다. 이에 대해 회원은 서비스 홈페이지 또는 이메일 등을 통해 이의신청을 할 수 있습니다.
            </p>
          </section>

          <section id="article12" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">제 12조 서비스 이용의 중지 및 해지</h2>
            <p className="cyber-legal-text">
              1. 회원은 회사에 언제든지 회원 탈퇴를 요청할 수 있으며, 회사는 이와 같은 요청을 받았을 경우, 관련법령 등이 정하는 바에 따라 이를 즉시 처리하여야 합니다.
            </p>
            <p className="cyber-legal-text">
              2. 회원이 서비스의 이용중지를 원하는 경우에는 전자우편 등의 방법으로 회사에 중지신청을 할 수 있습니다. 회사는 이와 같은 요청을 받았을 경우, 관련법령 등이 정하는 바에 따라 이를 즉시 처리하여야 합니다.
            </p>
            <p className="cyber-legal-text">
              3. 회사는 회원이 본 약관 제8조의 이용자의 의무를 위반한 경우 및 서비스의 정상적인 운영을 방해한 경우에는 사전 통보 후 회원 자격을 제한, 이용계약을 해지하거나 또는 기간을 정하여 서비스의 이용을 중지할 수 있습니다.
            </p>
            <p className="cyber-legal-text">
              4. 회사는 전항에도 불구하고, 저작권법 및 컴퓨터프로그램보호법을 위반한 불법프로그램의 제공 및 운영방해, 정보통신망법을 위반한 불법통신 및 해킹, 악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련법을 위반한 경우에는 즉시 영구이용정지를 할 수 있습니다.
            </p>
            <p className="cyber-legal-text">
              5. 회사는 회원이 계속해서 3개월 이상 로그인하지 않는 경우, 회원정보의 보호 및 운영의 효율성을 위해 이용을 제한할 수 있습니다.
            </p>
            <p className="cyber-legal-text">
              6. 서비스 이용을 제한하거나 계약을 해지하는 경우에는 회사는 통지 방식에 따라 알리게 되며 이 때 회원은 서비스 홈페이지 또는 이메일 등을 통해 이의신청을 할 수 있습니다. 이 때 이의가 정당하다고 회사가 인정하는 경우 회사는 즉시 서비스의 이용을 재개합니다.
            </p>
          </section>

          <section id="article13" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">제 13조 권리의 귀속 및 저작물의 이용</h2>
            <p className="cyber-legal-text">
              1. 회사가 제공하는 서비스에 대한 저작권 등 지식 재산권은 회사에 귀속 됩니다.
            </p>
            <p className="cyber-legal-text">
              2. 회사는 서비스와 관련하여 이용자에게 회사가 정한 조건에 따라 회사가 제공하는 서비스를 이용할 수 있는 권한만을 부여하며, 이용자는 이를 양도, 판매, 담보제공 하는 등 처분행위를 할 수 없습니다.
            </p>
            <p className="cyber-legal-text">
              3. 커뮤니티에서 활발하게 논의가 이루어지고 있거나, 중요 정보를 담은 게시물 등, 커뮤니티 운영진의 판단에 따라 더 많은 이용자에게 소개하고자 하는 게시물은 회사가 제공하는 정보에도 노출될 수 있습니다.
            </p>
          </section>

          <section id="article14" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">제 14조 게시물의 관리</h2>
            <p className="cyber-legal-text">
              회원의 게시물이 정보통신망법 및 저작권법등 관련법에 위반되는 내용을 포함하는 경우, 권리자는 관련법이 정한 절차에 따라 해당 게시물의 게시중단 및 삭제 등을 요청할 수 있으며, 회사는 관련법에 따라 조치를 취하여야 합니다.
            </p>
            <p className="cyber-legal-text">
              회사는 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가 인정될 만한 사유가 있거나 본 약관 및 기타 회사의 정책, 관련법에 위반되는 경우에는 관련법에 따라 해당 게시물에 대해 임시조치 등을 취할 수 있습니다.
            </p>
            <p className="cyber-legal-text">
              회원이 비공개로 설정한 게시물에 대해서는 회사를 포함한 다른 사람이 열람할 수 없습니다. 단, 법원, 수사기관이나 기타 행정기관으로부터 정보제공을 요청 받은 경우나 기타 법률에 의해 요구되는 경우에는 회사를 포함한 다른 사람이 해당 게시물을 열람할 수 있습니다.
            </p>
          </section>

          <section id="article15" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">제 15조 회원 가입 및 취소</h2>
            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">1. 가입</h3>
              <ul className="cyber-legal-list">
                <li>회원은 유료 멤버십 가입 시 회사가 제공하는 서비스를 선택하여 가입할 수 있으며, 멤버십 권한에 따라 책정된 과금을 결제합니다.</li>
                <li>멤버십 권한에 따라 책정된 과금은 선불 결제되며, 매월 자동 연장되어 결제됩니다.</li>
              </ul>
            </div>
            <div className="cyber-legal-subsection">
              <h3 className="cyber-legal-subsection-title">2. 취소</h3>
              <ul className="cyber-legal-list">
                <li>멤버십 가입 취소는 1개월 단위로 가능하며, 자동 결제가 이루어진 경우 해당 비용은 환불되지 않습니다.</li>
                <li>이용자가 약관을 위반해서 계정이 정지된 경우 이미 결제된 비용에 대한 결제 취소 및 환불이 불가능합니다.</li>
                <li>본 약관에 규정되지 않은 결제 취소 및 환불에 관한 사항은, 사이트의 이용안내에 있는 내용을 준용합니다. 그 외의 사항은 전자상거래에서의 소비자 보호에 관한 법률과 같은 관련 법령을 준용합니다.</li>
              </ul>
            </div>
          </section>

          <section id="article16" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">제 16조 책임제한</h2>
            <div className="cyber-legal-warning">
              <div className="cyber-legal-warning-content">
                <h3 className="cyber-legal-warning-title">중요한 책임제한 사항</h3>
                <p className="cyber-legal-warning-text">
                  다음의 책임제한 사항들을 반드시 숙지해주시기 바랍니다.
                </p>
              </div>
            </div>
            <p className="cyber-legal-text">
              1. 회사는 회원의 약관, 서비스 이용 방법 및 이용 기준을 준수하지 않는 등 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.
            </p>
            <p className="cyber-legal-text">
              2. 회사는 서비스를 통하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 보증하지 않습니다.
            </p>
            <p className="cyber-legal-text">
              3. 회사는 회원 간 또는 회원과 제3자 상호간에 서비스를 매개로 하여 거래 등을 한 경우에는 책임이 면제됩니다.
            </p>
            <p className="cyber-legal-text">
              4. 회사는 서비스 이용과 관련하여 관련법에 특별한 규정이 없는 한 책임을 지지 않습니다.
            </p>
            <p className="cyber-legal-text">
              5. 회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지, 제3자가 제공하는 오픈아이디의 인증 장애, 해결이 곤란한 기술적 결함 기타 불가항력으로 인하여 서비스를 제공할 수 없는 경우 책임이 면제됩니다.
            </p>
            <p className="cyber-legal-text">
              6. 회사는 사전에 공지된 서비스용 설비의 보수, 교체, 정기점검, 공사 등 부득이한 사유로 서비스가 중지되거나 장애가 발생한 경우에 대서는 책임이 면제됩니다. 회원은 자신의 결정에 의하여 회사의 서비스를 사용하여 특정 프로그램이나 정보 등을 다운받거나 접근함으로써 입게 되는 컴퓨터 시스템상의 손해나 데이터, 정보의 상실에 대한 책임을 집니다.
            </p>
            <p className="cyber-legal-text">
              7. 회사는 기간통신사업자가 전기통신서비스를 중지하거나 정상적으로 제공하지 아니하여 손해가 발생한 경우에는 책임이 면제됩니다. 회원의 컴퓨터 오류, 신상정보 및 이메일 주소의 부정확한 기재, 비밀번호 관리의 소홀 등 회원의 귀책사유로 인해 손해가 발생한 경우 회사는 책임을 지지 않습니다.
            </p>
            <p className="cyber-legal-text">
              8. 회사는 회원의 컴퓨터 환경이나 회사의 관리 범위에 있지 아니한 보안 문제로 인하여 발생하는 제반 문제 또는 현재의 보안기술 수준으로 방어가 곤란한 네트워크 해킹 등 회사의 귀책사유 없이 발생하는 문제에 대해서 책임을 지지 않습니다.
            </p>
            <p className="cyber-legal-text">
              9. 회사는 서비스가 제공한 내용에 대한 중요 정보의 정확성, 내용, 완전성, 적법성, 신뢰성 등에 대하여 보증하거나 책임을 지지 않으며, 사이트의 삭제, 저장실패, 잘못된 인도, 정보에 대한 제공에 대한 궁극적인 책임을 지지 않습니다. 또한, 회사는 회원이 서비스 내 또는 웹사이트상에 게시 또는 전송한 정보, 자료, 사실의 신뢰도, 정확성, 완결성, 품질 등 내용에 대해서는 책임을 지지 않습니다.
            </p>
            <p className="cyber-legal-text">
              10. 회사는 회원 상호간 또는 회원과 제 3자 상호 간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없으며 이로 인한 손해를 배상할 책임도 없습니다.
            </p>
            <p className="cyber-legal-text">
              11. 회사는 회원이 서비스를 이용하여 기대하는 효용을 얻지 못한 것에 대하여 책임을 지지 않으며 서비스에 대한 취사 선택 또는 이용으로 발생하는 손해 등에 대해서는 책임이 면제됩니다.
            </p>
            <p className="cyber-legal-text">
              12. 회사는 회원의 게시물을 등록 전에 사전심사 하거나 상시적으로 게시물의 내용을 확인 또는 검토하여야 할 의무가 없으며, 그 결과에 대한 책임을 지지 않습니다.
            </p>
          </section>

          <section id="article17" className="cyber-legal-section">
            <h2 className="cyber-legal-section-title">제 17조 준거법 및 재판관할</h2>
            <p className="cyber-legal-text">
              1. 회사와 회원 간 제기된 소송에는 대한민국법을 준거법으로 합니다.
            </p>
            <p className="cyber-legal-text">
              2. 회사와 회원간 발생한 분쟁에 관한 소송은 민사소송법 상의 관할법원에 제소합니다.
            </p>
          </section>

          {/* Contact Section */}
          <section id="contact" className="cyber-legal-contact">
            <h2 className="cyber-legal-contact-title">문의사항이 있으신가요?</h2>
            <p className="cyber-legal-contact-text">
              ㈜소액트의 서비스와 관련하여 궁금하신 사항이 있으시면 이메일로 문의하시기 바랍니다.
            </p>
            <p className="cyber-legal-contact-text">
              <strong>(주)소액트</strong><br />
              이메일: <a href="mailto:so.act.kr@gmail.com" className="cyber-legal-contact-link">so.act.kr@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Terms;