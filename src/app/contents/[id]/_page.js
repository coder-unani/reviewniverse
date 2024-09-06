import { fetchVideoDetail } from '@/library/api/videos';
import { notFound } from 'next/navigation';
import { fParseInt } from '@/utils/format';

async function getContent(id) {
  try {
    const videoId = fParseInt(id);
    // 비동기로 비디오 정보를 가져옴
    const res = await fetchVideoDetail({ videoId });
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function page({ params }) {
  const { id } = params;
  const content = await getContent(id);

  if (!content) {
    // notFound();
  }

  return <div>{id}</div>;
}
