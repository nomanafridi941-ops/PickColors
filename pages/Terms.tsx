import React from 'react';
import SEOHead from '../components/SEOHead';

const Terms: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Terms of Service"
        description="Read the PickColors terms of service. Use our free color tools responsibly and at your own risk."
        url="/terms"
      />
      <div className="max-w-4xl mx-auto py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">Terms of Service</h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
          By using PickColors, you agree to these terms. Please read them carefully.
        </p>
        <div className="prose prose-indigo dark:prose-invert max-w-none text-gray-600 space-y-6">
          <h2>Use of Service</h2>
          <p>PickColors is a free suite of color tools for designers and developers. You may use our tools for personal or commercial projects, but you may not resell or redistribute the tools themselves.</p>
          <h2>No Warranty</h2>
          <p>All tools are provided "as is" without warranty of any kind. We strive for accuracy, but cannot guarantee results for every use case. Use at your own risk.</p>
          <h2>Intellectual Property</h2>
          <p>All content and code on PickColors is the property of the site owners unless otherwise stated. You may not copy or reproduce the site design or code without permission.</p>
          <h2>Changes to Terms</h2>
          <p>We may update these terms at any time. Continued use of PickColors means you accept the latest version.</p>
          <h2>Contact</h2>
          <p>Questions? Email <a href="mailto:pickcolors86@gmail.com">pickcolors86@gmail.com</a>.</p>
        </div>
      </div>
    </>
  );
};

export default Terms;
