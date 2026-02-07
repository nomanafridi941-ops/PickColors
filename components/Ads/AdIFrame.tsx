import React from 'react';

interface AdIFrameProps {
  adKey: string;
  width: number;
  height: number;
  id?: string;
}

const AdIFrame: React.FC<AdIFrameProps> = ({ adKey, width, height, id }) => {
  const src = `https://www.highperformanceformat.com/${adKey}/index.html?width=${width}&height=${height}`;

  return (
    <div
      id={id}
      style={{
        width,
        height,
        minWidth: width,
        minHeight: height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <iframe
        src={src}
        width={width}
        height={height}
        frameBorder="0"
        scrolling="no"
        style={{ border: 'none', overflow: 'hidden' }}
        allow="autoplay"
        title={`ad-${adKey}-${width}x${height}`}
      />
    </div>
  );
};

export default AdIFrame;
