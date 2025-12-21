
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
      <h1 className="text-4xl font-bold mb-8">About PickColors</h1>
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
        <h2 className="text-2xl font-bold text-gray-900 mt-12">Who is it for?</h2>
        <ul className="list-disc pl-5">
          <li><strong>UI/UX Designers:</strong> Quickly check contrast and generate accessible palettes.</li>
          <li><strong>Web Developers:</strong> Effortlessly convert between HEX, RGB, and HSL.</li>
          <li><strong>Brand Strategists:</strong> Use AI to brainstorm thematic color schemes.</li>
          <li><strong>Artists & Creators:</strong> Extract inspiration from photos and images.</li>
        </ul>
      </div>
    </>
  );
};

export default About;
