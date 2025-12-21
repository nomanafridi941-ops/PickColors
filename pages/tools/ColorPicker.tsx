
import React, { useState, useEffect } from 'react';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '../../utils/colorUtils';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEOHead from '../../components/SEOHead';

// Added interface to support initialMode prop from routes
interface ColorPickerProps {
  initialMode?: 'hex' | 'rgb' | 'hsl' | string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ initialMode }) => {
  const [hex, setHex] = useState('#6366F1');
  const [rgb, setRgb] = useState({ r: 99, g: 102, b: 241 });
  const [hsl, setHsl] = useState({ h: 239, s: 84, l: 67 });
  const [copied, setCopied] = useState<string | null>(null);

  const updateFromHex = (newHex: string) => {
    if (!/^#[0-9A-F]{6}$/i.test(newHex)) return;
    const newRgb = hexToRgb(newHex);
    const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
    setHex(newHex);
    setRgb(newRgb);
    setHsl(newHsl);
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    const newHex = rgbToHex(r, g, b);
    const newHsl = rgbToHsl(r, g, b);
    setHex(newHex);
    setRgb({ r, g, b });
    setHsl(newHsl);
  };

  const updateFromHsl = (h: number, s: number, l: number) => {
    const newRgb = hslToRgb(h, s, l);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHex(newHex);
    setRgb(newRgb);
    setHsl({ h, s, l });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <SEOHead 
        title="Color Picker & Converter"
        description="Pick colors visually and convert between HEX, RGB, and HSL. Accurate color conversion tool for designers and developers."
        url="/tools/picker"
      />
      <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="mb-16 text-center">
        {/* Dynamic title based on initialMode prop */}
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          {initialMode === 'hex' ? 'HEX to RGB Converter' : 
           initialMode === 'rgb' ? 'RGB to HEX Converter' : 
           initialMode === 'hsl' ? 'HSL Color Converter' : 
           'Color Picker & Converter'}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Precision color selection with instant conversion and copy functionality.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-500/5 transition-all">
            <div className="flex items-center justify-between mb-8">
              <label className="text-sm font-bold uppercase tracking-widest text-indigo-500">Preview</label>
              <div className="flex gap-2">
                 <div className="w-4 h-4 rounded-full" style={{ backgroundColor: hex }}></div>
                 <span className="text-xs font-mono text-slate-400">{hex}</span>
              </div>
            </div>
            <div 
              className="w-full h-80 rounded-3xl mb-8 shadow-inner border border-black/5 dark:border-white/5 transition-all duration-500 relative group overflow-hidden"
              style={{ backgroundColor: hex }}
            >
                <div className="absolute inset-0 bg-white/10 dark:bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex items-center gap-4">
              <input 
                type="color" 
                value={hex}
                onChange={(e) => updateFromHex(e.target.value)}
                className="w-24 h-24 rounded-2xl cursor-pointer border-none p-0 bg-transparent"
              />
              <div className="flex-1">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Click the palette above or the square to the left to pick a custom color.</p>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono">R: {rgb.r}</span>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono">G: {rgb.g}</span>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono">B: {rgb.b}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          {/* HEX Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">HEX Code</label>
              <button 
                onClick={() => handleCopy(hex)} 
                className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${copied === hex ? 'bg-emerald-500 text-white' : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500 hover:text-white'}`}
              >
                {copied === hex ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xl">#</span>
                <input 
                  type="text" 
                  value={hex.replace('#', '')}
                  onChange={(e) => updateFromHex('#' + e.target.value)}
                  className="w-full pl-10 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl font-mono text-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none uppercase text-indigo-600 dark:text-indigo-400 transition-all"
                />
            </div>
          </div>

          {/* RGB Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all">
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">RGB Model</label>
              <button 
                onClick={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${copied?.includes('rgb') ? 'bg-emerald-500 text-white' : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500 hover:text-white'}`}
              >
                {copied?.includes('rgb') ? 'Copied!' : 'Copy CSS'}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 ml-1">Red</span>
                <input type="number" min="0" max="255" value={rgb.r} onChange={(e) => updateFromRgb(parseInt(e.target.value) || 0, rgb.g, rgb.b)} className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-center focus:ring-2 focus:ring-indigo-500/20" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 ml-1">Green</span>
                <input type="number" min="0" max="255" value={rgb.g} onChange={(e) => updateFromRgb(rgb.r, parseInt(e.target.value) || 0, rgb.b)} className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-center focus:ring-2 focus:ring-indigo-500/20" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 ml-1">Blue</span>
                <input type="number" min="0" max="255" value={rgb.b} onChange={(e) => updateFromRgb(rgb.r, rgb.g, parseInt(e.target.value) || 0)} className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-center focus:ring-2 focus:ring-indigo-500/20" />
              </div>
            </div>
          </div>

          <AdPlaceholder type="sidebar" className="mt-4" />
        </div>
      </div>

      <div className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-16">
        <div className="grid md:grid-cols-2 gap-12 text-slate-600 dark:text-slate-400 leading-relaxed mb-16">
            <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Precision Conversion</h3>
                <p>PickColors uses standard sRGB color space mapping. Our algorithms ensure that your 8-bit RGB values map perfectly to HSL and HEX counterparts, preventing "color drift" often found in simpler tools. This is essential for maintaining brand integrity across digital platforms.</p>
            </div>
            <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Design-to-Code Efficiency</h3>
                <p>Quickly copy CSS values for your React or Tailwind projects. The "Copy" buttons provide standardized CSS syntax, ready to be pasted directly into your stylesheets or styled-components. Seamlessly switch between dark and light themes to see how your colors perform in different environments.</p>
            </div>
        </div>
        
        <AdPlaceholder type="horizontal" />
      </div>
    </>
  );
};

export default ColorPicker;
