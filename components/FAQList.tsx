import React from 'react';

type FAQ = { q: string; a: string };

const FAQList: React.FC<{ faqs: FAQ[] }> = ({ faqs }) => {
  return (
    <section className="prose prose-indigo dark:prose-invert max-w-3xl mx-auto my-12">
      <style>{`details[open] summary svg{transform:rotate(180deg);} summary svg{transition:transform .2s ease}`}</style>
      <h2>FAQs</h2>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <details key={i} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <summary className="cursor-pointer font-bold flex items-center justify-between">
              <span>{f.q}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ml-4 text-slate-400" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <div className="mt-2 text-slate-600 dark:text-slate-300">{f.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQList;
