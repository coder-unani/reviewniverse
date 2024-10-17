'use client';

import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';

import CloseButton from '@/components/ui/Button/Close';

import styles from '@/styles/components/PolicyModal.module.scss';

const PrivacyModal = React.memo(({ isOpen, onClose }) => {
  const modalRef = useRef();

  // 모달창 클릭 이벤트
  const handleModalClose = (e) => {
    if (e.target === modalRef.current) onClose();
  };

  // 클라이언트 사이드에서만 Modal.setAppElement 설정
  useEffect(() => {
    // window 객체가 존재할 때만 실행
    if (typeof window !== 'undefined') {
      // Next.js에서는 #__next가 최상위 요소, #__next 인식하지 못해 대신 wrapper로 변경
      // Modal.setAppElement(document.getElementById('__next'));
      Modal.setAppElement(document.getElementById('wrapper'));
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      bodyOpenClassName="modal__open"
      className={styles.policy__modal__wrapper}
      overlayClassName={styles.policy__modal__overlay}
      ariaHideApp={false} // 중복 생성 방지
    >
      <div className={styles.policy__modal} ref={modalRef} onClick={handleModalClose}>
        <section className={styles.policy__section}>
          <section className={styles.policy__header__section}>
            <CloseButton onClose={onClose} />
            <h1 className={styles.policy__header__title}>개인정보 처리방침</h1>
          </section>
          <section className={styles.policy__content__section}>
            <div className={styles.policy__version__wrapper}>
              <p>시행일자: 2024-08-28</p>
              <select className={styles.policy__version__select} name="이전 버전 보기">
                {/* option 기본값 */}
                <option value="2024-08-22">2024-08-28</option>
              </select>
            </div>
            <div className={styles.policy__content__wrapper}>
              <p>
                리뷰니버스(이하 “회사”)는 고객(회원 및 비회원 포함)님의 개인정보 보호를 소중하게 생각하고, 회원의
                개인정보를 보호하기 위하여 항상 최선을 다해 노력하고 있습니다,
              </p>
              <p>
                회사는 개인정보 보호 관련 주요 법률인 개인정보 보호법, 정보통신망 이용촉진 및 정보보호 등에 관한
                법률(이하 “정보통신망법”이라고 합니다)을 비롯한 모든 개인정보 보호에 관련 법률 규정 및 국가기관 등이
                제정한 고시, 훈령, 지침 등을 준수합니다.
              </p>
              <p>
                본 개인정보처리방침은 회사의 서비스를 이용하는 회원에 대하여 적용되며, 회원이 제공하는 개인정보가 어떠한
                용도와 방식으로 이용되고 있으며, 개인정보 보호를 위하여 회사가 어떠한 조치를 취하고 있는지 알립니다.
                또한 개인정보와 관련하여 회사와 회원간의 권리 및 의무 관계를 규정하여 회원의 ‘개인정보자기결정권’을
                보장하는 수단이 됩니다.
              </p>
            </div>
            <div className={styles.policy__content__wrapper}>
              <h4 className={styles.policy__content__title}>1. 개인정보의 수집 및 이용 목적/항목</h4>
              <p>
                회사는 다음과 같이 서비스 이용계약의 성립 및 이행에 필요한 최소한의 개인정보를 수집하며, 회원가입 시
                개인정보 수집 · 이용 동의에 대한 내용을 제공하고 회원이 &apos;동의&apos; 버튼을 클릭하면 개인정보 수집 ·
                이용에 대해 동의한 것으로 봅니다.
              </p>
            </div>
            <div className={styles.policy__content__wrapper}>
              <p>1) 필수 개인정보 수집 항목</p>
              <table className={styles.policy__table}>
                <thead>
                  <tr>
                    <th>수집 및 이용 목적</th>
                    <th colSpan={2}>수집 및 이용 항목</th>
                    <th>보유 및 이용기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={3}>SNS ID 회원 가입 및 회원 관리</td>
                    <td>카카오</td>
                    <td>이름, 이메일주소, 닉네임, 프로필 사진</td>
                    <td rowSpan={3}>회원 탈퇴 시까지</td>
                  </tr>
                  <tr>
                    <td>네이버</td>
                    <td>이름, 이메일주소, 닉네임, 프로필 사진</td>
                  </tr>
                  <tr>
                    <td>구글</td>
                    <td>이름, 이메일주소, 프로필 사진</td>
                  </tr>
                  <tr>
                    <td>만 14세 미만 회원가입 법정대리인 동의</td>
                    <td colSpan={2}>법정대리인의 이름, 생년월일, 성별, 중복가입확인정보, 휴대전화번호</td>
                    <td>회원 탈퇴 시까지</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.policy__content__wrapper}>
              <p>2) 선택 개인정보 수집 항목</p>
              <table className={styles.policy__table}>
                <thead>
                  <tr>
                    <th>수집 및 이용 목적</th>
                    <th>수집 및 이용 항목</th>
                    <th>보유 및 이용기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>서비스/업데이트 정보 제공, 맞춤형 추천 서비스 제공</td>
                    <td>성별, 연령, 서비스 이용기록, 디바이스 토큰, 선호하는 시청 성향</td>
                    <td>동의 철회 또는 회원 탈퇴 시까지</td>
                  </tr>
                  <tr>
                    <td>이벤트 응모 및 경품 지급</td>
                    <td>이름, 이메일주소, 휴대전화번호, 주소, 생년월일</td>
                    <td>동의 철회 또는 이벤트 목적 달성 시까지</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.policy__content__wrapper}>
              <p>3) 기타 수집 항목</p>
              <br />
              <ul>
                <li>
                  가. 서비스 이용 과정에서 아래와 같은 정보들이 생성되어 수집될 수 있습니다.
                  <ul className={styles.policy__privacy__more__list}>
                    <li>
                      PC : PC MacAddress, PC 사양정보, 브라우저 정보, 기타 서비스 이용 시 사용되는 프로그램 버전 정보
                    </li>
                    <li>
                      휴대전화(스마트폰) & 스마트OS 탑재 모바일 기기(Tablet PC 등) : 모델명, 기기별 고유번호(UDID,IMEI
                      등), OS정보, 이동통신사, 구글/애플 광고 ID
                    </li>
                    <li>기타 정보 : 서비스 이용(정지) 기록, 접속 로그, 쿠키, 접속 IP정보</li>
                  </ul>
                </li>
                <br />
                <li>
                  나. 자동 생성에 의해 수집되는 정보는 개인을 식별할 수 없는 형태이며, 회사는 수집된 정보를 활용하여
                  개인을 식별하기 위한 활동을 하지 않습니다.
                </li>
                <br />
                <li>
                  다. 자동 생성에 의해 수집되는 정보에 대한 내용과 수집 거부 방법은 제9조 및 제10조를 참고하시기
                  바랍니다.
                </li>
              </ul>
            </div>
            <div className={styles.policy__content__wrapper}>
              <p>4) 수집방법</p>
              <ul className={styles.policy__privacy__more__list}>
                <li>
                  회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의를 하고 직접 정보를 입력하여 수집
                </li>
                <li>기기정보와 같은 생성정보는 PC웹, 모바일 웹/앱 이용 과정에서 자동으로 생성되어 수집</li>
                <li>
                  이벤트 응모 및 경품 신청 과정에서 해당 서비스의 이용자에 한해 추가 개인정보 수집이 발생할 수 있으며,
                  해당 개인정보 수집 시점에서 이용자로부터 ‘개인정보 수집 항목, 개인정보 수집 및 이용목적, 개인정보의
                  보관 기간’에 대하여 동의를 받습니다.
                </li>
              </ul>
            </div>
            <div className={styles.policy__content__wrapper}>
              <h4 className={styles.policy__content__title}>2. 개인정보의 보유 및 이용기간</h4>
              <ul>
                <li>
                  <p>
                    고객님의 개인정보는 수집목적 또는 제공받은 목적의 달성 시까지 보유하고 이를 활용합니다. 다만,
                    개인정보의 계속 보관·이용에 관한 별도 동의를 얻은 경우 또는 관계 법령에 따라 보관 의무가 주어진
                    경우에는 예외로 합니다.
                  </p>
                  <br />
                  <p>가. 관계법령에 따른 보존(아래에 한정되지 않음)</p>
                  <ul className={styles.policy__privacy__more__list}>
                    <li>계약 또는 청약철회 등에 관한 기록: 5년(전자상거래 등에서의 소비자보호에 관한 법률)</li>
                    <li>대금결제 및 재화 등의 공급에 관한 기록: 5년(전자상거래 등에서의 소비자보호에 관한 법률)</li>
                    <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년(전자상거래 등에서의 소비자보호에 관한 법률)</li>
                    <li>접속에 관한 기록: 사이트 방문 기록 3개월(통신비밀보호법)</li>
                    <li>그 외: 국세기본법 등에 따라 거래기록 등을 보관해야 하는 경우</li>
                  </ul>
                  <br />
                  <p>나. 기타 고객의 동의를 받은 경우 동의를 받은 기간까지</p>
                  <ul className={styles.policy__privacy__more__list}>
                    <li>회원가입 및 서비스 이용에 관한 기록: 회원탈퇴 시 즉시 삭제</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className={styles.policy__content__wrapper}>
              <h4 className={styles.policy__content__title}>3. 개인정보의 파기절차 및 방법</h4>
              <p>회사는 수집된 개인정보의 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
              <br />
              <ul>
                <p>1) 파기절차</p>
                <li>
                  <ul className={styles.policy__privacy__more__list}>
                    <li>
                      회원이 서비스 가입 등을 위해 기재한 개인정보는 서비스 해지 등 이용목적이 달성된 후 내부 방침 및
                      기타 관련 법령에 의한 정보보호 사유에 따라 일정기간 동안 저장 보관된 후 삭제하거나 파기 됩니다.
                    </li>
                  </ul>
                </li>
                <br />
                <p>2) 파기대상</p>
                <li>
                  <ul className={styles.policy__privacy__more__list}>
                    <li>보유기간 및 관련법령에 따른 보존기간이 종료된 고객정보</li>
                  </ul>
                </li>
                <br />
                <p>3) 파기방법</p>
                <li>
                  <ul className={styles.policy__privacy__more__list}>
                    <li>서면에 작성, 출력된 개인정보: 분쇄하거나 소각</li>
                    <li>DB등 전자적 파일 형태로 저장된 개인정보: 기록을 재생할 수 없는 기술적 방법으로 삭제</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className={styles.policy__content__wrapper}>
              <h4 className={styles.policy__content__title}>4. 개인정보의 처리 위탁</h4>
              <p>1) 회사는 서비스 제공을 위하여 필요한 업무 중 일부를 다음과 같이 외부 업체에 위탁하고 있습니다.</p>
              <br />
              <p>
                2) 위탁받은 업체가 정보통신망법에 따라 개인정보를 안전하게 처리하도록 필요한 사항을 규정하고 관리/감독을
                하고 있습니다. 회사가 수탁업체에 위탁하는 업무와 관련된 서비스를 이용하지 않는 경우, 회원의 개인정보가
                수탁업체에 제공되지 않습니다.
              </p>
              <br />
              <p>
                3) 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보처리방침을 통하여 공개하도록
                하겠습니다.
              </p>
              <br />
              <table className={styles.policy__table}>
                <thead>
                  <tr>
                    <th>위탁 업체</th>
                    <th>위탁업무 목적</th>
                    <th>개인정보의 보유 및 이용기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Amazon Web Service: 대한민국 서울 (AWS Seoul Region)</td>
                    <td>서비스 제공을 위한 데이터 보관 및 시스템 운영</td>
                    <td>회원 동의 철회 또는 회원 탈퇴 시까지</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.policy__content__wrapper}>
              <h4 className={styles.policy__content__title}>5. 개인정보에 대한 고객의 권리・의무 및 행사방법</h4>
              <p>
                1) 회원은 회사에 대해 언제든지 개인정보 열람・정정・삭제・처리정지 및 철회 요구, 자동화된 결정에 대한
                거부 또는 설명 요구 등의 권리를 행사할 수 있습니다.
              </p>
              <ul className={styles.policy__privacy__more__list}>
                <li>
                  14세 미만 아동에 관한 개인정보의 열람등 요구는 법정대리인이 직접 해야 하며, 14세 이상의 미성년자인
                  회원은 개인정보에 관하여 미성년자 본인이 권리를 행사하거나 법정대리인을 통하여 권리를 행사할 수도
                  있습니다.
                </li>
              </ul>
              <br />
              <p>
                2) 권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제41조 제1항에 따라 서면, 전자우편, 모사전송(FAX)
                등을 통하여 하실 수 있으며, 회사는 이에 대해 지체없이 조치하겠습니다.
              </p>
              <ul className={styles.policy__privacy__more__list}>
                <li>
                  회원은 언제든지 홈페이지 ‘내정보 &gt; 회원정보 수정’에서 개인정보를 직접 조회・수정・삭제하거나
                  ‘문의하기’를 통해 열람을 요청할 수 있습니다.
                </li>
                <li>회원은 언제든지 ‘회원탈퇴’를 통해 개인정보의 수집 및 이용 동의 철회가 가능합니다.</li>
                <li>회원은 언제든지 홈페이지 하단 문의하기를 통해 자동화된 결정의 거부 및 설명 요구가 가능합니다.</li>
              </ul>
              <br />
              <p>
                3) 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수도 있습니다. 이 경우
                “개인정보 처리 방법에 관한 고시” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
              </p>
              <br />
              <p>
                4) 정보주체가 개인정보 열람 및 처리 정지를 요구할 권리는 「개인정보 보호법」 제35조 제4항 및 제37조
                제2항에 의하여 제한될 수 있습니다.
              </p>
              <br />
              <p>
                5) 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 해당 개인정보의 삭제를 요구할 수
                없습니다.
              </p>
              <br />
              <p>
                6) 자동화된 결정이 이루어진다는 사실에 대해 정보주체의 동의를 받았거나, 계약 등을 통해 미리 알린 경우,
                법률에 명확히 규정이 있는 경우에는 자동화된 결정에 대한 거부는 인정되지 않으며 설명 및 검토 요구만
                가능합니다.
              </p>
              <ul className={styles.policy__privacy__more__list}>
                <li>
                  또한 자동화된 결정에 대한 거부・설명 요구는 다른 사람의 생명・신체・재산과 그 밖의 이익을 부당하게
                  침해할 우려가 있는 등 정당한 사유가 있는 경우에는 그 요구가 거절될 수 있습니다.
                </li>
              </ul>
              <br />
              <p>7) 회사는 권리 행사를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</p>
            </div>
            <div className={styles.policy__content__wrapper}>
              <h4 className={styles.policy__content__title}>6. 개인정보의 수집과 이용 또는 제공에 대한 동의 철회</h4>
              <p>
                고객님은 개인정보의 수집과 이용 또는 제공에 대한 동의를 철회할 수 있습니다. 동의 철회를 위해서는
                홈페이지에서 제공하는 ‘회원정보-회원 탈퇴’ 서비스에서 회원 탈퇴와 함께 동의를 철회할 수 있습니다.
              </p>
            </div>
            <div className={styles.policy__content__wrapper}>
              <h4 className={styles.policy__content__title}>7. 만 14세 미만 아동의 개인정보보호</h4>
              <p>
                회사는 아동의 회원가입을 통한 개인정보 수집 시 반드시 법정대리인의 동의(법정대리인의 휴대폰 인증을 통한
                동의)를 구하고 있습니다. 법정대리인의 동의가 없을 경우 해당 아동의 회원가입은 불가하며 아동 및
                법정대리인의 개인정보는 즉시 모두 폐기됩니다.
              </p>
            </div>
            <div className={styles.policy__content__wrapper}>
              <h4 className={styles.policy__content__title}>
                8. 개인정보의 자동 수집 장치의 설치, 운영 및 그 거부에 관한 사항
              </h4>
              <p>1) 쿠키(Cookie)란?</p>
              <ul>
                <li>
                  회사는 서비스 제공 시, &quot;쿠키(Cookie)&quot;를 사용합니다. 쿠키는 서비스를 제공하는 서버가 고객님의
                  PC 웹브라우저에게 전송하는 정보이며, 고객님의 PC 내 하드디스크에 암호화되어 저장됩니다. 고객님은
                  쿠키에 대한 선택권을 가지고 있습니다. 고객님이 쿠키에 의한 정보수집을 거부하실 경우에는 웹브라우저
                  보안 정책을 통해 허용 여부를 결정하실 수 있습니다.
                </li>
              </ul>
              <br />
              <p>2) 사용목적</p>
              <ul>
                <br />
                <li>가. 회원님의 편의를 위한 서비스 제공 (자동 로그인)</li>
                <br />
                <li>
                  나. 고객님의 접속 빈도나 방문 시간 등을 분석, 고객님의 취향과 관심분야를 파악 및 각종 이벤트 참여 정도
                  및 방문 횟수 파악 이용행태와 활동 분석 등을 통한 인구통계학적 특성에 기반한 관심사에 따른 다양한
                  맞춤형 마케팅 및 광고, 콘텐츠 추천•제공, 신규 상품•서비스 개발 등에 활용
                </li>
              </ul>
              <br />
              <p>3) 쿠키에 의해 수집된 정보의 보유 및 이용기간</p>
              <ul>
                <li>쿠키 수신 차단 또는 처리 목적 달성 시까지</li>
              </ul>
              <br />
              <p>4) 거부 방법</p>
              <ul>
                <li>
                  회원은 다음과 같은 방법으로 쿠키 설치에 대한 선택권을 가지고 있으며, 쿠키 설정을 통해 쿠키 허용 및
                  거부를 할 수 있습니다. 다만 쿠키 설치를 거부할 경우 웹 사용이 불편해지며, 로그인이 필요한 일부 서비스
                  이용이 어려울 수 있습니다.
                  <ul className={styles.policy__privacy__more__list}>
                    <li>Edge : 설정 및 추가 옵션 &gt; 설정 &gt; 사이트 권한 &gt; 쿠키 및 사이트 데이터</li>
                    <li>Chrome : 설정 &gt; 개인 정보 보호 및 보안 &gt; 서드 파티 쿠키</li>
                    <li>
                      Android : 홈 화면 인터넷 브라우저 실행 &gt; 더보기 &gt; 설정 &gt; 자바 스크립트 실행 및 쿠키 허용
                      항목
                    </li>
                    <li>iOS : 설정 &gt; Safari &gt; 고급 &gt; 모든 쿠키 차단</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className={styles.policy__content__wrapper}>
              <h4 className={styles.policy__content__title}>9. 개인정보보호책임자 및 담당자</h4>
              <p>
                회사는 회원의 개인정보보호를 가장 중요시하며, 회원의 개인정보가 훼손, 침해 또는 누설되지 않도록 최선을
                다하고 있습니다. 서비스를 이용하시면서 발생하는 모든 개인정보보호 관련 민원은 고객센터에 신고하시면
                신속하게 답변해 드리도록 하겠습니다.
                <br />
                <br />
                [개인정보보호책임자]
                <br />
                성 명: 이윤환 <br />
                전자우편: groot@orbitcode.kr <br />
                <br />
                [개인정보관리담당자]
                <br />
                성 명: 강화경
                <br />
                전자우편: rocket@orbitcode.kr
              </p>
            </div>
            <div className={styles.policy__content__wrapper}>
              <h4 className={styles.policy__content__title}>10. 개인정보 처리방침 변경</h4>
              <p>
                이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는
                경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </div>
            <div className={styles.policy__content__wrapper}>
              <h4 className={styles.policy__content__title}>11. 개인정보 침해 관련 상담 및 신고</h4>
              <ul>
                <li>
                  개인정보 침해에 대한 상담 및 신고가 필요하신 경우에는 개인정보 관련 담당자에게 전화 또는 이메일로
                  연락하시거나, 아래의 기관으로 문의하실 수 있습니다.
                </li>
              </ul>
              <ul>
                <li>☎ 개인정보침해신고센터</li>
                <li>전화: 118(국번없이) / 홈페이지: http://www.privacy.kisa.or.kr</li>
              </ul>
            </div>
          </section>
        </section>
      </div>
    </Modal>
  );
});

export default PrivacyModal;
