import React from 'react';
import SEOHead from '../components/SEOHead';

const Contact: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Contact Us"
        description="Get in touch with PickColors. Have feedback, found a bug, or want to say hi? We'd love to hear from you."
        url="/contact"
      />
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
        Contact PickColors Support
      </h1>
      <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
        Have feedback, found a bug, or want to suggest a new color tool? Reach out to the PickColors team—we’re here to help and always open to ideas from the creative community.
      </p>
      
      <div className="w-full sm:inline-block p-6 sm:p-12 bg-indigo-50 dark:bg-slate-800 rounded-3xl border border-indigo-100 dark:border-slate-700">
        <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">Email Us At</p>
        <a href="mailto:support@pickcolors.xyz" className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 transition underline break-words whitespace-normal">
          support@pickcolors.xyz
        </a>
      </div>
      <div className="mt-16 text-gray-500 dark:text-gray-400">
        <p>Follow us for updates and new tools:</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="https://twitter.com/pickcolorsxyz" target="_blank" rel="noopener" className="hover:text-indigo-600">Twitter/X</a>
          <a href="https://github.com/nomanafridi941-ops/PickColors" target="_blank" rel="noopener" className="hover:text-indigo-600">GitHub</a>
        </div>
      </div>
      </div>
    </>
  );
};

export default Contact;
