import { fetchVideoDetail } from '@/library/api/videos';
import { notFound } from 'next/navigation';
import { fParseInt } from '@/utils/format';

export default async function ContentPage({ params }) {
  const { id } = params;
  const videoId = fParseInt(id);

  // 서버에서 비동기 함수로 데이터를 가져옴
  const content = await fetchVideoDetail({ videoId });
  console.log(content);

  if (!content) {
    // notFound();
  }

  return <div>{id}</div>;
}
