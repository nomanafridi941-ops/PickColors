import React, { useState } from 'react';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';

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
      />
      <div className="max-w-5xl mx-auto py-16 px-4">
      <Breadcrumbs />
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 text-center">
        Text Readability Tester Online
      </h1>
      <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto text-center">
        Instantly preview and test text readability across different font sizes, colors, and backgrounds. This free online readability tester helps designers and developers ensure their content is easy to read for everyone.
      </p>
      
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

      {/* SEO Content Section */}
      <section className="prose prose-indigo dark:prose-invert max-w-3xl mx-auto my-12">
        <h2>What is a Readability Tester?</h2>
        <p>The Readability Tester lets you preview how text looks with different color and size combinations. It’s perfect for designers, developers, and content creators who want to make sure their websites and apps are easy to read for all users.</p>
        <h2>Who Should Use This Tool?</h2>
        <ul>
          <li><strong>Designers</strong>—for testing typography and color contrast</li>
          <li><strong>Developers</strong>—for UI and accessibility checks</li>
          <li><strong>Content creators</strong>—for blog and article readability</li>
          <li><strong>Marketers</strong>—for campaign and ad copy clarity</li>
        </ul>
        <h2>How to Use the Readability Tester</h2>
        <ol>
          <li>Pick background and text colors using the color pickers.</li>
          <li>Adjust the font size slider to preview different sizes.</li>
          <li>Read the sample text and check for clarity and comfort.</li>
        </ol>
        <h2>Common Mistakes to Avoid</h2>
        <ul>
          <li>Using low-contrast color combinations</li>
          <li>Choosing font sizes that are too small for mobile</li>
          <li>Not testing in both light and dark modes</li>
        </ul>
        <h2>FAQs</h2>
        <ul>
          <li><strong>Q:</strong> What is a good font size for body text?<br/><strong>A:</strong> 16–18px is recommended for most content.</li>
          <li><strong>Q:</strong> Does this tool check contrast ratios?<br/><strong>A:</strong> No, use our <a href="/tools/contrast">Contrast Checker</a> for that.</li>
          <li><strong>Q:</strong> Is this tool free?<br/><strong>A:</strong> 100% free, no login required.</li>
          <li><strong>Q:</strong> Can I use custom fonts?<br/><strong>A:</strong> This tool previews with the site’s default font.</li>
        </ul>
      </section>
      {/* Related Color Tools Section */}
      <section className="max-w-3xl mx-auto my-16">
        <h2 className="text-2xl font-bold mb-4">Related Color Tools</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          <li><a href="/tools/contrast" className="text-indigo-600 hover:underline">Check color contrast for accessibility</a></li>
          <li><a href="/tools/picker" className="text-indigo-600 hover:underline">Pick and convert colors with our Color Picker</a></li>
          <li><a href="/tools/palette" className="text-indigo-600 hover:underline">Generate custom color palettes</a></li>
          <li><a href="/tools/harmonies" className="text-indigo-600 hover:underline">Create harmonious color schemes</a></li>
        </ul>
      </section>
    </div>
    </>
  );
};

export default ReadabilityTester;
