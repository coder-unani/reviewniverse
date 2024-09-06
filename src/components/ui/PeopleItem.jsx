import React from 'react';
import Link from 'next/link';
import PeopleImage from '@/components/ui/Button/People/Image';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';

const PeopleItem = ({ crew, target, formatCode }) => {
  const path = EndpointManager.generateUrl(ENDPOINTS.PEOPLE, {
    peopleId: crew.id,
  });

  return (
    <Link
      href={path}
      state={{ people: crew, target }}
      className="detail-people-link"
      key={crew.id}
    >
      <PeopleImage image={crew.picture} size={60} />
      <div className="detail-people-info-wrapper">
        <p className="detail-people-name">{crew.name}</p>
        <div className="detail-people-role-wrapper">
          <span className="detail-people-role">{formatCode(crew.code)}</span>
          {crew.role && (
            <>
              <span className="detail-people-role">|</span>
              <span className="detail-people-role">{crew.role}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PeopleItem;
