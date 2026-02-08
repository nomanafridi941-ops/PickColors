import React from 'react';
import { useLocation } from 'react-router-dom';

const SocialBar: React.FC = () => {
  const location = useLocation();
  const url = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      {/* Desktop vertical bar */}
      <div className="hidden lg:flex fixed left-4 top-[180px] z-40 flex-col gap-3">
        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(document.title)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" aria-label="Share on Twitter" className="w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center">t</a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook" className="w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center">f</a>
        <a href={`mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(url)}`} aria-label="Share by Email" className="w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center">@</a>
      </div>

      {/* Mobile compact toggle (bottom-right) */}
      <div className="lg:hidden fixed bottom-24 right-4 z-50">
        <details>
          <summary className="w-12 h-12 bg-white rounded-full shadow flex items-center justify-center">+</summary>
          <div className="mt-2 p-2 bg-white rounded-xl shadow flex flex-col gap-2">
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(document.title)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" className="text-sm">Twitter</a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" className="text-sm">Facebook</a>
            <a href={`mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(url)}`} className="text-sm">Email</a>
          </div>
        </details>
      </div>
    </>
  );
};

export default SocialBar;
