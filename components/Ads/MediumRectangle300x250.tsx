import React from 'react';
import AdInvoke from './AdInvoke';

const MediumRectangle300x250: React.FC = () => {
  return (
    <div className="w-full flex justify-center my-6">
      <AdInvoke adKey="83cc7e3f9320cbd2e799761a28a6b41f" width={300} height={250} id="ad-medium-300x250" />
    </div>
  );
};

export default MediumRectangle300x250;
