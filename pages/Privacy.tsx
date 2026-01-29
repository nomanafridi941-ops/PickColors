import React from 'react';
import SEOHead from '../components/SEOHead';

const Privacy: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Privacy Policy"
        description="Read the PickColors privacy policy. We respect your privacy and never collect personal data."
        url="/privacy"
      />
      <div className="max-w-4xl mx-auto py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">Privacy Policy</h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
          Your privacy matters. PickColors is committed to protecting your data and being transparent about how we use it.
        </p>
        <div className="prose prose-indigo dark:prose-invert max-w-none text-gray-600 space-y-6">
          <h2>What Data Do We Collect?</h2>
          <p>We do <strong>not</strong> collect, store, or sell your personal data. All color calculations and conversions happen locally in your browser. We do not require you to create an account or provide any personal information to use our tools.</p>
          <h2>Analytics</h2>
          <p>We use Google Analytics to understand general site usage and improve our tools. This data is anonymized and never linked to individual users. We do not share analytics data with third parties.</p>
          <h2>Cookies</h2>
          <p>PickColors does not use cookies for tracking or advertising. Any cookies present are strictly necessary for site functionality.</p>
          <h2>Third-Party Services</h2>
          <p>Some tools may use third-party APIs (e.g., Google AI for mood boards). These services are used solely to provide features and are subject to their own privacy policies.</p>
          <h2>Contact</h2>
          <p>If you have questions about our privacy practices, email <a href="mailto:support@pickcolors.xyz">support@pickcolors.xyz</a>.</p>
        </div>
      </div>
    </>
  );
};

export default Privacy;
