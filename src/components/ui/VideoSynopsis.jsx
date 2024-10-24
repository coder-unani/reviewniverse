'use client';

import React, { useEffect, useState, useRef } from 'react';
import { isEmpty } from 'lodash';

import styles from '@/styles/pages/Contents.module.scss';

const VideoSynopsis = React.memo(({ synopsis, tags, title }) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const synopsisRef = useRef(null);

  // 작품 소개가 5줄 이상일 경우 더보기 버튼 표시
  useEffect(() => {
    if (!synopsisRef.current) return;
    const lineHeight = parseFloat(getComputedStyle(synopsisRef.current).lineHeight);
    const height = synopsisRef.current.scrollHeight;
    const maxLines = 5;
    const maxHeight = lineHeight * maxLines;

    setIsOverflowing(height > maxHeight);
  }, [synopsis]);

  // 더보기 버튼 클릭 시 펼치기/접기
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  if (isEmpty(synopsis)) return null;

  return (
    <section className={styles.detail__synopsis__section}>
      <h4 className={styles.detail__main__title}>{title}</h4>

      {/* 태그 */}
      {!isEmpty(tags) && (
        <div className={styles.detail__tags__wrapper}>
          {tags.map((tag) => (
            <span className={styles.detail__tag} key={tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      <summary className={`${styles.detail__synopsis} ${isExpanded ? styles.expanded : ''}`} ref={synopsisRef}>
        {synopsis}
      </summary>

      {isOverflowing && !isExpanded && (
        <button type="button" onClick={toggleExpand} className={styles.synopsis__more__button}>
          {/* {isExpanded ? "접기" : "더보기"} */}
          더보기
        </button>
      )}
    </section>
  );
});

export default VideoSynopsis;
