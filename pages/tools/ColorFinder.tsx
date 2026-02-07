import React, { useState, useMemo } from 'react';
import { getShadesAndTints } from '../../utils/colorUtils';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import ToolsAdRow from '../../components/Ads/ToolsAdRow';

const ColorFinder: React.FC = () => {
  const [hex, setHex] = useState('#6366F1');
  const { shades, tints } = useMemo(() => getShadesAndTints(hex), [hex]);

  const ColorBar = ({ title, colors }: { title: string, colors: string[] }) => (
    <div className="mb-12">
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">{title}</h3>
      <div className="flex h-32 rounded-3xl overflow-hidden shadow-xl">
        {colors.map((c, i) => (
          <div
            key={i}
            className="flex-grow group relative flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: c }}
            onClick={() => navigator.clipboard.writeText(c)}
          >
            <span className="opacity-0 group-hover:opacity-100 text-[10px] font-bold text-white bg-black/20 p-2 rounded-lg backdrop-blur-sm transition-opacity">
              {c}
            </span >
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <SEOHead 
        title="Color Finder"
        description="Find similar shades and variations for any color. Discover tints and shades of your favorite hex colors."
        url="/tools/finder"
      />
      <div className="max-w-6xl mx-auto py-16 px-4">
      <Breadcrumbs />
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 text-center">
        Find Color Shades & Tints Online
      </h1>

      <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto text-center">
        Instantly discover lighter tints and darker shades for any color. This free online color finder helps designers and developers create harmonious color variations for web, UI, and branding projects.
      </p>

      <ToolsAdRow />

      <p className="text-xs text-slate-400 mt-2 mb-6">Copy any shade or tint color code with one click.</p>

      <div className="flex justify-center mb-16 gap-4">
        <input type="color" value={hex} onChange={e => setHex(e.target.value)} className="w-16 h-16 rounded-2xl border-none cursor-pointer" />
        <input type="text" value={hex} onChange={e => setHex(e.target.value)} className="px-6 rounded-2xl border dark:border-slate-800 bg-white dark:bg-slate-900 font-mono uppercase outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <ColorBar title="Tints (Lighter)" colors={[...tints].reverse()} />
      <div className="h-40 w-full rounded-3xl mb-12 shadow-inner border border-black/5 dark:border-white/5" style={{ backgroundColor: hex }} />
      <ColorBar title="Shades (Darker)" colors={shades} />
    </div>
    </>
  );
};

export default ColorFinder;
