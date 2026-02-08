import React from 'react';
import { Link } from 'react-router-dom';

type ToolItem = { id: string; name: string; path: string; description?: string; icon?: React.ReactNode };

const iconFor = (id: string) => {
  const map: Record<string, React.ReactNode> = {
    picker: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z" fill="currentColor" />
      </svg>
    ),
    palette: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a9 9 0 100 18 3 3 0 013-3h2a1 1 0 000-2h-2a3 3 0 01-3-3V4z" fill="currentColor" />
      </svg>
    ),
    harmonies: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7" cy="12" r="2" fill="currentColor" />
        <circle cx="12" cy="6" r="2" fill="currentColor" />
        <circle cx="17" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
    contrast: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3v18A9 9 0 1112 3z" fill="currentColor" />
      </svg>
    ),
    extractor: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3h18v4H3zM6 11h12v10H6z" fill="currentColor" />
      </svg>
    ),
    default: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor" />
      </svg>
    )
  };

  return map[id] || map.default;
};

const RelatedTools: React.FC<{ items: ToolItem[]; title?: string }> = ({ items, title = 'Related Color Tools' }) => {
  return (
    <section className="max-w-3xl mx-auto my-16">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <ul className="grid md:grid-cols-2 gap-4">
        {items.map(item => (
          <li key={item.id} className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex items-start gap-4 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm transition-transform duration-200 group-hover:scale-105">
              {item.icon ? item.icon : iconFor(item.id)}
            </div>
            <div>
              <Link to={item.path} className="font-bold text-slate-900 dark:text-white block hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{item.name}</Link>
              {item.description && <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedTools;
