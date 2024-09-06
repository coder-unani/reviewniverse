'use client';

import React, { useMemo, useEffect, useState, useRef } from 'react';
import { useVideoDetailContext } from '@/contexts/VideoDetailContext';
import { isEmpty } from 'lodash';

const VideoSectionSynopsis = React.memo(() => {
  const { content } = useVideoDetailContext();
  const synopsis = useMemo(
    () => content.data.synopsis,
    [content.data.synopsis]
  );
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const synopsisRef = useRef(null);

  useEffect(() => {
    if (!synopsis) {
      return;
    }
    const lineHeight = parseFloat(
      getComputedStyle(synopsisRef.current).lineHeight
    );
    const height = synopsisRef.current.scrollHeight;
    const maxLines = 5;
    const maxHeight = lineHeight * maxLines;

    if (height > maxHeight) {
      setIsOverflowing(true);
    }
  }, []);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const renderSynopsis = () => (
    <section className="detail-synopsis-section">
      <h4 className="detail-main-title">작품 소개</h4>
      <summary
        className={`detail-synopsis ${isExpanded ? 'expanded' : ''}`}
        ref={synopsisRef}
      >
        {synopsis}
      </summary>
      {isOverflowing && !isExpanded && (
        <button onClick={toggleExpand} className="synopsis-more-button">
          {/* {isExpanded ? "접기" : "더보기"} */}
          더보기
        </button>
      )}
    </section>
  );

  return isEmpty(synopsis) ? null : renderSynopsis();
});

export default VideoSectionSynopsis;
