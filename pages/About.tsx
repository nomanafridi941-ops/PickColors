import React from 'react';
import SEOHead from '../components/SEOHead';

const About: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="About PickColors"
        description="Learn about PickColors - a suite of free, high-quality color tools for designers and developers. Fast, accurate, and completely privacy-first."
        url="/about"
      />
      <div className="max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
        About PickColors: Free Online Color Tools
      </h1>
      <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
        PickColors is a suite of free, high-quality color tools for designers and developers. Built for speed, privacy, and accuracy—no logins, no paywalls, just pure color utility.
      </p>
      <div className="prose prose-indigo max-w-none text-gray-600 space-y-6">
        <p className="text-xl text-gray-900 font-medium">
          PickColors was created with one simple mission: to provide fast, high-quality color tools for designers and developers, completely free of charge.
        </p>
        <p>
          We know that design workflows can often be interrupted by clunky apps, forced signups, or paywalled features. That's why every tool on PickColors is designed to run entirely in your web browser, requiring no accounts or installations.
        </p>
        <p>
          From basic color picking to advanced AI-assisted mood boarding, our goal is to be the utility belt for your visual creative process. We focus on speed, accessibility, and clean UI to make sure you get the codes and palettes you need as quickly as possible.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-12">Who Built PickColors?</h2>
        <p>
          PickColors was created and is maintained by a small team of passionate frontend engineers and designers who believe in open, accessible tools for the creative community. We are committed to keeping PickColors fast, ad-light, and privacy-first.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-12">Why Does PickColors Exist?</h2>
        <p>
          We know that design workflows can often be interrupted by clunky apps, forced signups, or paywalled features. That's why every tool on PickColors is designed to run entirely in your web browser, requiring no accounts or installations. Our mission is to empower creators with instant, reliable color utilities.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-12">How Do We Handle Your Data?</h2>
        <p>
          PickColors does not collect, store, or sell your personal data. All color calculations and conversions happen locally in your browser. We use minimal analytics (Google Analytics) to understand site usage, but never track individuals or share data with third parties.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-12">Who is it for?</h2>
        <ul className="list-disc pl-5">
          <li><strong>UI/UX Designers:</strong> Quickly check contrast and generate accessible palettes.</li>
          <li><strong>Web Developers:</strong> Effortlessly convert between HEX, RGB, and HSL.</li>
          <li><strong>Brand Strategists:</strong> Use AI to brainstorm thematic color schemes.</li>
          <li><strong>Artists & Creators:</strong> Extract inspiration from photos and images.</li>
        </ul>
      </div>
      </div>
    </>
  );
};

export default About;
