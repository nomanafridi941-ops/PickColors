import React, { useState, useEffect } from 'react';
import AdInvoke from './AdInvoke';

const STORAGE_KEY = 'hide_ad_inline_smallleader_v1';

const InlineSmallLeader: React.FC = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === '1') setHidden(true);
  }, []);

  if (hidden) return null;

  return (
    <div className="w-full flex justify-center my-10">
      <AdInvoke adKey="7e26c74abd87dbe6c4d3e7a98c7f424a" width={468} height={60} id="ad-inline-468x60" />
    </div>
  );
};

export default InlineSmallLeader;
