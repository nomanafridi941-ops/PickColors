import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'hide_ad_sidebar_skyscraper_v1';

const SidebarSkyscraper: React.FC = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === '1') setHidden(true);
  }, []);

  if (hidden) return null;

  return (
    <aside className="hidden lg:flex fixed right-6 top-28 z-40 w-[160px] h-[600px] items-center justify-center">
      <div className="w-[160px] h-[600px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center text-center p-3">
        <div>
          <div className="text-sm font-bold mb-2">160 x 600</div>
          <div className="text-xs text-slate-500">Sidebar Skyscraper placeholder</div>
          <button
            onClick={() => { localStorage.setItem(STORAGE_KEY, '1'); setHidden(true); }}
            className="mt-4 text-[11px] text-slate-600"
          >
            Close
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SidebarSkyscraper;
