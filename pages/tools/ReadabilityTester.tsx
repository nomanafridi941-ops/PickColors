import React, { useState } from 'react';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
// ...existing code...
import RelatedTools from '../../components/RelatedTools';
import FAQList from '../../components/FAQList';
import { TOOLS } from '../../constants';

const ReadabilityTester: React.FC = () => {
  const [bg, setBg] = useState('#FFFFFF');
  const [fg, setFg] = useState('#1E293B');
  const [fontSize, setFontSize] = useState(16);

  return (
    <>
      <SEOHead 
        title="Readability Tester"
        description="Preview text readability across different sizes and backgrounds. Test color combinations for readability."
        url="/tools/readability"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Readability Tester — PickColors",
            "url": "https://pickcolors.xyz/tools/readability",
            "applicationCategory": "DesignTool",
            "operatingSystem": "Web",
            "description": "Preview text readability across sizes and backgrounds.",
            "image": "https://pickcolors.xyz/og-image.png"
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {"@type": "Question","name": "What does the Readability Tester check?","acceptedAnswer": {"@type": "Answer","text": "It previews text across sizes, weights, and color combinations to help evaluate legibility."}},
              {"@type": "Question","name": "Can I adjust font size?","acceptedAnswer": {"@type": "Answer","text": "Yes — use the slider to preview different font sizes from 12px to 72px."}},
              {"@type": "Question","name": "Is this tool free?","acceptedAnswer": {"@type": "Answer","text": "Yes — free to use with no sign-in required."}}
            ]
          }
        ]}
      />
      <div className="max-w-5xl mx-auto py-16 px-4">
      <Breadcrumbs />
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 text-center">
        Text Readability Tester Online
      </h1>
      <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-3xl mx-auto text-center">
        The Readability Tester helps you preview real text across different color combinations, sizes, and font weights so you can make informed typographic choices. Adjust background and foreground colors, change font size with the slider, and instantly see how your content performs in terms of legibility. This tool is built for content editors, designers, and frontend engineers who need to ensure headings, body text, and interface labels are comfortable to read on all devices. Use it alongside the Contrast Checker to validate accessibility thresholds and refine typography choices until they meet both visual and functional standards.
      </p>
      
      {/* ...ad removed... */}

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

      {/* Helper text for copy functionality */}
      <p className="text-xs text-slate-400 mt-2 mb-6">Test readability and copy your color codes with one click.</p>

      <FAQList faqs={[
        { q: 'What is a good font size for body text?', a: '16–18px is recommended for most content.' },
        { q: 'Does this tool check contrast ratios?', a: 'No, use our Contrast Checker for that.' },
        { q: 'Is this tool free?', a: '100% free, no login required.' }
      ]} />

      <RelatedTools items={TOOLS.filter(t => ['readability','contrast','picker','palette'].includes(t.id))} />
    </div>
    </>
  );
};

export default ReadabilityTester;
