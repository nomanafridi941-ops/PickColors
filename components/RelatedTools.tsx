import React from 'react';
import { Link } from 'react-router-dom';

type ToolItem = { id: string; name: string; path: string; description?: string; icon?: React.ReactNode };

const RelatedTools: React.FC<{ items: ToolItem[]; title?: string }> = ({ items, title = 'Related Color Tools' }) => {
  return (
    <section className="max-w-3xl mx-auto my-16">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <ul className="grid md:grid-cols-2 gap-4">
        {items.map(item => (
          <li key={item.id} className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex items-start gap-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-xl">{item.icon || '🎨'}</div>
            <div>
              <Link to={item.path} className="font-bold text-slate-900 dark:text-white block">{item.name}</Link>
              {item.description && <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedTools;
