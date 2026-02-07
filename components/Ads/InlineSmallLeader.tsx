import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'hide_ad_inline_smallleader_v1';

const InlineSmallLeader: React.FC = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === '1') setHidden(true);
  }, []);

  if (hidden) return null;

  return (
    <div className="w-full flex justify-center my-10">
      <div className="w-[468px] h-[60px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm font-black">468 x 60</div>
          <div className="text-xs text-slate-500">Inline small leader placeholder</div>
        </div>
      </div>
    </div>
  );
};

export default InlineSmallLeader;
