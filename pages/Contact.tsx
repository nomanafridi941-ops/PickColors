
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
      <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
      <p className="text-xl text-gray-600 mb-12">
        Have feedback, found a bug, or just want to say hi? We'd love to hear from you.
      </p>
      
      <div className="inline-block p-12 bg-indigo-50 rounded-3xl border border-indigo-100">
        <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">Email Us At</p>
        <a href="mailto:support@pickcolors.xyz" className="text-3xl font-bold text-gray-900 hover:text-indigo-600 transition underline">
          support@pickcolors.xyz
        </a>
      </div>
      
      <div className="mt-16 text-gray-500">
        <p>Follow us for updates and new tools.</p>
        {/* Placeholder for social links */}
      </div>
      </div>
    </>
  );
};

export default Contact;
