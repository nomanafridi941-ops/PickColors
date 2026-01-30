
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TOOLS } from '../constants';
import { ToolCategory } from '../types';


const categories: ToolCategory[] = ['Design Tools', 'Converters', 'Accessibility', 'Image Tools', 'Discovery'];

const LogoMark = () => (
  <div className="relative w-10 h-10 flex-shrink-0 group">
    {/* Refractive Glow */}
    <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500 via-purple-400 to-rose-400 rounded-2xl blur-lg opacity-20 group-hover:opacity-50 transition duration-700"></div>
    
    {/* Glass Container */}
    <div className="relative h-full w-full bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center overflow-hidden border border-white/10 dark:border-slate-200">
      {/* Prism Geometry */}
      <svg className="w-5 h-5 text-white dark:text-slate-900 z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 22H22L12 2Z" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M12 2L12 22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3"/>
        <path d="M12 2L17 12L12 22" stroke="url(#logo-prism)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
        <defs>
          <linearGradient id="logo-prism" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      {/* Reflection shine */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 dark:from-slate-900/5 to-transparent skew-x-[-20deg] -translate-x-4"></div>
    </div>
  </div>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 selection:bg-indigo-500/20">
      <header className="glass border-b border-slate-200 dark:border-slate-800/50 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-4">
            <LogoMark />
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                Pick<span className="text-indigo-600 dark:text-indigo-400">Colors</span>
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 mt-1.5">Creative Suite</span>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-2 font-semibold">
            <Link to="/" className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Home</Link>
            
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                Toolkit
                <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl p-8 grid grid-cols-3 gap-8 ring-1 ring-black/5">
                  {categories.map(cat => (
                    <div key={cat} className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-2 px-2">{cat}</h4>
                      <ul className="space-y-1">
                        {TOOLS.filter(t => t.category === cat).map(tool => (
                          <li key={tool.id}>
                            <Link to={tool.path} className="flex items-center gap-3 p-2.5 hover:bg-indigo-500/5 dark:hover:bg-indigo-500/10 rounded-2xl transition-all group/item">
                              <span className="text-lg grayscale group-hover/item:grayscale-0 transition-all">{tool.icon}</span>
                              <span className="text-[13px] font-bold text-slate-600 dark:text-slate-300 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400">{tool.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/about" className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">About</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              )}
            </button>
            <Link to="/contact" className="hidden sm:flex px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-xl font-bold text-sm hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-black/10">
              Support
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-16 mb-8">

        </div>
      </main>

      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/50 py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between gap-16">
            <div className="max-w-sm">
              <Link to="/" className="group flex items-center gap-4 mb-10">
                <LogoMark />
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">PickColors</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mt-1.5">Creative Suite</span>
                </div>
              </Link>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-10 font-medium">
                The most advanced open-source color workspace. Professional-grade fidelity for the global creative elite.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
              <div className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Toolkit</h4>
                <ul className="space-y-5 text-sm font-semibold">
                  {TOOLS.slice(0, 4).map(t => (
                    <li key={t.id}><Link to={t.path} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors">{t.name}</Link></li>
                  ))}
                  <li><Link to="/sitemap" className="text-indigo-600 font-black">Browse All Tools &rarr;</Link></li>
                </ul>
              </div>
              <div className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Company</h4>
                <ul className="space-y-5 text-sm font-semibold">
                  <li><Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors">Vision</Link></li>
                  <li><Link to="/privacy" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors">Privacy</Link></li>
                  <li><Link to="/terms" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors">Terms</Link></li>
                  <li><Link to="/sitemap" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors">Sitemap</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-24 pt-12 border-t border-slate-100 dark:border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
            <p>&copy; {new Date().getFullYear()} PickColors International</p>
            <div className="flex gap-12">
              <span className="hover:text-slate-600 transition-colors cursor-default">High-Fidelity Engine</span>
              <span className="hover:text-slate-600 transition-colors cursor-default">Privacy Protocol 1.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
