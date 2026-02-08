import React, { useState } from 'react';
import { COLOR_NAMES_MAP } from '../../constants';
import { hexToRgb } from '../../utils/colorUtils';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import ToolsAdRow from '../../components/Ads/ToolsAdRow';

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
      <ToolsAdRow />
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
      {/* SEO Content Section */}
      <section className="prose prose-indigo dark:prose-invert max-w-3xl mx-auto my-12">
        <h2>What is a Color Name Finder?</h2>
        <p>The Color Name Finder matches any hex color code to the closest named color in a standard color list. It’s perfect for designers, developers, and anyone who wants to use or reference named colors in CSS, design systems, or branding guidelines.</p>
        <h2>Who Should Use This Tool?</h2>
        <ul>
          <li><strong>Designers</strong>—for matching brand or UI colors to standard names</li>
          <li><strong>Developers</strong>—for using named colors in CSS or code</li>
          <li><strong>Marketers</strong>—for campaign and ad color consistency</li>
          <li><strong>Students & hobbyists</strong>—for learning about color names</li>
        </ul>
        <h2>How to Use the Color Name Finder</h2>
        <ol>
          <li>Pick a color using the color input or enter a hex code.</li>
          <li>See the closest color name and the hex code displayed instantly.</li>
          <li>Copy the name or code for use in your project.</li>
        </ol>
        <h2>Common Mistakes to Avoid</h2>
        <ul>
          <li>Using non-standard hex codes (always use #RRGGBB format)</li>
          <li>Assuming all colors have a perfect name match</li>
          <li>Not checking color contrast for accessibility</li>
        </ul>
        <h2>FAQs</h2>
        <ul>
          <li><strong>Q:</strong> How accurate are the color names?<br/><strong>A:</strong> The tool finds the closest match from a standard color list.</li>
          <li><strong>Q:</strong> Can I use these names in CSS?<br/><strong>A:</strong> Yes, if the name is a valid CSS color name.</li>
          <li><strong>Q:</strong> Is this tool free?<br/><strong>A:</strong> 100% free, no login required.</li>
          <li><strong>Q:</strong> Can I find names for any color?<br/><strong>A:</strong> The tool will always show the closest match, even if not exact.</li>
        </ul>
      </section>
      {/* Related Color Tools Section */}
      <section className="max-w-3xl mx-auto my-16">
        <h2 className="text-2xl font-bold mb-4">Related Color Tools</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          <li><a href="/tools/picker" className="text-indigo-600 hover:underline">Pick and convert colors with our Color Picker</a></li>
          <li><a href="/tools/css-names" className="text-indigo-600 hover:underline">Browse all CSS color names</a></li>
          <li><a href="/tools/harmonies" className="text-indigo-600 hover:underline">Create harmonious color schemes</a></li>
          <li><a href="/tools/palette" className="text-indigo-600 hover:underline">Generate custom color palettes</a></li>
        </ul>
      </section>
    </div>
    </>
  );
};

export default NameThatColor;
