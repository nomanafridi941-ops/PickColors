import React from 'react';
import AdIFrame from './AdIFrame';

const ToolsAdRow: React.FC = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 my-6">
      <div className="flex-1 flex justify-center">
        <AdIFrame adKey="f4583a41ba86b5c6c7515106fb78a5bb" width={468} height={60} id="ad-tools-468x60" />
      </div>
      <div className="flex-1 flex justify-center">
        <AdIFrame adKey="f4583a41ba86b5c6c7515106fb78a5bb" width={320} height={50} id="ad-tools-320x50" />
      </div>
    </div>
  );
};

export default ToolsAdRow;
