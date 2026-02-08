import React from 'react';
import MediumRectangle300x250 from './MediumRectangle300x250';
import { useLocation } from 'react-router-dom';

const RightRail: React.FC = () => {
  const location = useLocation();
  // only show on tool pages
  if (!location.pathname.startsWith('/tools')) return null;

  return (
    <div className="hidden lg:block fixed right-6 top-[140px] z-40">
      <div className="w-[300px]">
        <MediumRectangle300x250 />
      </div>
    </div>
  );
};

export default RightRail;
