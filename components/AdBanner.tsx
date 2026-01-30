import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  adKey: string;
  width: number;
  height: number;
  id?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ adKey, width, height, id }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const uniqueId = id || `ad-${adKey}-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    if (!adRef.current) return;
    
    // Clear any existing content
    adRef.current.innerHTML = '';

    // Set unique atOptions on window with unique key
    const optionsKey = `atOptions_${uniqueId.replace(/-/g, '_')}`;
    (window as any)[optionsKey] = {
      'key': adKey,
      'format': 'iframe',
      'height': height,
      'width': width,
      'params': {}
    };

    // Create options script that references the unique options
    const optionsScript = document.createElement('script');
    optionsScript.innerHTML = `atOptions = window['${optionsKey}'];`;
    adRef.current.appendChild(optionsScript);

    // Create invoke script
    const invokeScript = document.createElement('script');
    invokeScript.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    invokeScript.async = true;
    adRef.current.appendChild(invokeScript);

  }, [adKey, width, height, uniqueId]);

  return (
    <div 
      ref={adRef}
      id={uniqueId}
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
