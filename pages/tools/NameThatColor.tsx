
import React, { useState } from 'react';
import { COLOR_NAMES_MAP } from '../../constants';
import { hexToRgb } from '../../utils/colorUtils';

const NameThatColor: React.FC = () => {
  const [hex, setHex] = useState('#6366F1');
  
  const getName = (inputHex: string) => {
    const inputRgb = hexToRgb(inputHex);
    let closestColor = "Unknown";
    let minDistance = Infinity;

    Object.entries(COLOR_NAMES_MAP).forEach(([colorHex, name]) => {
      const rgb = hexToRgb(colorHex);
      const distance = Math.sqrt(
        Math.pow(inputRgb.r - rgb.r, 2) +
        Math.pow(inputRgb.g - rgb.g, 2) +
        Math.pow(inputRgb.b - rgb.b, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = name;
      }
    });
    return closestColor;
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-4 text-center">
      <h1 className="text-5xl font-black mb-12">Name That Color</h1>
      <div className="flex flex-col items-center gap-12">
        <div 
          className="w-64 h-64 rounded-full shadow-2xl border-8 border-white dark:border-slate-800 transition-all duration-500 scale-110"
          style={{ backgroundColor: hex }}
        />
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">{getName(hex)}</h2>
          <p className="text-slate-500 font-mono text-xl">{hex}</p>
        </div>
        <input 
          type="color" 
          value={hex} 
          onChange={e => setHex(e.target.value)} 
          className="w-32 h-16 p-0 border-none rounded-2xl cursor-pointer" 
        />
      </div>
    </div>
  );
};

export default NameThatColor;
