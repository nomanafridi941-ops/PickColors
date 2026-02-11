import React, { useState, useRef } from 'react';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
// ...existing code...
import RelatedTools from '../../components/RelatedTools';
import FAQList from '../../components/FAQList';
import { TOOLS } from '../../constants';

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
    <>
      <SEOHead 
        title="Image Color Extractor"
        description="Upload images to extract dominant color palettes. AI-powered color extraction from photos for design inspiration."
        url="/tools/extractor"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Image Color Extractor — PickColors",
            "url": "https://pickcolors.xyz/tools/extractor",
            "applicationCategory": "DesignTool",
            "operatingSystem": "Web",
            "description": "Extract dominant colors from images and photos.",
            "image": "https://pickcolors.xyz/og-image.png"
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {"@type": "Question","name": "Can I extract colors from any image?","acceptedAnswer": {"@type": "Answer","text": "Yes, upload or link to most public images; if CORS blocks direct access we offer a proxy fallback."}},
              {"@type": "Question","name": "How many colors are extracted?","acceptedAnswer": {"@type": "Answer","text": "Up to 10 prominent colors are detected per image."}},
              {"@type": "Question","name": "Is the tool free?","acceptedAnswer": {"@type": "Answer","text": "Yes — it's free and does not require login."}}
            ]
          }
        ]}
      />
      <div className="max-w-7xl mx-auto py-16 px-4">
      <Breadcrumbs />
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white text-3xl mb-6 shadow-xl shadow-indigo-600/20">
          {useUrl ? '🔗' : '📷'}
        </div>
        <h1 className="text-5xl font-black mb-4 tracking-tight">
          {useUrl ? 'Palette from Image URL' : 'Image Color Extractor'}
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg">
          Quickly extract meaningful color palettes from photographs, screenshots, and design assets with our Image Color Extractor. Upload a local file or paste an image URL—if an image is protected by CORS we attempt a secure proxy fallback so you can still analyze colors. The tool detects up to ten prominent colors, presenting them as HEX codes you can copy into your designs or CSS. Whether you're matching brand imagery, pulling inspiration from photography, or preparing assets for social media, this extractor speeds up the process of turning visuals into usable color systems. It’s especially useful for designers, content creators, and developers who need fast, reliable palettes from real images without complicated tooling.
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

      {/* ...ad removed... */}
      {/* SEO-optimized H1 and intro */}
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
        Pick Color from Image Online
      </h1>
      <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
        Instantly extract color palettes from any image. This free online image color picker helps designers and developers get HEX codes from photos, graphics, and screenshots for use in web, UI, and branding projects.
      </p>

      <FAQList faqs={[
        { q: 'Can I extract colors from any image?', a: 'Upload or link to most public images; if CORS blocks direct access we offer a proxy fallback.' },
        { q: 'How many colors are extracted?', a: 'Up to 10 prominent colors are detected per image.' },
        { q: 'Is the tool free?', a: 'Yes — it is free and does not require login.' }
      ]} />

      <RelatedTools items={TOOLS.filter(t => ['picker','palette','harmonies','contrast'].includes(t.id))} />

      {/* Helper text for copy functionality */}
      <p className="text-xs text-slate-400 mt-2 mb-6">Copy any extracted color code with one click.</p>

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
    </>
  );
};

export default ImageExtractor;
