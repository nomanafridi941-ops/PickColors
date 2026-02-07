import React from 'react';
import AdIFrame from './AdIFrame';

const MediumRectangle300x250: React.FC = () => {
  return (
    <div className="w-full flex justify-center my-6">
      <AdIFrame adKey="f4583a41ba86b5c6c7515106fb78a5bb" width={300} height={250} id="ad-medium-300x250" />
    </div>
  );
};

export default MediumRectangle300x250;
