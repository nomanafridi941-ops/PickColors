import React, { useState, useEffect } from 'react';
import { hexToRgb, getContrastRatio } from '../../utils/colorUtils';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import ToolsAdRow from '../../components/Ads/ToolsAdRow';
import RelatedTools from '../../components/RelatedTools';
import FAQList from '../../components/FAQList';
import { TOOLS } from '../../constants';

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
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Contrast Checker — PickColors",
            "url": "https://pickcolors.xyz/tools/contrast",
            "applicationCategory": "DesignTool",
            "operatingSystem": "Web",
            "description": "Check WCAG contrast ratios and get PASS/FAIL guidance.",
            "image": "https://pickcolors.xyz/og-image.png"
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {"@type": "Question","name": "What contrast ratio is required for WCAG AA?","acceptedAnswer": {"@type": "Answer","text": "WCAG AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text."}},
              {"@type": "Question","name": "Can I test transparency?","acceptedAnswer": {"@type": "Answer","text": "This tool currently supports solid colors; for images or transparency use the Image Color Extractor or manual checks."}},
              {"@type": "Question","name": "Is this tool free?","acceptedAnswer": {"@type": "Answer","text": "Yes — free to use with no account needed."}}
            ]
          }
        ]}
      />
      <div className="max-w-5xl mx-auto py-16 px-4">
      <Breadcrumbs />
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
          Color Contrast Checker for Accessibility
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-3xl mx-auto">
          Ensure your color combinations are readable and compliant with WCAG using our Contrast Checker. Enter foreground and background colors to see an instant contrast ratio and pass/fail status for WCAG AA and AAA levels. This tool is designed for frontend developers, product designers, and accessibility auditors who need fast, reliable feedback while they iterate. It provides clear guidance on which combinations will pass accessibility checks and explains acceptable thresholds for normal and large text. Use it alongside our Readability Tester and Palette Generator to design palettes that are both beautiful and accessible. The interface supports copy-ready CSS values and quick adjustments so you can rapidly test alternatives without leaving your design workflow.
        </p>
      </div>
      
      <ToolsAdRow />

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
      <FAQList faqs={[
        { q: 'What is a good contrast ratio?', a: '4.5:1 for normal text, 3:1 for large text (WCAG AA).' },
        { q: 'Does this tool support transparency?', a: 'No, only solid colors are supported. For images, use the Image Color Extractor.' },
        { q: 'Is this checker free to use?', a: 'Yes, it’s 100% free and requires no login.' }
      ]} />

      {/* Helper text for copy functionality */}
      <p className="text-xs text-slate-400 mt-2 mb-6">Copy color codes for your accessible designs with one click.</p>
      <RelatedTools items={TOOLS.filter(t => ['contrast','readability','picker','palette'].includes(t.id))} />
      </div>
    </>
  );
};

export default ContrastChecker;
