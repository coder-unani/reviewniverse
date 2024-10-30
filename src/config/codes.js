import { SETTINGS } from '@/config/settings';

export const USER_CODE = {
  10: 'email',
  11: 'google',
  12: 'facebook',
  13: 'apple',
  14: 'kakao',
  15: 'naver',
};

export const USER_WATCH_TYPE_CODE = {
  10: {
    title: '소름돋는 연기력',
    subtitle: '언빌리버블',
    abbr: '연기력 🎩',
    image: `${SETTINGS.CDN_BASE_URL}/assets/images/watchtype/1.png`,
  },
  11: {
    title: '화려한 영상미',
    subtitle: '본격 눈호강',
    abbr: '영상미 🎥',
    image: `${SETTINGS.CDN_BASE_URL}/assets/images/watchtype/2.png`,
  },
  12: {
    title: '탄탄한 스토리',
    subtitle: '저게 저렇게 된다고?',
    abbr: '스토리 📖',
    image: `${SETTINGS.CDN_BASE_URL}/assets/images/watchtype/1.png`,
  },
  13: {
    title: '감독연출',
    subtitle: '기가맥힘',
    abbr: '연출 🎬',
    image: `${SETTINGS.CDN_BASE_URL}/assets/images/watchtype/1.png`,
  },
  14: {
    title: '고막 녹는 OST',
    subtitle: '본격 귀호강',
    abbr: 'OST 🎧',
    image: `${SETTINGS.CDN_BASE_URL}/assets/images/watchtype/1.png`,
  },
  15: {
    title: '초호화 캐스팅',
    subtitle: '걔도?쟤도?',
    abbr: '캐스팅 🧑‍🤝‍🧑',
    image: `${SETTINGS.CDN_BASE_URL}/assets/images/watchtype/1.png`,
  },
};

export const SCREEN_MAIN_ID = 'MA01,MA02,MA03,MA04,MA05';
export const SCREEN_MOVIE_ID = 'MA01,MA02,MA03,MA04,MA05';
export const SCREEN_SERIES_ID = 'MA01,MA02,MA03,MA04,MA05';

export const VIDEO_WATCHED_CODE = '10';
export const VIDEO_EXPECT_CODE = '30';

export const VIDEO_CODE = {
  10: '영화',
  11: '시리즈',
};

export const VIDEO_PLATFORM_CODE = {
  '01': '극장',
  10: '넷플릭스',
  11: '디즈니+',
  12: '티빙',
  13: '웨이브',
  14: '쿠팡플레이',
  15: '왓챠',
  16: '시리즈온',
  17: '애플 TV+',
  31: '라프텔',
  50: 'KMDB',
  51: 'TMDB',
};

export const VIDEO_TRAILER_CODE = {
  10: '공식 예고편',
  11: '기타 예고편',
  20: '티저 영상',
  30: '클립 영상',
  40: '메이킹 필름',
  99: '기타',
};

export const VIDEO_TRAILER_PLATFORM_CODE = {
  10: 'YouTube',
};

export const VIDEO_THUMBNAIL_CODE = {
  10: '포스터',
  11: '스틸컷',
};

export const VIDEO_ACTOR_CODE = {
  10: '주연',
  11: '조연',
  12: '단역',
  13: '출연',
  14: '내레이션',
  15: '특별출연',
  16: '카메오',
  17: '우정출연',
  18: '성우',
  19: '진행자',
};

export const VIDEO_STAFF_CODE = {
  10: '감독',
  11: '작가',
  12: '제작',
  13: '프로듀서',
  14: '연출',
  15: '기획',
  16: '각본',
  17: '원작',
  18: '음악',
  19: '미술',
  20: '촬영',
  21: '편집',
  22: '특수효과',
  23: '의상',
  24: '분장',
  25: '조명',
  26: '극본',
  27: '각색',
  28: '시리즈 구성',
  29: '동시녹음',
  30: '조감독',
};

export const INQUIRY_CODE = {
  10: '서비스 문의',
  11: '회원 문의',
  12: '제안 문의',
  13: '제휴 문의',
  14: '오류 제보',
  15: '작품 등록 요청',
  16: '작품 수정 요청',
  21: '신고',
  99: '기타 문의',
};

export const COUNTRY_CODE = {
  AF: {
    name_en: 'Afghanistan',
    name_ko: '아프가니스탄',
  },
  AL: {
    name_en: 'Albania',
    name_ko: '알바니아',
  },
  DZ: {
    name_en: 'Algeria',
    name_ko: '알제리',
  },
  AS: {
    name_en: 'American Samoa',
    name_ko: '아메리칸 사모아',
  },
  AD: {
    name_en: 'Andorra',
    name_ko: '안도라',
  },
  AO: {
    name_en: 'Angola',
    name_ko: '앙골라',
  },
  AI: {
    name_en: 'Anguilla',
    name_ko: '안길라',
  },
  AQ: {
    name_en: 'Antarctica',
    name_ko: '남극',
  },
  AG: {
    name_en: 'Antigua and Barbuda',
    name_ko: '앤티가 바부다',
  },
  AR: {
    name_en: 'Argentina',
    name_ko: '아르헨티나',
  },
  AM: {
    name_en: 'Armenia',
    name_ko: '아르메니아',
  },
  AW: {
    name_en: 'Aruba',
    name_ko: '아루바',
  },
  AU: {
    name_en: 'Australia',
    name_ko: '호주',
  },
  AT: {
    name_en: 'Austria',
    name_ko: '오스트리아',
  },
  AZ: {
    name_en: 'Azerbaijan',
    name_ko: '아제르바이잔',
  },
  BS: {
    name_en: 'Bahamas',
    name_ko: '바하마',
  },
  BH: {
    name_en: 'Bahrain',
    name_ko: '바레인',
  },
  BD: {
    name_en: 'Bangladesh',
    name_ko: '방글라데시',
  },
  BB: {
    name_en: 'Barbados',
    name_ko: '바베이도스',
  },
  BY: {
    name_en: 'Belarus',
    name_ko: '벨라루스',
  },
  BE: {
    code: 'BE',
    name_en: 'Belgium',
    name_ko: '벨기에',
  },
  BZ: {
    name_en: 'Belize',
    name_ko: '벨리즈',
  },
  BJ: {
    name_en: 'Benin',
    name_ko: '베냉',
  },
  BM: {
    name_en: 'Bermuda',
    name_ko: '버뮤다',
  },
  BT: {
    name_en: 'Bhutan',
    name_ko: '부탄',
  },
  BO: {
    name_en: 'Bolivia',
    name_ko: '볼리비아',
  },
  BA: {
    name_en: 'Bosnia and Herzegovina',
    name_ko: '보스니아 헤르체고비나',
  },
  BW: {
    name_en: 'Botswana',
    name_ko: '보츠와나',
  },
  BR: {
    name_en: 'Brazil',
    name_ko: '브라질',
  },
  BN: {
    name_en: 'Brunei Darussalam',
    name_ko: '브루나이',
  },
  BG: {
    name_en: 'Bulgaria',
    name_ko: '불가리아',
  },
  BF: {
    name_en: 'Burkina Faso',
    name_ko: '부르키나파소',
  },
  BI: {
    name_en: 'Burundi',
    name_ko: '부룬디',
  },
  KH: {
    name_en: 'Cambodia',
    name_ko: '캄보디아',
  },
  CM: {
    name_en: 'Cameroon',
    name_ko: '카메룬',
  },
  CA: {
    name_en: 'Canada',
    name_ko: '캐나다',
  },
  CV: {
    name_en: 'Cape Verde',
    name_ko: '카보베르데',
  },
  KY: {
    name_en: 'Cayman Islands',
    name_ko: '케이맨 제도',
  },
  CF: {
    name_en: 'Central African Republic',
    name_ko: '중앙아프리카공화국',
  },
  TD: {
    name_en: 'Chad',
    name_ko: '차드',
  },
  CL: {
    name_en: 'Chile',
    name_ko: '칠레',
  },
  CN: {
    name_en: 'China',
    name_ko: '중국',
  },
  CO: {
    name_en: 'Colombia',
    name_ko: '콜롬비아',
  },
  KM: {
    name_en: 'Comoros',
    name_ko: '코모로스',
  },
  CG: {
    name_en: 'Congo',
    name_ko: '콩고',
  },
  CD: {
    name_en: 'Congo, Democratic Republic of the',
    name_ko: '콩고민주공화국',
  },
  CR: {
    name_en: 'Costa Rica',
    name_ko: '코스타리카',
  },
  HR: {
    name_en: 'Croatia',
    name_ko: '크로아티아',
  },
  CU: {
    name_en: 'Cuba',
    name_ko: '쿠바',
  },
  CY: {
    name_en: 'Cyprus',
    name_ko: '키프로스',
  },
  CZ: {
    name_en: 'Czech Republic',
    name_ko: '체코',
  },
  DK: {
    name_en: 'Denmark',
    name_ko: '덴마크',
  },
  DJ: {
    name_en: 'Djibouti',
    name_ko: '지부티',
  },
  DM: {
    name_en: 'Dominica',
    name_ko: '도미니카',
  },
  DO: {
    name_en: 'Dominican Republic',
    name_ko: '도미니카 공화국',
  },
  EC: {
    name_en: 'Ecuador',
    name_ko: '에콰도르',
  },
  EG: {
    name_en: 'Egypt',
    name_ko: '이집트',
  },
  SV: {
    name_en: 'El Salvador',
    name_ko: '엘살바도르',
  },
  GQ: {
    name_en: 'Equatorial Guinea',
    name_ko: '적도 기니',
  },
  ER: {
    name_en: 'Eritrea',
    name_ko: '에리트레아',
  },
  EE: {
    name_en: 'Estonia',
    name_ko: '에스토니아',
  },
  ET: {
    name_en: 'Ethiopia',
    name_ko: '에티오피아',
  },
  FJ: {
    name_en: 'Fiji',
    name_ko: '피지',
  },
  FI: {
    name_en: 'Finland',
    name_ko: '핀란드',
  },
  FR: {
    name_en: 'France',
    name_ko: '프랑스',
  },
  GA: {
    name_en: 'Gabon',
    name_ko: '가봉',
  },
  GM: {
    name_en: 'Gambia',
    name_ko: '감비아',
  },
  GE: {
    name_en: 'Georgia',
    name_ko: '조지아',
  },
  DE: {
    name_en: 'Germany',
    name_ko: '독일',
  },
  GH: {
    name_en: 'Ghana',
    name_ko: '가나',
  },
  GR: {
    name_en: 'Greece',
    name_ko: '그리스',
  },
  GD: {
    name_en: 'Grenada',
    name_ko: '그레나다',
  },
  GU: {
    name_en: 'Guam',
    name_ko: '괌',
  },
  GT: {
    name_en: 'Guatemala',
    name_ko: '과테말라',
  },
  GN: {
    name_en: 'Guinea',
    name_ko: '기니',
  },
  GW: {
    name_en: 'Guinea-Bissau',
    name_ko: '기니비사우',
  },
  GY: {
    name_en: 'Guyana',
    name_ko: '가이아나',
  },
  HT: {
    name_en: 'Haiti',
    name_ko: '아이티',
  },
  HN: {
    name_en: 'Honduras',
    name_ko: '온두라스',
  },
  HU: {
    name_en: 'Hungary',
    name_ko: '헝가리',
  },
  IS: {
    name_en: 'Iceland',
    name_ko: '아이슬란드',
  },
  IN: {
    name_en: 'India',
    name_ko: '인도',
  },
  ID: {
    name_en: 'Indonesia',
    name_ko: '인도네시아',
  },
  IR: {
    name_en: 'Iran',
    name_ko: '이란',
  },
  IQ: {
    name_en: 'Iraq',
    name_ko: '이라크',
  },
  IE: {
    name_en: 'Ireland',
    name_ko: '아일랜드',
  },
  IL: {
    name_en: 'Israel',
    name_ko: '이스라엘',
  },
  IT: {
    name_en: 'Italy',
    name_ko: '이탈리아',
  },
  JM: {
    name_en: 'Jamaica',
    name_ko: '자메이카',
  },
  JP: {
    name_en: 'Japan',
    name_ko: '일본',
  },
  JO: {
    name_en: 'Jordan',
    name_ko: '요르단',
  },
  KZ: {
    name_en: 'Kazakhstan',
    name_ko: '카자흐스탄',
  },
  KE: {
    name_en: 'Kenya',
    name_ko: '케냐',
  },
  KI: {
    name_en: 'Kiribati',
    name_ko: '키리바시',
  },
  KP: {
    name_en: "Korea, Democratic People's Republic of",
    name_ko: '조선민주주의인민공화국',
  },
  KR: {
    name_en: 'Korea, Republic of',
    name_ko: '한국',
  },
  KW: {
    name_en: 'Kuwait',
    name_ko: '쿠웨이트',
  },
  KG: {
    name_en: 'Kyrgyzstan',
    name_ko: '키르기스스탄',
  },
  LA: {
    name_en: "Lao People's Democratic Republic",
    name_ko: '라오스',
  },
  LV: {
    name_en: 'Latvia',
    name_ko: '라트비아',
  },
  LB: {
    code: 'LB',
    name_en: 'Lebanon',
    name_ko: '레바논',
  },
  LS: {
    name_en: 'Lesotho',
    name_ko: '레소토',
  },
  LR: {
    name_en: 'Liberia',
    name_ko: '라이베리아',
  },
  LY: {
    name_en: 'Libya',
    name_ko: '리비아',
  },
  LI: {
    name_en: 'Liechtenstein',
    name_ko: '리히텐슈타인',
  },
  LT: {
    name_en: 'Lithuania',
    name_ko: '리투아니아',
  },
  LU: {
    name_en: 'Luxembourg',
    name_ko: '룩셈부르크',
  },
  MG: {
    name_en: 'Madagascar',
    name_ko: '마다가스카르',
  },
  MW: {
    name_en: 'Malawi',
    name_ko: '말라위',
  },
  MY: {
    name_en: 'Malaysia',
    name_ko: '말레이시아',
  },
  MV: {
    name_en: 'Maldives',
    name_ko: '몰디브',
  },
  ML: {
    name_en: 'Mali',
    name_ko: '말리',
  },
  MT: {
    name_en: 'Malta',
    name_ko: '몰타',
  },
  MH: {
    name_en: 'Marshall Islands',
    name_ko: '마셜 제도',
  },
  MR: {
    name_en: 'Mauritania',
    name_ko: '모리타니아',
  },
  MU: {
    name_en: 'Mauritius',
    name_ko: '모리셔스',
  },
  MX: {
    name_en: 'Mexico',
    name_ko: '멕시코',
  },
  FM: {
    name_en: 'Micronesia, Federated States of',
    name_ko: '미크로네시아',
  },
  MD: {
    name_en: 'Moldova',
    name_ko: '몰도바',
  },
  MC: {
    name_en: 'Monaco',
    name_ko: '모나코',
  },
  MN: {
    name_en: 'Mongolia',
    name_ko: '몽골',
  },
  ME: {
    name_en: 'Montenegro',
    name_ko: '몬테네그로',
  },
  MA: {
    name_en: 'Morocco',
    name_ko: '모로코',
  },
  MZ: {
    name_en: 'Mozambique',
    name_ko: '모잠비크',
  },
  MM: {
    name_en: 'Myanmar',
    name_ko: '미얀마',
  },
  NA: {
    name_en: 'Namibia',
    name_ko: '나미비아',
  },
  NR: {
    name_en: 'Nauru',
    name_ko: '나우루',
  },
  NP: {
    name_en: 'Nepal',
    name_ko: '네팔',
  },
  NL: {
    name_en: 'Netherlands',
    name_ko: '네덜란드',
  },
  NZ: {
    name_en: 'New Zealand',
    name_ko: '뉴질랜드',
  },
  NI: {
    name_en: 'Nicaragua',
    name_ko: '니카라과',
  },
  NE: {
    name_en: 'Niger',
    name_ko: '니제르',
  },
  NG: {
    name_en: 'Nigeria',
    name_ko: '나이지리아',
  },
  NO: {
    name_en: 'Norway',
    name_ko: '노르웨이',
  },
  OM: {
    name_en: 'Oman',
    name_ko: '오만',
  },
  PK: {
    name_en: 'Pakistan',
    name_ko: '파키스탄',
  },
  PW: {
    name_en: 'Palau',
    name_ko: '팔라우',
  },
  PA: {
    name_en: 'Panama',
    name_ko: '파나마',
  },
  PG: {
    name_en: 'Papua New Guinea',
    name_ko: '파푸아뉴기니',
  },
  PY: {
    name_en: 'Paraguay',
    name_ko: '파라과이',
  },
  PE: {
    name_en: 'Peru',
    name_ko: '페루',
  },
  PH: {
    name_en: 'Philippines',
    name_ko: '필리핀',
  },
  PL: {
    name_en: 'Poland',
    name_ko: '폴란드',
  },
  PT: {
    name_en: 'Portugal',
    name_ko: '포르투갈',
  },
  QA: {
    name_en: 'Qatar',
    name_ko: '카타르',
  },
  RO: {
    name_en: 'Romania',
    name_ko: '루마니아',
  },
  RU: {
    name_en: 'Russian Federation',
    name_ko: '러시아',
  },
  RW: {
    name_en: 'Rwanda',
    name_ko: '르완다',
  },
  KN: {
    name_en: 'Saint Kitts and Nevis',
    name_ko: '세인트키츠 네비스',
  },
  LC: {
    name_en: 'Saint Lucia',
    name_ko: '세인트루시아',
  },
  VC: {
    name_en: 'Saint Vincent and the Grenadines',
    name_ko: '세인트빈센트 그레나딘',
  },
  WS: {
    name_en: 'Samoa',
    name_ko: '사모아',
  },
  SM: {
    name_en: 'San Marino',
    name_ko: '산마리노',
  },
  ST: {
    name_en: 'Sao Tome and Principe',
    name_ko: '상투메 프린시페',
  },
  SA: {
    name_en: 'Saudi Arabia',
    name_ko: '사우디아라비아',
  },
  SN: {
    name_en: 'Senegal',
    name_ko: '세네갈',
  },
  RS: {
    name_en: 'Serbia',
    name_ko: '세르비아',
  },
  SC: {
    name_en: 'Seychelles',
    name_ko: '세이셸',
  },
  SL: {
    name_en: 'Sierra Leone',
    name_ko: '시에라리온',
  },
  SG: {
    name_en: 'Singapore',
    name_ko: '싱가포르',
  },
  SK: {
    name_en: 'Slovakia',
    name_ko: '슬로바키아',
  },
  SI: {
    name_en: 'Slovenia',
    name_ko: '슬로베니아',
  },
  SB: {
    name_en: 'Solomon Islands',
    name_ko: '솔로몬 제도',
  },
  SO: {
    name_en: 'Somalia',
    name_ko: '소말리아',
  },
  ZA: {
    name_en: 'South Africa',
    name_ko: '남아프리카공화국',
  },
  ES: {
    name_en: 'Spain',
    name_ko: '스페인',
  },
  LK: {
    name_en: 'Sri Lanka',
    name_ko: '스리랑카',
  },
  SD: {
    name_en: 'Sudan',
    name_ko: '수단',
  },
  SR: {
    name_en: 'Suriname',
    name_ko: '수리남',
  },
  SZ: {
    name_en: 'Swaziland',
    name_ko: '에스와티니',
  },
  SE: {
    name_en: 'Sweden',
    name_ko: '스웨덴',
  },
  CH: {
    name_en: 'Switzerland',
    name_ko: '스위스',
  },
  SY: {
    name_en: 'Syrian Arab Republic',
    name_ko: '시리아',
  },
  TW: {
    name_en: 'Taiwan, Province of China',
    name_ko: '대만',
  },
  TJ: {
    name_en: 'Tajikistan',
    name_ko: '타지키스탄',
  },
  TZ: {
    name_en: 'Tanzania, United Republic of',
    name_ko: '탄자니아',
  },
  TH: {
    name_en: 'Thailand',
    name_ko: '태국',
  },
  TL: {
    name_en: 'Timor-Leste',
    name_ko: '동티모르',
  },
  TG: {
    name_en: 'Togo',
    name_ko: '토고',
  },
  TO: {
    name_en: 'Tonga',
    name_ko: '통가',
  },
  TT: {
    name_en: 'Trinidad and Tobago',
    name_ko: '트리니다드 토바고',
  },
  TN: {
    name_en: 'Tunisia',
    name_ko: '튀니지',
  },
  TR: {
    name_en: 'Turkey',
    name_ko: '튀르키예',
  },
  TM: {
    name_en: 'Turkmenistan',
    name_ko: '투르크메니스탄',
  },
  UG: {
    name_en: 'Uganda',
    name_ko: '우간다',
  },
  UA: {
    name_en: 'Ukraine',
    name_ko: '우크라이나',
  },
  AE: {
    name_en: 'United Arab Emirates',
    name_ko: '아랍에미리트',
  },
  GB: {
    name_en: 'United Kingdom',
    name_ko: '영국',
  },
  US: {
    name_en: 'United States',
    name_ko: '미국',
  },
  UY: {
    name_en: 'Uruguay',
    name_ko: '우루과이',
  },
  UZ: {
    name_en: 'Uzbekistan',
    name_ko: '우즈베키스탄',
  },
  VU: {
    name_en: 'Vanuatu',
    name_ko: '바누아투',
  },
  VE: {
    name_en: 'Venezuela',
    name_ko: '베네수엘라',
  },
  VN: {
    name_en: 'Viet Nam',
    name_ko: '베트남',
  },
  YE: {
    name_en: 'Yemen',
    name_ko: '예멘',
  },
  ZM: {
    name_en: 'Zambia',
    name_ko: '잠비아',
  },
  ZW: {
    name_en: 'Zimbabwe',
    name_ko: '짐바브웨',
  },
};
