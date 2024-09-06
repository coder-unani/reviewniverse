import React from 'react';
import SwiperCast from '@/components/ui/SwiperCast';
import { useVideoDetailContext } from '@/contexts/VideoDetailContext';
import { fStaffCode } from '@/utils/formatContent';
import { isEmpty } from 'lodash';

const VideoSectionStaff = React.memo(() => {
  const { content } = useVideoDetailContext();
  const staffs = content.data.staff;

  const renderStaff = () => (
    <section className="detail-cast-section">
      <h4 className="detail-main-title">제작진</h4>
      <SwiperCast items={staffs} target={'staff'} formatCode={fStaffCode} />
    </section>
  );

  return isEmpty(staffs) ? null : renderStaff();
});

export default VideoSectionStaff;
