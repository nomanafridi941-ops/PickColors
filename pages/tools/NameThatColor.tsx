import React, { useState } from 'react';
import { COLOR_NAMES_MAP } from '../../constants';
import { hexToRgb } from '../../utils/colorUtils';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
// ...existing code...
import RelatedTools from '../../components/RelatedTools';
import FAQList from '../../components/FAQList';
import { TOOLS } from '../../constants';

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
    <>
      <SEOHead 
        title="Name That Color"
        description="Identify names for specific color codes. Find the perfect name for any hex color."
        url="/tools/namer"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Name That Color — PickColors",
            "url": "https://pickcolors.xyz/tools/namer",
            "applicationCategory": "DesignTool",
            "operatingSystem": "Web",
            "description": "Find closest named color for any hex code.",
            "image": "https://pickcolors.xyz/og-image.png"
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {"@type": "Question","name": "How does Name That Color work?","acceptedAnswer": {"@type": "Answer","text": "It compares your hex color against a standard list and returns the closest named color by RGB distance."}},
              {"@type": "Question","name": "Can I use the names in CSS?","acceptedAnswer": {"@type": "Answer","text": "If the name corresponds to a valid CSS color name, you can use it directly in stylesheets."}},
              {"@type": "Question","name": "Is this tool free?","acceptedAnswer": {"@type": "Answer","text": "Yes — free with no login required."}}
            ]
          }
        ]}
      />
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
      <Breadcrumbs />
      {/* ...ad removed... */}
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
        Hex Color Name Finder Online
      </h1>
      <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-3xl mx-auto">
        Find human-friendly names for exact hex colors quickly with Name That Color. Enter a hex code or pick a sample to discover the closest named match from our curated color list. This makes it easier to document palettes, communicate colors with teammates, or use descriptive names in style guides and documentation. The matcher calculates color distance in RGB space and returns the most similar color name along with the hex code so you can copy either value for use in your project. Perfect for designers, developers, and content teams who prefer meaningful labels over raw hex values when collaborating on brand and UI work.
      </p>
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
      {/* Helper text for copy functionality */}
      <p className="text-xs text-slate-400 mt-2 mb-6">Copy the color name or code with one click.</p>
      <FAQList faqs={[
        { q: 'How accurate are the color names?', a: 'The tool finds the closest match from a standard color list.' },
        { q: 'Can I use these names in CSS?', a: 'Yes, if the name is a valid CSS color name.' },
        { q: 'Is this tool free?', a: '100% free, no login required.' }
      ]} />

      <RelatedTools items={TOOLS.filter(t => ['picker','css-names','harmonies','palette'].includes(t.id))} />
    </div>
    </>
  );
};

export default NameThatColor;
