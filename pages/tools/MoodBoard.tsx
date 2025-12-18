
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

const MoodBoard: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [palette, setPalette] = useState<{ color: string, name: string, description: string }[] | null>(null);

  const generateMood = async () => {
    if (!keyword) return;
    setLoading(true);
    try {
      // Cast API key to string to avoid TS build errors
      const apiKey = (process.env as any).API_KEY;
      const ai = new GoogleGenAI({ apiKey: apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Create a professional 5-color aesthetic mood board for the theme: "${keyword}". 
        Return a JSON array of objects, each with 'color' (hex), 'name' (creative poetic name), and 'description' (why it works for this mood). 
        Choose professional, modern color combinations used in high-end UI or brand identity.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                color: { type: Type.STRING },
                name: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["color", "name", "description"]
            }
          }
        }
      });
      
      const result = JSON.parse(response.text || '[]');
      setPalette(result);
    } catch (error) {
      console.error(error);
      alert("Error contacting the aesthetic engine. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-xl shadow-indigo-500/20">
          <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
          AI Powered Inspiration
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Thematic Mood Board</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Unlock professional color palettes by describing any mood, brand concept, or physical environment.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-20">
        <div className="relative group">
            <input 
              type="text" 
              placeholder="e.g. 'Midnight in Tokyo', 'Organic Skincare Brand', 'Retro Futurism'..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generateMood()}
              className="w-full pl-8 pr-48 py-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl shadow-indigo-500/5 text-xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
            />
            <button 
              onClick={generateMood}
              disabled={loading || !keyword}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-10 py-4 bg-indigo-600 text-white rounded-[2rem] font-black hover:bg-indigo-700 disabled:opacity-50 transition shadow-xl shadow-indigo-600/20"
            >
              {loading ? 'Thinking...' : 'Curate'}
            </button>
        </div>
      </div>

      {palette && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
           <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {palette.map((item, idx) => (
                <div key={idx} className="flex flex-col group">
                  <div 
                    className="h-96 rounded-[2.5rem] mb-6 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:-rotate-2 cursor-pointer flex items-end p-8"
                    style={{ backgroundColor: item.color }}
                    onClick={() => {
                        navigator.clipboard.writeText(item.color);
                        alert(`Copied ${item.color}`);
                    }}
                  >
                     <div className="bg-black/10 backdrop-blur-md px-4 py-2 rounded-2xl text-white font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.color}
                     </div>
                  </div>
                  <div className="px-4">
                    <h3 className="text-xl font-black mb-2 tracking-tight">{item.name}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed italic">"{item.description}"</p>
                  </div>
                </div>
              ))}
           </div>
           
           <div className="p-12 bg-white dark:bg-slate-900 rounded-[3rem] border dark:border-slate-800 text-center">
              <h4 className="text-slate-400 font-black uppercase text-xs tracking-widest mb-4">Designer's Note</h4>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto italic font-medium">
                This palette represents a harmonious balance specifically curated for <span className="text-indigo-600 dark:text-indigo-400 underline decoration-2 underline-offset-4 font-black">"{keyword}"</span>. Click any color swatch to copy its HEX code to your clipboard.
              </p>
           </div>
        </div>
      )}

      {!palette && !loading && (
        <div className="grid md:grid-cols-3 gap-8 py-10">
          {['Cyberpunk', 'Warm Nordic', 'High Luxury'].map(term => (
            <button 
                key={term}
                onClick={() => { setKeyword(term); }}
                className="p-10 bg-slate-100/50 dark:bg-slate-900/50 border border-dashed dark:border-slate-800 rounded-[2.5rem] text-slate-400 hover:text-indigo-600 hover:border-indigo-500/50 transition-all font-bold text-lg"
            >
                Start with "{term}"
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodBoard;
