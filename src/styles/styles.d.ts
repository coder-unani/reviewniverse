// 타입스크립트는 .scss 파일을 모듈로 인식하지 못하기 때문에, 이를 해결하기 위해 .d.ts 파일을 생성
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
