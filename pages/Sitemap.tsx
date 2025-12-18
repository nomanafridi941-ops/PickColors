import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../constants';
import { ToolCategory } from '../types';

const Sitemap: React.FC = () => {
  const categories: ToolCategory[] = ['Design Tools', 'Converters', 'Accessibility', 'Image Tools', 'Discovery'];

  return (
    <div className="max-w-6xl mx-auto py-24 px-4">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-black mb-6 tracking-tight">Sitemap</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          A complete directory of all professional color tools and resources available on PickColors.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
        <section className="space-y-8">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 mb-6">Main Navigation</h2>
            <ul className="space-y-4">
              <li><Link to="/" className="text-slate-700 dark:text-slate-200 hover:text-indigo-600 font-bold transition-colors">Home Page</Link></li>
              <li><Link to="/about" className="text-slate-700 dark:text-slate-200 hover:text-indigo-600 font-bold transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-700 dark:text-slate-200 hover:text-indigo-600 font-bold transition-colors">Contact & Support</Link></li>
              <li><Link to="/privacy" className="text-slate-700 dark:text-slate-200 hover:text-indigo-600 font-bold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-700 dark:text-slate-200 hover:text-indigo-600 font-bold transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </section>

        {categories.map((cat) => (
          <section key={cat} className="space-y-8">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 mb-6">{cat}</h2>
              <ul className="space-y-4">
                {TOOLS.filter(t => t.category === cat).map(tool => (
                  <li key={tool.id}>
                    <Link to={tool.path} className="group flex flex-col">
                      <span className="text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 font-bold transition-colors">
                        {tool.name}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{tool.description.substring(0, 50)}...</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-24 p-12 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border dark:border-slate-800 text-center">
        <p className="text-slate-500 font-medium">
          Can't find what you're looking for? <Link to="/contact" className="text-indigo-600 font-bold hover:underline">Request a tool</Link>.
        </p>
      </div>
    </div>
  );
};

export default Sitemap;