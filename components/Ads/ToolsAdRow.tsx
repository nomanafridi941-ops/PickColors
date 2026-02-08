import React from 'react';
import AdInvoke from './AdInvoke';

const ToolsAdRow: React.FC = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 my-6">
      <div className="flex-1 flex justify-center">
        <AdInvoke adKey="7e26c74abd87dbe6c4d3e7a98c7f424a" width={468} height={60} id="ad-tools-468x60" />
      </div>
      <div className="flex-1 flex justify-center">
        <AdInvoke adKey="3b33f336e34fc72e038c573aa948e0b7" width={320} height={50} id="ad-tools-320x50" />
      </div>
    </div>
  );
};

export default ToolsAdRow;
