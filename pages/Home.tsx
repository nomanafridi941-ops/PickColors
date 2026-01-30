import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../constants';

import SEOHead from '../components/SEOHead';

const Home: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Free Online Color Tools"
        description="16 High-performance color tools for designers and developers. Pick, convert, and generate palettes with precision. No accounts. No tracking. Pure performance."
        url="/"
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-12 shadow-xl shadow-black/10">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            Professional Series 2025
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter leading-[0.95]">
            Free Online Color Tools for Designers and Developers
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            PickColors is your all-in-one color toolkit for web, UI, and creative work. Instantly pick, convert, and generate color palettes, gradients, and harmonies. Our tools include a HEX/RGB/HSL color picker, CSS gradient generator, contrast checker, palette generator, image color extractor, and more. No accounts, no tracking—just fast, accurate color utilities for every creative workflow.
          </p>
          <p className="text-base text-slate-500 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Trusted by designers, developers, marketers, and students worldwide. Explore our 16+ tools to boost your productivity and creativity—free, forever.
          </p>
          
          <div className="flex flex-wrap justify-center gap-5">
            <a href="#tools" className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:scale-105 transition-all shadow-2xl shadow-indigo-600/30 active:scale-95">
              Launch Toolkit
            </a>
            <Link to="/about" className="px-10 py-5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              Our Vision
            </Link>
          </div>

          {/* 728x90 Banner Ad */}
          <div className="mt-8 flex justify-center">
            <div 
              id="ad-banner-728x90-home" 
              style={{ 
                width: 728, 
                height: 90, 
                background: '#e2e8f0', 
                border: '2px dashed #94a3b8', 
                borderRadius: 12, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#64748b',
                fontSize: 14,
                fontWeight: 600
              }}
            >
              Ad 728x90
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-32 px-4 max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight uppercase tracking-widest text-sm text-indigo-500 mb-6">The Catalog</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold leading-tight">16 Instruments of <br/> High-End Design</h3>
          </div>
          <p className="text-slate-500 text-lg font-medium max-w-xs">
            Every tool is optimized for the V8 engine, delivering near-instant results locally.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TOOLS.map((tool) => (
            <Link 
              key={tool.id} 
              to={tool.path}
              className="group p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50 rounded-[2.5rem] hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-3xl mb-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 grayscale group-hover:grayscale-0">
                {tool.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-3 block opacity-60">{tool.category}</span>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {tool.name}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-slate-950 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">Scientific Fidelity. <br/> Ethical Privacy.</h2>
              <div className="space-y-10">
                {[
                  { icon: '🛡️', title: 'Edge Processing', desc: 'Your creative data is processed at the edge—your browser. We never see your images or colors.' },
                  { icon: '⚡', title: 'WASM Optimized', desc: 'Complex color extractions are handled via WebAssembly for desktop-grade performance.' },
                  { icon: '🎨', title: 'Delta-E Accuracy', desc: 'Contrast and harmonies are calculated using high-precision Delta-E mathematical standards.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-2xl border border-white/10">{item.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative group">
              <div className="aspect-square bg-gradient-to-br from-indigo-500 to-purple-700 rounded-[4rem] overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0"></div>
                <div className="absolute inset-0 flex items-center justify-center p-12 text-center text-white">
                  <div className="space-y-6">
                    <span className="text-8xl block">✨</span>
                    <h4 className="text-4xl font-black tracking-tighter italic">PRO GRADE</h4>
                    <p className="text-sm font-bold opacity-70 tracking-widest uppercase">Trusted by the global creative elite</p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
