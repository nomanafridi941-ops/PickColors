
import React, { useState } from 'react';

const ReadabilityTester: React.FC = () => {
  const [bg, setBg] = useState('#FFFFFF');
  const [fg, setFg] = useState('#1E293B');
  const [fontSize, setFontSize] = useState(16);

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-black mb-12 text-center">Readability Tester</h1>
      
      <div className="grid lg:grid-cols-4 gap-8 mb-12">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800">
          <label className="block text-xs font-bold uppercase mb-2">Background</label>
          <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-full h-12 rounded-lg cursor-pointer" />
        </div>
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800">
          <label className="block text-xs font-bold uppercase mb-2">Text Color</label>
          <input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-full h-12 rounded-lg cursor-pointer" />
        </div>
        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800">
          <label className="block text-xs font-bold uppercase mb-2">Font Size: {fontSize}px</label>
          <input type="range" min="12" max="72" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} className="w-full accent-indigo-600" />
        </div>
      </div>

      <div 
        className="p-12 md:p-20 rounded-[3rem] border shadow-2xl transition-all duration-300 min-h-[500px]"
        style={{ backgroundColor: bg, color: fg, fontSize: `${fontSize}px` }}
      >
        <h2 className="font-bold mb-6" style={{ fontSize: `${fontSize * 1.5}px` }}>The quick brown fox jumps over the lazy dog.</h2>
        <p className="leading-relaxed mb-8">
          This is a sample paragraph to test readability. Good design is about finding the right balance between typography and color. 
          When the contrast is high enough, text becomes effortless to read across all devices and lighting conditions.
        </p>
        <p className="font-medium">Medium Weight Preview</p>
        <p className="font-bold">Bold Weight Preview</p>
        <p className="italic">Italic Style Preview</p>
      </div>
    </div>
  );
};

export default ReadabilityTester;
