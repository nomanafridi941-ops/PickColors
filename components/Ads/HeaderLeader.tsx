import React, { useEffect, useState, useRef } from 'react';
import AdInvoke from './AdInvoke';

const HeaderLeader: React.FC = () => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Delay to avoid blocking initial paint
    const t = setTimeout(() => setShow(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={ref} className="w-full flex justify-center py-4 bg-transparent">
      {show && (
        <>
          {/* Desktop: 728x90 */}
          <div className="hidden lg:flex">
            <AdInvoke adKey="f4583a41ba86b5c6c7515106fb78a5bb" width={728} height={90} id="ad-header-728x90" />
          </div>

          {/* Tablet / small desktop: 468x60 */}
          <div className="hidden md:flex lg:hidden">
            <AdInvoke adKey="7e26c74a9f4b2d5c1234567890abcdef" width={468} height={60} id="ad-header-468x60" />
          </div>

          {/* Mobile: header ad hidden (MobileSticky handles mobile ad) */}
        </>
      )}
    </div>
  );
};

export default HeaderLeader;
