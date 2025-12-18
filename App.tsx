import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

// Tool Pages (Lazy load for performance)
const ColorPicker = React.lazy(() => import('./pages/tools/ColorPicker'));
const GradientGenerator = React.lazy(() => import('./pages/tools/GradientGenerator'));
const ContrastChecker = React.lazy(() => import('./pages/tools/ContrastChecker'));
const MoodBoard = React.lazy(() => import('./pages/tools/MoodBoard'));
const ColorHarmonies = React.lazy(() => import('./pages/tools/ColorHarmonies'));
const ImageExtractor = React.lazy(() => import('./pages/tools/ImageExtractor'));
const RandomPalette = React.lazy(() => import('./pages/tools/RandomPalette'));
const NameThatColor = React.lazy(() => import('./pages/tools/NameThatColor'));
const ColorFinder = React.lazy(() => import('./pages/tools/ColorFinder'));
const ReadabilityTester = React.lazy(() => import('./pages/tools/ReadabilityTester'));
const CssColorNames = React.lazy(() => import('./pages/tools/CssColorNames'));
const Sitemap = React.lazy(() => import('./pages/Sitemap'));

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Privacy = () => (
  <div className="max-w-3xl mx-auto py-20 px-4 prose dark:prose-invert">
    <h1>Privacy Policy</h1>
    <p>Last updated: June 2024</p>
    <p>PickColors is designed as a privacy-first utility. All processing is done locally in your browser.</p>
  </div>
);

const Terms = () => (
  <div className="max-w-3xl mx-auto py-20 px-4 prose dark:prose-invert">
    <h1>Terms of Service</h1>
    <p>By using PickColors, you agree to use these tools for lawful purposes only. Tools are provided "as-is".</p>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/sitemap" element={<Sitemap />} />
            
            {/* 16 Pro Tools Implementation */}
            <Route path="/tools/picker" element={<ColorPicker />} />
            <Route path="/tools/gradient" element={<GradientGenerator />} />
            <Route path="/tools/contrast" element={<ContrastChecker />} />
            <Route path="/tools/mood" element={<MoodBoard />} />
            <Route path="/tools/harmonies" element={<ColorHarmonies />} />
            <Route path="/tools/extractor" element={<ImageExtractor />} />
            <Route path="/tools/palette" element={<RandomPalette />} />
            <Route path="/tools/palette-url" element={<ImageExtractor useUrl={true} />} />
            <Route path="/tools/namer" element={<NameThatColor />} />
            <Route path="/tools/finder" element={<ColorFinder />} />
            <Route path="/tools/readability" element={<ReadabilityTester />} />
            <Route path="/tools/css-names" element={<CssColorNames />} />
            <Route path="/tools/hex-to-rgb" element={<ColorPicker initialMode="hex" />} />
            <Route path="/tools/rgb-to-hex" element={<ColorPicker initialMode="rgb" />} />
            <Route path="/tools/hsl-converter" element={<ColorPicker initialMode="hsl" />} />
            <Route path="/tools/accessibility-checker" element={<ContrastChecker fullAudit={true} />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;