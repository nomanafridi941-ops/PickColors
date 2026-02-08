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
      />
      <div className="h-[calc(100vh-80px)] w-full flex flex-col">
      <Breadcrumbs />
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
