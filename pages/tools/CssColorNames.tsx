import React, { useState, useMemo } from 'react';
import { hexToRgb } from '../../utils/colorUtils';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';

const CSS_COLORS = [
  { name: 'AliceBlue', hex: '#F0F8FF' }, { name: 'AntiqueWhite', hex: '#FAEBD7' }, { name: 'Aqua', hex: '#00FFFF' },
  { name: 'Aquamarine', hex: '#7FFFD4' }, { name: 'Azure', hex: '#F0FFFF' }, { name: 'Beige', hex: '#F5F5DC' },
  { name: 'Bisque', hex: '#FFE4C4' }, { name: 'Black', hex: '#000000' }, { name: 'BlanchedAlmond', hex: '#FFEBCD' },
  { name: 'Blue', hex: '#0000FF' }, { name: 'BlueViolet', hex: '#8A2BE2' }, { name: 'Brown', hex: '#A52A2A' },
  { name: 'BurlyWood', hex: '#DEB887' }, { name: 'CadetBlue', hex: '#5F9EA0' }, { name: 'Chartreuse', hex: '#7FFF00' },
  { name: 'Chocolate', hex: '#D2691E' }, { name: 'Coral', hex: '#FF7F50' }, { name: 'CornflowerBlue', hex: '#6495ED' },
  { name: 'Cornsilk', hex: '#FFF8DC' }, { name: 'Crimson', hex: '#DC143C' }, { name: 'Cyan', hex: '#00FFFF' },
  { name: 'DarkBlue', hex: '#00008B' }, { name: 'DarkCyan', hex: '#008B8B' }, { name: 'DarkGoldenRod', hex: '#B8860B' },
  { name: 'DarkGray', hex: '#A9A9A9' }, { name: 'DarkGreen', hex: '#006400' }, { name: 'DarkKhaki', hex: '#BDB76B' },
  { name: 'DarkMagenta', hex: '#8B008B' }, { name: 'DarkOliveGreen', hex: '#556B2F' }, { name: 'DarkOrange', hex: '#FF8C00' },
  { name: 'DarkOrchid', hex: '#9932CC' }, { name: 'DarkRed', hex: '#8B0000' }, { name: 'DarkSalmon', hex: '#E9967A' },
  { name: 'DarkSeaGreen', hex: '#8FBC8F' }, { name: 'DarkSlateBlue', hex: '#483D8B' }, { name: 'DarkSlateGray', hex: '#2F4F4F' },
  { name: 'DarkTurquoise', hex: '#00CED1' }, { name: 'DarkViolet', hex: '#9400D3' }, { name: 'DeepPink', hex: '#FF1493' },
  { name: 'DeepSkyBlue', hex: '#00BFFF' }, { name: 'DimGray', hex: '#696969' }, { name: 'DodgerBlue', hex: '#1E90FF' },
  { name: 'FireBrick', hex: '#B22222' }, { name: 'FloralWhite', hex: '#FFFFAF' }, { name: 'ForestGreen', hex: '#228B22' },
  { name: 'Fuchsia', hex: '#FF00FF' }, { name: 'Gainsboro', hex: '#DCDCDC' }, { name: 'GhostWhite', hex: '#F8F8FF' },
  { name: 'Gold', hex: '#FFD700' }, { name: 'GoldenRod', hex: '#DAA520' }, { name: 'Gray', hex: '#808080' },
  { name: 'Green', hex: '#008000' }, { name: 'GreenYellow', hex: '#ADFF2F' }, { name: 'HoneyDew', hex: '#F0FFF0' },
  { name: 'HotPink', hex: '#FF69B4' }, { name: 'IndianRed', hex: '#CD5C5C' }, { name: 'Indigo', hex: '#4B0082' },
  { name: 'Ivory', hex: '#FFFFF0' }, { name: 'Khaki', hex: '#F0E68C' }, { name: 'Lavender', hex: '#E6E6FA' },
  { name: 'LavenderBlush', hex: '#FFF0F5' }, { name: 'LawnGreen', hex: '#7CFC00' }, { name: 'LemonChiffon', hex: '#FFFACD' },
  { name: 'LightBlue', hex: '#ADD8E6' }, { name: 'LightCoral', hex: '#F08080' }, { name: 'LightCyan', hex: '#E0FFFF' },
  { name: 'LightGoldenRodYellow', hex: '#FAFAD2' }, { name: 'LightGray', hex: '#D3D3D3' }, { name: 'LightGreen', hex: '#90EE90' },
  { name: 'LightPink', hex: '#FFB6C1' }, { name: 'LightSalmon', hex: '#FFA07A' }, { name: 'LightSeaGreen', hex: '#20B2AA' },
  { name: 'LightSkyBlue', hex: '#87CEFA' }, { name: 'LightSlateGray', hex: '#778899' }, { name: 'LightSteelBlue', hex: '#B0C4DE' },
  { name: 'LightYellow', hex: '#FFFFE0' }, { name: 'Lime', hex: '#00FF00' }, { name: 'LimeGreen', hex: '#32CD32' },
  { name: 'Linen', hex: '#FAF0E6' }, { name: 'Magenta', hex: '#FF00FF' }, { name: 'Maroon', hex: '#800000' },
  { name: 'MediumAquaMarine', hex: '#66CDAA' }, { name: 'MediumBlue', hex: '#0000CD' }, { name: 'MediumOrchid', hex: '#BA55D3' },
  { name: 'MediumPurple', hex: '#9370DB' }, { name: 'MediumSeaGreen', hex: '#3CB371' }, { name: 'MediumSlateBlue', hex: '#7B68EE' },
  { name: 'MediumSpringGreen', hex: '#00FA9A' }, { name: 'MediumTurquoise', hex: '#48D1CC' }, { name: 'MediumVioletRed', hex: '#C71585' },
  { name: 'MidnightBlue', hex: '#191970' }, { name: 'MintCream', hex: '#F5FFFA' }, { name: 'MistyRose', hex: '#FFE4E1' },
  { name: 'Moccasin', hex: '#FFE4B5' }, { name: 'NavajoWhite', hex: '#FFDEAD' }, { name: 'Navy', hex: '#000080' },
  { name: 'OldLace', hex: '#FDF5E6' }, { name: 'Olive', hex: '#808000' }, { name: 'OliveDrab', hex: '#6B8E23' },
  { name: 'Orange', hex: '#FFA500' }, { name: 'OrangeRed', hex: '#FF4500' }, { name: 'Orchid', hex: '#DA70D6' },
  { name: 'PaleGoldenRod', hex: '#EEE8AA' }, { name: 'PaleGreen', hex: '#98FB98' }, { name: 'PaleTurquoise', hex: '#AFEEEE' },
  { name: 'PaleVioletRed', hex: '#DB7093' }, { name: 'PapayaWhip', hex: '#FFEFD5' }, { name: 'PeachPuff', hex: '#FFDAB9' },
  { name: 'Peru', hex: '#CD853F' }, { name: 'Pink', hex: '#FFC0CB' }, { name: 'Plum', hex: '#DDA0DD' },
  { name: 'PowderBlue', hex: '#B0E0E6' }, { name: 'Purple', hex: '#800080' }, { name: 'RebeccaPurple', hex: '#663399' },
  { name: 'Red', hex: '#FF0000' }, { name: 'RosyBrown', hex: '#BC8F8F' }, { name: 'RoyalBlue', hex: '#4169E1' },
  { name: 'SaddleBrown', hex: '#8B4513' }, { name: 'Salmon', hex: '#FA8072' }, { name: 'SandyBrown', hex: '#F4A460' },
  { name: 'SeaGreen', hex: '#2E8B57' }, { name: 'SeaShell', hex: '#FFF5EE' }, { name: 'Sienna', hex: '#A0522D' },
  { name: 'Silver', hex: '#C0C0C0' }, { name: 'SkyBlue', hex: '#87CEEB' }, { name: 'SlateBlue', hex: '#6A5ACD' },
  { name: 'SlateGray', hex: '#708090' }, { name: 'Snow', hex: '#FFFAFA' }, { name: 'SpringGreen', hex: '#00FF7F' },
  { name: 'SteelBlue', hex: '#4682B4' }, { name: 'Tan', hex: '#D2B48C' }, { name: 'Teal', hex: '#008080' },
  { name: 'Thistle', hex: '#D8BFD8' }, { name: 'Tomato', hex: '#FF6347' }, { name: 'Turquoise', hex: '#40E0D0' },
  { name: 'Violet', hex: '#EE82EE' }, { name: 'Wheat', hex: '#F5DEB3' }, { name: 'White', hex: '#FFFFFF' },
  { name: 'WhiteSmoke', hex: '#F5F5F5' }, { name: 'Yellow', hex: '#FFFF00' }, { name: 'YellowGreen', hex: '#9ACD32' }
];

const CssColorNames: React.FC = () => {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'similarity'>('name');
  const [referenceColor, setReferenceColor] = useState('#6366F1');

  const filtered = useMemo(() => {
    let list = CSS_COLORS.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.hex.toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === 'similarity') {
      const refRgb = hexToRgb(referenceColor);
      list.sort((a, b) => {
        const aRgb = hexToRgb(a.hex);
        const bRgb = hexToRgb(b.hex);
        const distA = Math.sqrt(Math.pow(aRgb.r - refRgb.r, 2) + Math.pow(aRgb.g - refRgb.g, 2) + Math.pow(aRgb.b - refRgb.b, 2));
        const distB = Math.sqrt(Math.pow(bRgb.r - refRgb.r, 2) + Math.pow(bRgb.g - refRgb.g, 2) + Math.pow(bRgb.b - refRgb.b, 2));
        return distA - distB;
      });
    }

    return list;
  }, [search, sortBy, referenceColor]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <>
      <SEOHead 
        title="CSS Color Names Finder"
        description="Search and find all 148 official CSS color keywords. Find hex codes for CSS color names."
        url="/tools/css-names"
      />
      <div className="max-w-7xl mx-auto py-16 px-4">
      <Breadcrumbs />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 text-center">
          CSS Color Names List Online
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto text-center">
          Instantly browse, search, and copy all standard CSS color names and hex codes. This free online color names tool helps designers and developers use named colors for web, UI, and branding projects.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 shadow-2xl shadow-indigo-500/5 mb-16 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 ml-2">Search Catalog</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search (e.g. 'Blue', 'Dark', '#F0F')..." 
                className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 ml-2">Smart Sorting</label>
            <div className="flex gap-3">
              <select 
                className="flex-grow p-4 bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl outline-none"
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
              >
                <option value="name">Sort by Alphabetical</option>
                <option value="similarity">Sort by Similarity to Reference</option>
              </select>
              {sortBy === 'similarity' && (
                <input 
                  type="color" 
                  value={referenceColor} 
                  onChange={e => setReferenceColor(e.target.value)}
                  className="w-14 h-14 p-0 border-none rounded-2xl cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {filtered.map((c, i) => (
          <div key={i} className="group bg-white dark:bg-slate-900 p-4 rounded-3xl border dark:border-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div 
              className="h-24 w-full rounded-2xl mb-4 border dark:border-white/5 shadow-inner cursor-pointer" 
              style={{ backgroundColor: c.name }}
              onClick={() => handleCopy(c.hex)}
            />
            <div className="px-1">
              <h4 className="font-bold text-sm truncate" title={c.name}>{c.name}</h4>
              <p className="text-[10px] font-mono text-slate-400 font-bold tracking-wider">{c.hex}</p>
              <div className="flex gap-1.5 mt-4">
                <button 
                  onClick={() => handleCopy(c.name)}
                  className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${copied === c.name ? 'bg-emerald-500 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-indigo-600 hover:text-white'}`}
                >
                  {copied === c.name ? 'Copied' : 'Name'}
                </button>
                <button 
                  onClick={() => handleCopy(c.hex)}
                  className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${copied === c.hex ? 'bg-emerald-500 text-white' : 'bg-indigo-500/10 text-indigo-500 hover:bg-indigo-600 hover:text-white'}`}
                >
                  {copied === c.hex ? 'Copied' : 'Hex'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-32 opacity-30">
          <span className="text-6xl">🎨</span>
          <p className="mt-4 font-bold">No colors matching your search.</p>
        </div>
      )}
      {/* Helper text for copy functionality */}
      <p className="text-xs text-slate-400 mt-2 mb-6">Copy any CSS color name or hex code with one click.</p>
    </div>
    </>
  );
};

export default CssColorNames;
