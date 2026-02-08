import React, { useEffect, useState } from 'react';
import AdInvoke from './AdInvoke';

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
      <div className="w-[320px] h-[50px] bg-transparent rounded-xl flex items-center justify-between px-0 shadow-2xl">
        <AdInvoke adKey="3b33f336e34fc72e038c573aa948e0b7" width={320} height={50} id="ad-mobile-320x50" />
        <button
          aria-label="Close mobile ad"
          onClick={() => { localStorage.setItem(STORAGE_KEY, '1'); setHidden(true); }}
          className="absolute top-[-6px] right-[-6px] w-6 h-6 bg-white rounded-full shadow text-xs flex items-center justify-center"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default MobileSticky;
