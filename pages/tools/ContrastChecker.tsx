import React, { useState, useEffect } from 'react';
import { hexToRgb, getContrastRatio } from '../../utils/colorUtils';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';

// Added interface to support fullAudit prop from route configuration
interface ContrastCheckerProps {
  fullAudit?: boolean;
}

const ContrastChecker: React.FC<ContrastCheckerProps> = ({ fullAudit }) => {
  const [fg, setFg] = useState('#FFFFFF');
  const [bg, setBg] = useState('#6366F1');
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    const rgb1 = hexToRgb(fg);
    const rgb2 = hexToRgb(bg);
    setRatio(getContrastRatio(rgb1, rgb2));
  }, [fg, bg]);

  const getStatus = (target: number) => ratio >= target ? 'PASS' : 'FAIL';

  return (
    <>
      <SEOHead 
        title="Contrast Checker"
        description="Test color accessibility based on WCAG guidelines. Check color contrast ratios for web accessibility compliance."
        url="/tools/contrast"
      />
      <div className="max-w-5xl mx-auto py-16 px-4">
      <Breadcrumbs />
      <div className="text-center mb-16">
        {/* SEO-optimized H1 and intro */}
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
          Color Contrast Checker for Accessibility
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
          Instantly test and improve your color combinations for web accessibility. This free online contrast checker helps designers and developers ensure their text and backgrounds meet WCAG 2.1 standards for readability and compliance.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Foreground (Text)</label>
            <div className="flex gap-4">
              <input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-16 h-16 p-0 border-none rounded-2xl cursor-pointer" />
              <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono">#</span>
                  <input type="text" value={fg.replace('#', '')} onChange={e => setFg('#' + e.target.value)} className="w-full pl-8 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl font-mono focus:ring-2 focus:ring-indigo-500 outline-none uppercase text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>
          
          <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Background</label>
            <div className="flex gap-4">
              <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-16 h-16 p-0 border-none rounded-2xl cursor-pointer" />
              <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono">#</span>
                  <input type="text" value={bg.replace('#', '')} onChange={e => setBg('#' + e.target.value)} className="w-full pl-8 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl font-mono focus:ring-2 focus:ring-indigo-500 outline-none uppercase text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center items-center bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 border border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-500/5">
          <div className="text-8xl font-black text-indigo-600 dark:text-indigo-400 mb-4 tracking-tighter">{ratio.toFixed(2)}</div>
          <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-sm mb-12">Contrast Ratio</p>
          
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-700 dark:text-slate-300">WCAG AA (Small Text)</span>
              <span className={`px-4 py-1.5 rounded-lg text-xs font-black tracking-widest ${ratio >= 4.5 ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>{getStatus(4.5)}</span>
            </div>
            <div className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-700 dark:text-slate-300">WCAG AAA (Small Text)</span>
              <span className={`px-4 py-1.5 rounded-lg text-xs font-black tracking-widest ${ratio >= 7 ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>{getStatus(7)}</span>
            </div>
            {/* Conditional extra checks for fullAudit mode */}
            {fullAudit && (
              <>
                <div className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-slate-700 dark:text-slate-300">WCAG AA (Large Text)</span>
                  <span className={`px-4 py-1.5 rounded-lg text-xs font-black tracking-widest ${ratio >= 3 ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>{getStatus(3)}</span>
                </div>
                <div className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-slate-700 dark:text-slate-300">WCAG AAA (Large Text)</span>
                  <span className={`px-4 py-1.5 rounded-lg text-xs font-black tracking-widest ${ratio >= 4.5 ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>{getStatus(4.5)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div 
        className="p-16 rounded-[3rem] border border-black/5 dark:border-white/5 shadow-2xl transition-all duration-500"
        style={{ backgroundColor: bg, color: fg }}
      >
        <h3 className="text-4xl font-black mb-6 tracking-tight">Real-world Preview</h3>
        <p className="text-xl leading-relaxed max-w-3xl opacity-90">
          This preview simulates how your text will look against the chosen background. 
          Legibility is critical for accessibility. If you see a "FAIL" status, try adjusting your 
          colors to be either lighter (for foreground) or darker (for background) until you 
          achieve a pass for your target compliance level.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-current opacity-10 rounded-xl font-bold">Button Example</button>
            <div className="flex items-center gap-2 font-medium underline decoration-2 underline-offset-4">Sample Link</div>
        </div>
      </div>
      {/* SEO Content Section */}
      <section className="prose prose-indigo dark:prose-invert max-w-3xl mx-auto my-12">
        <h2>What is a Color Contrast Checker?</h2>
        <p>The Color Contrast Checker is a tool that calculates the contrast ratio between two colors—usually text and background. It helps you meet accessibility guidelines so everyone, including people with visual impairments, can read your content easily. No more guessing if your colors are accessible—just test and adjust!</p>
        <h2>Who Should Use This Tool?</h2>
        <ul>
          <li><strong>Web designers</strong>—to ensure readable UI and branding</li>
          <li><strong>Frontend developers</strong>—to pass accessibility audits</li>
          <li><strong>Content creators</strong>—to make sure text stands out</li>
          <li><strong>Agencies & teams</strong>—for client compliance</li>
        </ul>
        <h2>How to Use the Contrast Checker</h2>
        <ol>
          <li>Pick your foreground (text) and background colors.</li>
          <li>See the contrast ratio update instantly.</li>
          <li>Check if your combination passes WCAG AA/AAA standards.</li>
          <li>Adjust colors until you see “PASS” for your target level.</li>
        </ol>
        <h2>Common Mistakes to Avoid</h2>
        <ul>
          <li>Using light gray text on white backgrounds</li>
          <li>Ignoring contrast for disabled or secondary text</li>
          <li>Not testing in both light and dark modes</li>
        </ul>
        <h2>FAQs</h2>
        <ul>
          <li><strong>Q:</strong> What is a good contrast ratio?<br/><strong>A:</strong> 4.5:1 for normal text, 3:1 for large text (WCAG AA).</li>
          <li><strong>Q:</strong> Does this tool support transparency?<br/><strong>A:</strong> No, only solid colors are supported.</li>
          <li><strong>Q:</strong> Is this checker free to use?<br/><strong>A:</strong> Yes, it’s 100% free and requires no login.</li>
          <li><strong>Q:</strong> Can I use this for images?<br/><strong>A:</strong> This tool is for solid color pairs only. For images, use our <a href="/tools/extractor">Image Color Extractor</a>.</li>
        </ul>
      </section>
      {/* Helper text for copy functionality */}
      <p className="text-xs text-slate-400 mt-2 mb-6">Copy color codes for your accessible designs with one click.</p>
      {/* Related Color Tools Section */}
      <section className="max-w-3xl mx-auto my-16">
        <h2 className="text-2xl font-bold mb-4">Related Color Tools</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          <li><a href="/tools/picker" className="text-indigo-600 hover:underline">Pick and convert colors with our Color Picker</a></li>
          <li><a href="/tools/gradient" className="text-indigo-600 hover:underline">Design gradients with accessible contrast</a></li>
          <li><a href="/tools/readability" className="text-indigo-600 hover:underline">Test text readability for any color</a></li>
          <li><a href="/tools/palette" className="text-indigo-600 hover:underline">Generate accessible color palettes</a></li>
        </ul>
      </section>
      </div>
    </>
  );
};

export default ContrastChecker;
