import React from 'react';

type FAQ = { q: string; a: string };

const FAQList: React.FC<{ faqs: FAQ[] }> = ({ faqs }) => {
  return (
    <section className="prose prose-indigo dark:prose-invert max-w-3xl mx-auto my-12">
      <h2>FAQs</h2>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <details key={i} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <summary className="cursor-pointer font-bold">{f.q}</summary>
            <div className="mt-2 text-slate-600 dark:text-slate-300">{f.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQList;
