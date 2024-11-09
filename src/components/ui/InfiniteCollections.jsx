'use client';

import React, { useRef, useCallback } from 'react';
import { isEmpty } from 'lodash';

import CollectionForList from '@/components/ui/CollectionForList';

import styles from '@/styles/pages/Collections.module.scss';

const InfiniteCollections = ({ collections, pageSize, handlePage }) => {
  const hasMore = collections.count === pageSize;
  const observer = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (!hasMore) {
        if (observer.current) observer.current.disconnect(); // 관찰 중지
        return;
      }

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handlePage(collections.page + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, collections, handlePage]
  );

  if (isEmpty(collections.data)) return null;

  return (
    <>
      {collections.data.map((collection) => (
        <li className={styles.collection__item} key={collection.id}>
          <CollectionForList collection={collection} />
        </li>
      ))}
      {hasMore && <article ref={lastItemRef} />}
    </>
  );
};

export default InfiniteCollections;
