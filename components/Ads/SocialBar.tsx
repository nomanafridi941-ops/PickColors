import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'hide_ad_socialbar_v1';

const SocialBar: React.FC = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === '1') setHidden(true);
  }, []);

  if (hidden) return null;

  return (
    <div className="hidden lg:flex fixed left-4 top-1/4 z-50 flex-col gap-3 items-center">
      <div className="w-10 h-10 bg-white/90 dark:bg-slate-800/90 rounded-xl flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-800 text-sm font-bold">
        SB
      </div>
      <div className="w-10 h-10 bg-white/90 dark:bg-slate-800/90 rounded-xl flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-800 text-sm font-bold">
        F
      </div>
      <button
        aria-label="Close social bar"
        onClick={() => { localStorage.setItem(STORAGE_KEY, '1'); setHidden(true); }}
        className="mt-2 text-xs text-slate-500"
      >
        close
      </button>
    </div>
  );
};

export default SocialBar;
