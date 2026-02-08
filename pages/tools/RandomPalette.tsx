import React, { useState, useEffect } from 'react';
import { generateRandomHex } from '../../utils/colorUtils';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import ToolsAdRow from '../../components/Ads/ToolsAdRow';

const RandomPalette: React.FC = () => {
  const [colors, setColors] = useState<{hex: string, locked: boolean}[]>(() => 
    Array(5).fill(0).map(() => ({ hex: generateRandomHex(), locked: false }))
  );

  const shuffle = () => {
    setColors(prev => prev.map(c => c.locked ? c : { hex: generateRandomHex(), locked: false }));
  };

  const toggleLock = (index: number) => {
    setColors(prev => prev.map((c, i) => i === index ? { ...c, locked: !c.locked } : c));
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        shuffle();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <SEOHead 
        title="Random Color Palette Generator"
        description="Generate fresh color palettes with a single click. Random color combinations for design inspiration."
        url="/tools/palette"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {"@type": "Question","name": "How many colors are generated?","acceptedAnswer": {"@type": "Answer","text": "By default five colors are generated; you can reshuffle to get new combinations."}},
            {"@type": "Question","name": "Can I lock colors?","acceptedAnswer": {"@type": "Answer","text": "Yes — lock a color to keep it while reshuffling others."}},
            {"@type": "Question","name": "Is this free to use?","acceptedAnswer": {"@type": "Answer","text": "Yes — free and no sign-in required."}}
          ]
        }}
      />
      <div className="h-[calc(100vh-80px)] w-full flex flex-col">
      <Breadcrumbs />
      <div className="text-center mb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">Random Palette Generator</h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Quickly generate ready-to-use color palettes to spark creative direction or kickstart a design. Our Random Palette Generator produces harmonious sets that are easy to preview and copy into your projects. Use the shuffle button or press the spacebar to generate fresh combinations; lock colors you want to keep while remixing the rest. Each palette displays HEX values so you can paste them directly into CSS, design tools, or pattern libraries. This tool is ideal when you need inspiration fast—try several shuffles to find a foundation for UI themes, marketing assets, or illustration palettes. Combine it with the Contrast Checker and Color Harmonies tools to refine palettes for accessibility and coherence.
        </p>
      </div>
      <ToolsAdRow />
        {colors.map((c, i) => (
          <div 
            key={i} 
            className="flex-grow flex flex-col items-center justify-center relative group transition-all duration-300"
            style={{ backgroundColor: c.hex }}
          >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-md p-4 rounded-2xl flex flex-col items-center gap-4">
              <button 
                onClick={() => toggleLock(i)}
                className={`p-3 rounded-full ${c.locked ? 'bg-indigo-600 text-white' : 'bg-white text-slate-900'}`}
              >
                {c.locked ? '🔒' : '🔓'}
              </button>
              <button 
                onClick={() => navigator.clipboard.writeText(c.hex)}
                className="px-4 py-2 bg-white text-slate-900 rounded-xl text-xs font-bold uppercase tracking-widest"
              >
                Copy {c.hex}
              </button>
            </div>
            <div className="absolute bottom-10 text-white font-black text-2xl tracking-tighter drop-shadow-lg">
              {c.hex}
            </div>
          </div>
        ))}
      </div>
      <div className="p-8 bg-white dark:bg-slate-950 border-t dark:border-slate-800 flex justify-center items-center gap-8">
        <p className="hidden md:block text-sm font-bold text-slate-400">Press <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded border dark:border-slate-700">Space</span> to Shuffle</p>
        <p className="text-xs text-slate-400 mt-2 mb-6">Copy any palette color code with one click.</p>
        <button 
          onClick={shuffle}
          className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all"
        >
          Shuffle Palette
        </button>
      </div>
    </>
  );
};

export default RandomPalette;
