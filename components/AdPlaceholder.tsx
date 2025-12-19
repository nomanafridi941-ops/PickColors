
import React, { useEffect, useRef } from 'react';

interface AdPlaceholderProps {
  type?: 'horizontal' | 'square' | 'sidebar';
  className?: string;
}

// Map the user provided ad keys and dimensions to the component types
const AD_CONFIG = {
  horizontal: {
    key: 'f4583a41ba86b5c6c7515106fb78a5bb',
    format: 'iframe',
    height: 90,
    width: 728,
  },
  square: {
    key: '83cc7e3f9320cbd2e799761a28a6b41f',
    format: 'iframe',
    height: 250,
    width: 300,
  },
  sidebar: {
    key: 'f1249ff2c2437f2386bd35ecf0cee435',
    format: 'iframe',
    height: 600,
    width: 160,
  },
};

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type = 'horizontal', className = '' }) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const config = AD_CONFIG[type];

  useEffect(() => {
    if (adContainerRef.current) {
      // Clear container before injecting
      adContainerRef.current.innerHTML = '';

      // Create the configuration script
      const configScript = document.createElement('script');
      configScript.type = 'text/javascript';
      configScript.innerHTML = `
        atOptions = {
          'key' : '${config.key}',
          'format' : '${config.format}',
          'height' : ${config.height},
          'width' : ${config.width},
          'params' : {}
        };
      `;

      // Create the invoke script
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = `https://www.highperformanceformat.com/${config.key}/invoke.js`;

      // Append scripts to the ref container
      adContainerRef.current.appendChild(configScript);
      adContainerRef.current.appendChild(invokeScript);
    }

    // Cleanup function to clear the ad when component unmounts
    return () => {
      if (adContainerRef.current) {
        adContainerRef.current.innerHTML = '';
      }
    };
  }, [type, config.key, config.format, config.height, config.width]);

  const baseStyles = "flex flex-col items-center justify-center overflow-hidden transition-all bg-slate-50/50 dark:bg-slate-900/20 rounded-xl";
  
  // Ensure the container respects the intended ad height to prevent Layout Shift
  const layoutStyles = {
    horizontal: "w-full min-h-[90px] py-2",
    square: "w-full min-h-[250px] py-4",
    sidebar: "w-full min-h-[600px] py-4"
  };

  return (
    <div className={`${baseStyles} ${layoutStyles[type]} ${className} relative group`}>
      <div className="absolute top-1 left-1/2 -translate-x-1/2 z-0">
        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-300 dark:text-slate-700 pointer-events-none">
          Advertisement
        </span>
      </div>
      
      {/* The Ad Injection Point */}
      <div 
        ref={adContainerRef} 
        className="z-10 w-full flex justify-center" 
        style={{ minHeight: `${config.height}px` }}
      />
    </div>
  );
};

export default AdPlaceholder;
