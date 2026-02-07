import React from 'react';

const HeroBillboard: React.FC = () => {
  return (
    <div className="w-full flex justify-center py-6 lg:py-10">
      <div className="max-w-[1300px] w-full flex items-center justify-center">
        <div className="w-full h-[250px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-sm font-black mb-2">1300 x 250</div>
            <div className="text-xs text-slate-500">Home hero billboard placeholder (fallbacks to 728x90 on narrower screens)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBillboard;
