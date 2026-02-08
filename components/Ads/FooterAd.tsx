import React, { useEffect, useState } from 'react';
import AdIFrame from './AdIFrame';

const FooterAd: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearFooter = (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 800);
      if (nearFooter) setShow(true);
    };
    window.addEventListener('scroll', onScroll);
    const t = setTimeout(onScroll, 1200);
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(t); };
  }, []);

  if (!show) return null;

  return (
    <div className="w-full flex justify-center py-6">
      <AdIFrame adKey="f4583a41ba86b5c6c7515106fb78a5bb" width={728} height={90} id="ad-footer-728x90" />
    </div>
  );
};

export default FooterAd;
