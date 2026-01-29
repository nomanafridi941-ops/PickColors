import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BREADCRUMB_LABELS: Record<string, string> = {
  'tools': 'Color Tools',
  'picker': 'Color Picker',
  'gradient': 'Gradient Generator',
  'contrast': 'Contrast Checker',
  'mood': 'Mood Board',
  'harmonies': 'Color Harmonies',
  'extractor': 'Image Extractor',
  'palette': 'Palette Generator',
  'namer': 'Name That Color',
  'finder': 'Color Finder',
  'readability': 'Readability Tester',
  'css-names': 'CSS Color Names',
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;
  let path = '';
  return (
    <nav className="text-xs mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
        <li>
          <Link to="/" className="hover:text-indigo-600">Home</Link>
        </li>
        {segments.map((seg, i) => {
          path += '/' + seg;
          const isLast = i === segments.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              <span>/</span>
              {isLast ? (
                <span className="font-bold text-slate-700 dark:text-slate-200">{BREADCRUMB_LABELS[seg] || seg}</span>
              ) : (
                <Link to={path} className="hover:text-indigo-600">{BREADCRUMB_LABELS[seg] || seg}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
