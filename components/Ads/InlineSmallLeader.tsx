import React, { useState, useEffect } from 'react';
import AdIFrame from './AdIFrame';

const STORAGE_KEY = 'hide_ad_inline_smallleader_v1';

const InlineSmallLeader: React.FC = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === '1') setHidden(true);
  }, []);

  if (hidden) return null;

  return (
    <div className="w-full flex justify-center my-10">
      <AdIFrame adKey="f4583a41ba86b5c6c7515106fb78a5bb" width={468} height={60} id="ad-inline-468x60" />
    </div>
  );
};

export default InlineSmallLeader;
