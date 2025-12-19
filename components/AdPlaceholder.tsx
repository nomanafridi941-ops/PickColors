
import React, { useMemo } from 'react';

interface AdPlaceholderProps {
  type?: 'horizontal' | 'square' | 'sidebar';
  className?: string;
}

const AD_CONFIG = {
  horizontal: {
    key: 'f4583a41ba86b5c6c7515106fb78a5bb',
    height: 90,
    width: 728,
  },
  square: {
    key: '83cc7e3f9320cbd2e799761a28a6b41f',
    height: 250,
    width: 300,
  },
  sidebar: {
    key: 'f1249ff2c2437f2386bd35ecf0cee435',
    height: 600,
    width: 160,
  },
};

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type = 'horizontal', className = '' }) => {
  const config = AD_CONFIG[type];
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  // We use useMemo to generate the iframe source once to prevent flickering on re-renders
  const iframeSrcDoc = useMemo(() => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { 
              margin: 0; 
              padding: 0; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              overflow: hidden;
              background: transparent;
            }
          </style>
        </head>
        <body>
          <script type="text/javascript">
            atOptions = {
              'key' : '${config.key}',
              'format' : 'iframe',
              'height' : ${config.height},
              'width' : ${config.width},
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="https://www.highperformanceformat.com/${config.key}/invoke.js"></script>
        </body>
      </html>
    `;
  }, [config.key, config.height, config.width]);

  const containerStyles = {
    horizontal: "w-full min-h-[95px]",
    square: "w-full min-h-[260px]",
    sidebar: "w-full min-h-[610px]"
  };

  return (
    <div className={`flex flex-col items-center justify-center bg-slate-50/30 dark:bg-slate-900/10 rounded-2xl overflow-hidden transition-all border border-slate-100 dark:border-slate-800/50 ${containerStyles[type]} ${className} relative group`}>
      {/* Label */}
      <div className="absolute top-1 left-0 right-0 text-center z-0 pointer-events-none">
        <span className="text-[7px] font-black uppercase tracking-[0.5em] text-slate-300 dark:text-slate-700">
          Advertisement {isLocal && "• Local Preview Restricted"}
        </span>
      </div>
      
      {/* Isolated Ad Frame */}
      <iframe
        title={`ad-${type}`}
        srcDoc={iframeSrcDoc}
        width={config.width}
        height={config.height}
        frameBorder="0"
        scrolling="no"
        className="z-10 bg-transparent max-w-full"
        style={{ colorScheme: 'light' }}
      />

      {/* Subtle styling for empty space */}
      <div className="absolute inset-0 border border-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"></div>
    </div>
  );
};

export default AdPlaceholder;
