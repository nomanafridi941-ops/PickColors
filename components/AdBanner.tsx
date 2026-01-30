import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  adKey: string;
  width: number;
  height: number;
  id?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ adKey, width, height, id }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || loadedRef.current) return;
    loadedRef.current = true;

    // Create a unique container ID
    const containerId = id || `ad-container-${Date.now()}`;
    
    // Create the ad container div
    const adContainer = document.createElement('div');
    adContainer.id = containerId;
    containerRef.current.appendChild(adContainer);

    // Set atOptions globally before loading script
    (window as any).atOptions = {
      'key': adKey,
      'format': 'iframe',
      'height': height,
      'width': width,
      'params': {}
    };

    // Load the invoke script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
    script.async = true;
    containerRef.current.appendChild(script);

    return () => {
      loadedRef.current = false;
    };
  }, [adKey, width, height, id]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        width, 
        height, 
        minWidth: width,
        minHeight: height,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}
    />
  );
};

export default AdBanner;
