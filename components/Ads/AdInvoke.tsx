import React, { useEffect, useRef, useState } from 'react';

interface AdInvokeProps {
  adKey: string;
  width: number;
  height: number;
  id?: string;
}

declare global {
  interface Window { __ad_injected_ids?: Record<string, boolean>; atOptions?: any }
}

const AdInvoke: React.FC<AdInvokeProps> = ({ adKey, width, height, id }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setInView(true);
      });
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !containerRef.current) return;
    // determine effective ad size based on current viewport
    const viewport = window.innerWidth || 1024;
    let effWidth = width;
    let effHeight = height;
    if (viewport < 640) {
      // mobile: prefer 320x50 when possible
      effWidth = Math.min(width, 320);
      effHeight = effWidth === 320 ? 50 : height;
    } else if (viewport < 1024) {
      // tablet: prefer 468x60
      effWidth = Math.min(width, 468);
      effHeight = effWidth === 468 ? 60 : height;
    }

    const slotId = id || `ad-invoke-${adKey}-${effWidth}x${effHeight}`;
    if (!window.__ad_injected_ids) window.__ad_injected_ids = {};
    if (window.__ad_injected_ids[slotId]) return;

    // Build atOptions inline script with effective size
    const opts = `atOptions = {\n  'key' : '${adKey}',\n  'format' : 'iframe',\n  'height' : ${effHeight},\n  'width' : ${effWidth},\n  'params' : {}\n};`;

    const inline = document.createElement('script');
    inline.type = 'text/javascript';
    inline.text = opts;

    const loader = document.createElement('script');
    loader.type = 'text/javascript';
    loader.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    loader.async = true;

    // Set container to the exact effective ad pixel size to avoid provider scaling
    containerRef.current.style.width = effWidth + 'px';
    containerRef.current.style.height = effHeight + 'px';
    containerRef.current.style.minHeight = effHeight + 'px';

    // Append scripts into the container so provider can write into nearby DOM
    containerRef.current.appendChild(inline);
    containerRef.current.appendChild(loader);

    window.__ad_injected_ids[slotId] = true;

    return () => {
      // cleanup: remove injected scripts if still present
      try {
        if (containerRef.current) {
          if (containerRef.current.contains(inline)) containerRef.current.removeChild(inline);
          if (containerRef.current.contains(loader)) containerRef.current.removeChild(loader);
        }
      } catch (e) {
        // ignore
      }
    };
  }, [inView, adKey, width, height, id]);

  return (
    <div id={id} ref={containerRef} style={{ width: '100%', maxWidth: width, height, minHeight: height, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }} />
  );
};

export default AdInvoke;
