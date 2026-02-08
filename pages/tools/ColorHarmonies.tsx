import React, { useState, useMemo } from 'react';
import { getHarmonies } from '../../utils/colorUtils';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import ToolsAdRow from '../../components/Ads/ToolsAdRow';

const ColorHarmonies: React.FC = () => {
  const [baseColor, setBaseColor] = useState('#6366F1');
  const harmonies = useMemo(() => getHarmonies(baseColor), [baseColor]);

  const HarmonySection = ({ title, colors }: { title: string, colors: string[] }) => (
    <div className="mb-12">
      <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-500 mb-4">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {colors.map((c, i) => (
          <div key={i} className="group relative">
            <div 
              className="h-32 w-full rounded-2xl shadow-sm group-hover:shadow-lg transition-all border border-black/5 dark:border-white/5"
              style={{ backgroundColor: c }}
            />
            <div className="mt-2 text-center">
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">{c}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(c)}
                className="block w-full text-[10px] text-indigo-600 dark:text-indigo-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToolsAdRow />
    </div>
  );

  return (
    <>
      <SEOHead 
        title="Color Harmonies"
        description="Discover perfect color combinations using color theory. Generate harmonies like complementary, analogous, and triadic palettes."
        url="/tools/harmonies"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {"@type": "Question","name": "What are color harmonies?","acceptedAnswer": {"@type": "Answer","text": "Color harmonies are combinations derived from the color wheel that work well together, such as complementary, analogous, and triadic schemes."}},
            {"@type": "Question","name": "Can I use these palettes in my designs?","acceptedAnswer": {"@type": "Answer","text": "Yes — copy any generated color code and paste into your CSS or design tool."}},
            {"@type": "Question","name": "Is this tool free?","acceptedAnswer": {"@type": "Answer","text": "Yes — it’s free to use with no account required."}}
          ]
        }}
      />
      <div className="max-w-6xl mx-auto py-16 px-4">
      <Breadcrumbs />
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
          Color Harmonies Generator Online
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-3xl mx-auto">
          Use our Color Harmonies Generator to create balanced, professional color palettes based on established color theory principles. Start with a base color and instantly explore complementary, analogous, triadic, split-complementary, and tetradic combinations that work together visually. Each generated palette includes precise HEX values so you can copy them directly into stylesheets, design systems, or prototyping tools. The tool is designed to speed up creative workflows: experiment quickly, compare options side-by-side, and lock or copy colors with a single click. Ideal for UI designers, brand teams, and developers who want predictable, harmonious color systems without the guesswork. Accessibility and contrast considerations are simple to integrate — use related tools on PickColors to verify contrast and readability for any palette you create.
        </p>
      </div>

      <HarmonySection title="Complementary" colors={harmonies.complementary} />
      <HarmonySection title="Analogous" colors={harmonies.analogous} />
      <HarmonySection title="Triadic" colors={harmonies.triadic} />
      <HarmonySection title="Split Complementary" colors={harmonies.splitComplementary} />
      <HarmonySection title="Tetradic" colors={harmonies.tetradic} />

      {/* Helper text for copy functionality */}
      <p className="text-xs text-slate-400 mt-2 mb-6">Copy any harmony color code with one click.</p>

      {/* SEO Content Section */}
      <section className="prose prose-indigo dark:prose-invert max-w-3xl mx-auto my-12">
        <h2>What is a Color Harmonies Generator?</h2>
        <p>The Color Harmonies Generator is a tool that uses color theory to create beautiful, balanced color palettes. It shows you combinations like complementary, analogous, triadic, and tetradic, so you can design with confidence and creativity. No more guessing which colors work together—just pick a base color and explore!</p>
        <h2>Who Should Use This Tool?</h2>
        <ul>
          <li><strong>Designers</strong>—for branding, UI, and illustration</li>
          <li><strong>Developers</strong>—for CSS and theme creation</li>
          <li><strong>Artists</strong>—for digital and print artwork</li>
          <li><strong>Marketers</strong>—for campaign and ad color schemes</li>
        </ul>
        <h2>How to Use the Color Harmonies Generator</h2>
        <ol>
          <li>Pick a base color using the color input or HEX code.</li>
          <li>View the generated harmonies: complementary, analogous, triadic, and more.</li>
          <li>Copy any color code with one click for your project.</li>
        </ol>
        <h2>Common Mistakes to Avoid</h2>
        <ul>
          <li>Using too many colors in one palette</li>
          <li>Ignoring color contrast for accessibility</li>
          <li>Not testing palettes in both light and dark modes</li>
        </ul>
        <h2>FAQs</h2>
        <ul>
          <li><strong>Q:</strong> What are color harmonies?<br/><strong>A:</strong> Harmonies are color combinations that look good together, based on color wheel relationships.</li>
          <li><strong>Q:</strong> Can I use these palettes in CSS?<br/><strong>A:</strong> Yes! All codes are CSS-ready.</li>
          <li><strong>Q:</strong> Is this tool free?<br/><strong>A:</strong> 100% free, no login required.</li>
          <li><strong>Q:</strong> Can I export palettes?<br/><strong>A:</strong> Copy any color code, or use our <a href="/tools/palette">Palette Generator</a> for advanced export options.</li>
        </ul>
      </section>
      {/* Related Color Tools Section */}
      <section className="max-w-3xl mx-auto my-16">
        <h2 className="text-2xl font-bold mb-4">Related Color Tools</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          <li><a href="/tools/picker" className="text-indigo-600 hover:underline">Pick and convert colors with our Color Picker</a></li>
          <li><a href="/tools/palette" className="text-indigo-600 hover:underline">Generate custom color palettes</a></li>
          <li><a href="/tools/contrast" className="text-indigo-600 hover:underline">Check color contrast for accessibility</a></li>
          <li><a href="/tools/hsl-converter" className="text-indigo-600 hover:underline">Convert colors to HSL format</a></li>
        </ul>
      </section>
    </div>
    </>
  );
};

export default ColorHarmonies;
