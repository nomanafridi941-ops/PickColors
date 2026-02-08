import React, { useState } from 'react';

const MiniColorPicker: React.FC = () => {
  const [hex, setHex] = useState('#6366F1');
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      // small visual confirmation could be added by parent UX
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm max-w-md mx-auto">
      <div className="flex items-center gap-4">
        <input type="color" value={hex} onChange={e => setHex(e.target.value)} className="w-20 h-20 p-0 border-none rounded-2xl cursor-pointer" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="font-bold text-slate-900 dark:text-white">Mini Color Picker</div>
            <button onClick={handleCopy} className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm">Copy HEX</button>
          </div>
          <div className="text-sm font-mono text-slate-500 dark:text-slate-400">{hex}</div>
        </div>
      </div>
    </div>
  );
};

export default MiniColorPicker;
