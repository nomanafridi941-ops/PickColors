import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  adKey: string;
  width: number;
  height: number;
}

const AdBanner: React.FC<AdBannerProps> = ({ adKey, width, height }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;
    
    // Clear any existing content
    adRef.current.innerHTML = '';

    // Create atOptions script
    const optionsScript = document.createElement('script');
    optionsScript.innerHTML = `
      atOptions = {
        'key' : '${adKey}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;
    adRef.current.appendChild(optionsScript);

    // Create invoke script
    const invokeScript = document.createElement('script');
    invokeScript.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    invokeScript.async = true;
    adRef.current.appendChild(invokeScript);

    return () => {
      // Cleanup on unmount
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, [adKey, width, height]);

  return (
    <div 
      ref={adRef} 
      style={{ 
        width, 
        height, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    />
  );
};

export default AdBanner;
