import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'hide_ad_mobile_sticky_v1';

const MobileSticky: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      setHidden(true);
      return;
    }
    const t = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(t);
  }, []);

  if (hidden) return null;
  if (!visible) return null;

  return (
    <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="w-[320px] h-[50px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between px-3 shadow-2xl">
        <div className="text-sm font-bold">320 x 50</div>
        <button
          aria-label="Close mobile ad"
          onClick={() => { localStorage.setItem(STORAGE_KEY, '1'); setHidden(true); }}
          className="text-xs text-slate-500 ml-4"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default MobileSticky;
