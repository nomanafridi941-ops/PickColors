
import React, { useState, useMemo } from 'react';
import { getHarmonies } from '../../utils/colorUtils';

const ColorHarmonies: React.FC = () => {
  const [baseColor, setBaseColor] = useState('#6366F1');
  const harmonies = useMemo(() => getHarmonies(baseColor), [baseColor]);

  const HarmonySection = ({ title, colors }: { title: string, colors: string[] }) => (
    <div className="mb-12">
      <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-500 mb-4">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {colors.map((c, i) => (
          <div key={i} className="group relative">
            <div 
              className="h-32 w-full rounded-2xl shadow-sm group-hover:shadow-lg transition-all border border-black/5 dark:border-white/5"
              style={{ backgroundColor: c }}
            />
            <div className="mt-2 text-center">
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">{c}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(c)}
                className="block w-full text-[10px] text-indigo-600 dark:text-indigo-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black mb-4">Color Harmonies</h1>
        <p className="text-slate-500 max-w-xl mx-auto">Discover mathematically perfect color relationships based on color theory.</p>
        <div className="mt-8 flex justify-center items-center gap-4">
          <input 
            type="color" 
            value={baseColor} 
            onChange={e => setBaseColor(e.target.value)} 
            className="w-16 h-16 p-0 border-none rounded-2xl cursor-pointer shadow-lg"
          />
          <input 
            type="text" 
            value={baseColor} 
            onChange={e => setBaseColor(e.target.value)} 
            className="px-6 py-4 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-2xl font-mono text-xl outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <HarmonySection title="Complementary" colors={harmonies.complementary} />
      <HarmonySection title="Analogous" colors={harmonies.analogous} />
      <HarmonySection title="Triadic" colors={harmonies.triadic} />
      <HarmonySection title="Split Complementary" colors={harmonies.splitComplementary} />
      <HarmonySection title="Tetradic" colors={harmonies.tetradic} />
    </div>
  );
};

export default ColorHarmonies;
