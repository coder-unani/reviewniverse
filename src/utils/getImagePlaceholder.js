import { getPlaiceholder } from 'plaiceholder';

export const getImagePlaceholder = async (src) => {
  try {
    const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));
    const { base64 } = await getPlaiceholder(buffer, { size: 10 });

    return base64; // base64 문자열을 반환
  } catch (e) {
    console.log(e);
    return null; // 오류 발생 시 null 반환
  }
};
