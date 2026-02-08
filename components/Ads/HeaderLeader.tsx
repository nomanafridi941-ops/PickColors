import React, { useEffect, useState, useRef } from 'react';
import AdIFrame from './AdIFrame';

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
      {show && <AdIFrame adKey="f4583a41ba86b5c6c7515106fb78a5bb" width={728} height={90} id="ad-header-728x90" />}
    </div>
  );
};

export default HeaderLeader;
