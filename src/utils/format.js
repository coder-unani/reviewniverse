import { isEmpty } from 'lodash';

// 숫자인지 확인
export const fParseInt = (value) => {
  const value2Int = Number(value);
  return Number.isNaN(value2Int) ? 0 : value2Int;
};

// 숫자 포맷: 1000단위 콤마 추가
export const fNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 날짜 포맷: 어떤 날짜 형식이 들어와도 년도만 반환
export const fYear = (date) => {
  // date null 일 경우
  if (!date) return '';
  return date.split('-')[0];
};

// 날짜 포맷: YYYY-MM-DD를 YYYY.MM.DD로 변경
export const fDate = (date) => {
  return date.replace(/-/g, '.');
};

// 날짜 포맷: YYYY-MM-DD를 YYYY년 MM월 DD일로 변경
export const fDateToKorean = (date) => {
  return date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1년 $2월 $3일');
};

// 날짜 포맷: {}개월 전, {}일 전, {}시간 전, {}분 전, 방금 전으로 변경, 하루 이상이면 날짜로 변경
export const fDiffDate = (date) => {
  const now = new Date();
  const target = new Date(date);
  const diff = now - target;
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);
  const month = Math.floor(day / 30);
  const year = Math.floor(month / 12);

  if (year >= 1) {
    const targetYear = target.getFullYear();
    const targetMonth = String(target.getMonth() + 1).padStart(2, '0');
    const targetDate = String(target.getDate()).padStart(2, '0');
    return `${targetYear}.${targetMonth}.${targetDate}`;
  }
  if (month >= 1) {
    return `${month}개월 전`;
  }
  if (day >= 1) {
    return `${day}일 전`;
  }
  if (hour > 0) {
    return `${hour}시간 전`;
  }
  if (min > 0) {
    return `${min}분 전`;
  }
  return '방금 전';
};

// 문자 포맷: 대문자로 변경
export const fUpperCase = (text) => {
  return text.toUpperCase();
};

// 문자 포맷: 주어진 자릿수만큼 문자열 자르기
export const fTruncateText = (text, length) => {
  return text.length > length ? `${text.slice(0, length)}...` : text;
};

// 배열의 랜덤 요소 가져오기
export const fArrayRandomValue = (array) => {
  if (isEmpty(array)) return false;
  const randomNum = Math.floor(Math.random() * array.length);
  return array[randomNum];
};

// TODO: 파일 사이즈 포맷(고도화필요)
export const fFileSize = (size) => {
  // MB를 바이트로 변경
  return size * 1024 * 1024;
};

// 배열 포맷: ,로 구분된 문자열을 배열로 변경
export const fStringToArray = (string = '') => {
  if (isEmpty(string)) return []; // null, undefined, 빈 문자열, 공백만 있는 문자열 처리
  return string.replace(/\s+/g, '').split(','); // 공백 제거 후 쉼표로 분리
};
