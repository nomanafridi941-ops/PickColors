import React, { useState } from 'react';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';

interface ColorStop {
  id: string;
  color: string;
  pos: number;
}

const GradientGenerator: React.FC = () => {
  const [stops, setStops] = useState<ColorStop[]>([
    { id: '1', color: '#6366F1', pos: 0 },
    { id: '2', color: '#A855F7', pos: 50 },
    { id: '3', color: '#EC4899', pos: 100 }
  ]);
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [copied, setCopied] = useState(false);

  const sortedStops = [...stops].sort((a, b) => a.pos - b.pos);
  const stopStrings = sortedStops.map(s => `${s.color} ${s.pos}%`).join(', ');
  const gradientString = type === 'linear' 
    ? `linear-gradient(${angle}deg, ${stopStrings})` 
    : `radial-gradient(circle, ${stopStrings})`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addStop = () => {
    if (stops.length >= 6) return;
    const newId = Math.random().toString(36).substr(2, 9);
    setStops([...stops, { id: newId, color: '#94a3b8', pos: 75 }]);
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) return;
    setStops(stops.filter(s => s.id !== id));
  };

  const updateStop = (id: string, updates: Partial<ColorStop>) => {
    setStops(stops.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  return (
    <div>
      <SEOHead 
        title="Gradient Generator"
        description="Create beautiful CSS gradients with multiple color stops. Professional gradient designer for developers and designers."
        url="/tools/gradient"
      />
      <div className="max-w-7xl mx-auto py-16 px-4">
      <Breadcrumbs />
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-4 tracking-tight">Pro Gradient Designer</h1>
        <p className="text-slate-500 max-w-xl mx-auto text-lg">Create complex multi-stop CSS gradients with precision control and live code generation.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <div 
            className="w-full h-[450px] rounded-[3rem] shadow-2xl border border-white/10 relative overflow-hidden group"
            style={{ background: gradientString }}
          >
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 shadow-xl shadow-indigo-500/5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg uppercase tracking-wider text-slate-400">CSS Output</h3>
              <div className="flex gap-2">
                <button 
                   onClick={() => handleCopy(`background: ${gradientString};`)}
                   className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20"
                >
                  {copied ? 'Copied!' : 'Copy CSS'}
                </button>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border dark:border-slate-800 font-mono text-xs leading-relaxed overflow-x-auto select-all">
              {`background: ${gradientString};`}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-xl">Stops</h3>
              <button 
                onClick={addStop}
                disabled={stops.length >= 6}
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition disabled:opacity-20"
              >
                +
              </button>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {stops.map((stop) => (
                <div key={stop.id} className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border dark:border-slate-800">
                  <input 
                    type="color" 
                    value={stop.color} 
                    onChange={e => updateStop(stop.id, { color: e.target.value })}
                    className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                      <span>Position</span>
                      <span>{stop.pos}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" value={stop.pos} 
                      onChange={e => updateStop(stop.id, { pos: parseInt(e.target.value) })}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                  <button 
                    onClick={() => removeStop(stop.id)}
                    className="text-slate-400 hover:text-rose-500 p-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t dark:border-slate-800 grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase text-slate-400">Orientation</label>
                <div className="flex gap-2">
                  <button onClick={() => setType('linear')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition ${type === 'linear' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Linear</button>
                  <button onClick={() => setType('radial')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition ${type === 'radial' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Radial</button>
                </div>
              </div>
              {type === 'linear' && (
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-black uppercase text-slate-400">
                    <span>Angle</span>
                    <span>{angle}°</span>
                  </div>
                  <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(parseInt(e.target.value))} className="w-full accent-indigo-600" />
                </div>
              )}
            </div>
          </div>
        </div>
      {/* Helper text for copy functionality */}
      <p className="text-xs text-slate-400 mt-2 mb-6">Copy the CSS gradient code with one click.</p>
    </div>
  );
};

export default GradientGenerator;
