import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonVideoDetail = () => {
  const [castCount, setCastCount] = useState(4);
  const [galleryCount, setGalleryCount] = useState(3);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    const width = window.innerWidth;

    if (width < 769) {
      setCastCount(2);
      setGalleryCount(2);
    } else if (width < 1024) {
      setCastCount(2);
      setGalleryCount(3);
    } else if (width < 1281) {
      setCastCount(3);
      setGalleryCount(3);
    } else {
      setCastCount(4);
      setGalleryCount(3);
    }
  };

  return (
    <SkeletonTheme baseColor="#12222b" highlightColor="#263d4b">
      <main className="detail-main-container">
        <section className="detail-main-section">
          <div className="detail-main-info-container">
            <div className="detail-main-info-wrapper">
              <article className="skeleton-detail-title-container">
                <article className="detail-title-wrapper">
                  <Skeleton className="skeleton-detail-title-og" />
                  <Skeleton className="skeleton-detail-title-kr" />
                </article>
                <div className="detail-genre-wrapper">
                  {new Array(4).fill(0).map((_, index) => (
                    <Skeleton className="skeleton-detail-genre-link" key={index} />
                  ))}
                </div>
              </article>
            </div>
          </div>

          <div className="detail-sub-info-container">
            <div className="detail-sub-info-wrapper">
              {new Array(6).fill(0).map((_, index) => (
                <Skeleton className="skeleton-detail-sub-info-item" key={index} />
              ))}
            </div>
          </div>
        </section>

        <div className="detail-main-wrapper">
          <section className="detail-sub-section">
            <section className="detail-poster-section">
              <div className="skeleton-detail-poster-wrapper">
                <Skeleton className="skeleton-detail-poster" />
              </div>
            </section>

            <section className="detail-synopsis-section">
              <Skeleton className="skeleton-detail-main-title" />
              <div className="skeleton-detail-synopsis-wrapper">
                {new Array(3).fill(0).map((_, index) => (
                  <Skeleton className="skeleton-detail-synopsis" key={index} />
                ))}
              </div>
            </section>

            <div className="detail-more-wrapper">
              <section className="detail-my-rating-section">
                <Skeleton className="skeleton-detail-main-title" />
                <Skeleton className="skeleton-rating-video" />
              </section>

              <section className="detail-platform-section">
                <Skeleton className="skeleton-detail-main-title" />
                <div className="detail-platform-wrapper">
                  {new Array(3).fill(0).map((_, index) => (
                    <Skeleton className="skeleton-detail-platform" key={index} />
                  ))}
                </div>
              </section>
            </div>
          </section>

          <section className="skeleton-detail-cast-section">
            <Skeleton className="skeleton-detail-main-title" />
            <article className="detail-cast-wrapper">
              <div className="skeleton-detail-cast">
                {new Array(castCount).fill(0).map((_, index) => (
                  <div className="skeleton-detail-people-link" key={index}>
                    <div className="people-image-wrapper">
                      <Skeleton className="skeleton-people-image" />
                    </div>
                    <div className="skeleton-detail-people-info-wrapper">
                      <Skeleton className="skeleton-detail-people-name" />
                      <Skeleton className="skeleton-detail-people-role" />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="skeleton-detail-cast-section">
            <Skeleton className="skeleton-detail-main-title" />
            <article className="detail-cast-wrapper">
              <div className="skeleton-detail-cast">
                {new Array(castCount).fill(0).map((_, index) => (
                  <div className="skeleton-detail-people-link" key={index}>
                    <div className="people-image-wrapper">
                      <Skeleton className="skeleton-people-image" />
                    </div>
                    <div className="skeleton-detail-people-info-wrapper">
                      <Skeleton className="skeleton-detail-people-name" />
                      <Skeleton className="skeleton-detail-people-role" />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="skeleton-detail-gallery-section">
            <Skeleton className="skeleton-detail-main-title" />
            <article className="skeleton-detail-gallery-wrapper">
              {new Array(galleryCount).fill(0).map((_, index) => (
                <div className="skeleton-detail-gallery-item" key={index}>
                  <Skeleton className="skeleton-detail-photo" />
                </div>
              ))}
            </article>
          </section>
        </div>
      </main>
    </SkeletonTheme>
  );
};

export default SkeletonVideoDetail;
