
import React, { useState, useRef } from 'react';

const SAMPLES = [
  { name: 'Nature', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&auto=format&fit=crop' },
  { name: 'Architecture', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop' },
  { name: 'Abstract', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400&auto=format&fit=crop' }
];

const ImageExtractor: React.FC<{ useUrl?: boolean }> = ({ useUrl }) => {
  const [image, setImage] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const processImage = (src: string, isProxy = false) => {
    setLoading(true);
    setError(null);
    setImage(src);

    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const colors = new Set<string>();
        let attempts = 0;
        
        while (colors.size < 10 && attempts < 200) {
          const offset = Math.floor(Math.random() * (imageData.length / 4)) * 4;
          if (imageData[offset + 3] > 125) { // Alpha check
            const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
            colors.add(`#${toHex(imageData[offset])}${toHex(imageData[offset+1])}${toHex(imageData[offset+2])}`);
          }
          attempts++;
        }
        setPalette(Array.from(colors));
        setLoading(false);
      } catch (e) {
        if (!isProxy && useUrl) {
          // Try with proxy if direct fails
          processImage(`https://api.allorigins.win/raw?url=${encodeURIComponent(src)}`, true);
        } else {
          setError("Security restricted: This website blocks color extraction. Please upload the image manually.");
          setLoading(false);
        }
      }
    };

    img.onerror = () => {
      if (!isProxy && useUrl) {
        processImage(`https://api.allorigins.win/raw?url=${encodeURIComponent(src)}`, true);
      } else {
        setError("Could not load image. The link might be broken or protected.");
        setLoading(false);
      }
    };

    img.src = src;
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => processImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white text-3xl mb-6 shadow-xl shadow-indigo-600/20">
          {useUrl ? '🔗' : '📷'}
        </div>
        <h1 className="text-5xl font-black mb-4 tracking-tight">
          {useUrl ? 'Palette from Image URL' : 'Image Color Extractor'}
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          {useUrl ? "Extract visual DNA from any web image. We use a proxy to bypass most CORS restrictions." : "Professional-grade color sampling from your local design assets."}
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-16 space-y-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-indigo-500/5">
          {useUrl ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  placeholder="Paste direct image link (e.g. from Unsplash or Pinterest)..."
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  className="flex-grow p-4 bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 font-mono text-sm"
                />
                <button 
                  onClick={() => processImage(url)}
                  disabled={loading || !url}
                  className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all"
                >
                  {loading ? 'Analyzing...' : 'Extract'}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Try a sample:</span>
                <div className="flex gap-2">
                  {SAMPLES.map(s => (
                    <button 
                      key={s.name}
                      onClick={() => { setUrl(s.url); processImage(s.url); }}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold hover:bg-indigo-500 hover:text-white transition-all"
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[2rem] p-12 text-center relative group hover:border-indigo-500/50 transition-all">
              <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📁</div>
              <p className="text-slate-500 font-bold">Select Image to Extract Palette</p>
            </div>
          )}
        </div>

        {error && (
          <div className="p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/50 rounded-2xl text-rose-600 dark:text-rose-400 text-sm flex gap-3">
            <span>⚠️</span> <p>{error}</p>
          </div>
        )}
      </div>

      {(image || loading) && (
        <div className="grid lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border dark:border-slate-800 shadow-xl overflow-hidden">
            <div className="relative aspect-video bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden flex items-center justify-center">
              {loading && <div className="absolute inset-0 z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm flex items-center justify-center"><div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>}
              {image && <img src={image} className="w-full h-full object-contain" alt="Preview" />}
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-black">Detected Palette</h3>
            <div className="grid grid-cols-2 gap-4">
              {palette.map((c, i) => (
                <div 
                  key={i} 
                  className="group bg-white dark:bg-slate-900 p-3 rounded-2xl border dark:border-slate-800 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(c)}
                >
                  <div className="h-20 w-full rounded-xl mb-3 shadow-inner" style={{ backgroundColor: c }} />
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs font-mono font-bold">{c}</span>
                    <span className="text-[9px] font-black text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">COPY</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ImageExtractor;
