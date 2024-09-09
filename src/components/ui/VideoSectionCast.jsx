import React from 'react';
import CastsVertical from '@/components/ui/CastsVertical';
import { fActorCode, fStaffCode } from '@/utils/formatContent';
import { isEmpty } from 'lodash';
import styles from '@/styles/pages/Contents.module.scss';

const VideoSectionCast = ({ content, target }) => {
  const cast = target === 'actor' ? content.data.actor || [] : content.data.staff || [];
  if (isEmpty(cast)) {
    return null;
  }
  const castTitle = target === 'actor' ? '출연진' : '제작진';
  const castformatCode = target === 'actor' ? fActorCode : fStaffCode;

  return (
    <section className={styles.detail__cast__section}>
      <h4 className={styles.detail__main__title}>{castTitle}</h4>
      <CastsVertical items={cast} target={target} formatCode={castformatCode} />
    </section>
  );
};

export default VideoSectionCast;
