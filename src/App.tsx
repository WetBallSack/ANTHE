import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { useLanguage, Language } from './LanguageContext';
import OverviewTab from './components/OverviewTab';
import SpecificationsTab from './components/SpecificationsTab';
import ShopTab from './components/ShopTab';
import DocumentationTab from './components/DocumentationTab';
import TermsTab from './components/TermsTab';
import DeveloperTab from './components/DeveloperTab';
import AntheLogo from './components/AntheLogo';
import { getTabSeo } from './seo';

declare global {
  interface Window {
    antheLoader?: { done: () => Promise<void> };
  }
}

export type TabKey = 'overview' | 'faq' | 'tutorials' | 'developer' | 'shop' | 'terms' | '404';

function getTabFromPath(path: string): TabKey {
  const clean = path.replace(/\/+$/, '').toLowerCase();
  if (clean === '' || clean === '/' || clean === '/overview') return 'overview';
  if (clean === '/faq' || clean === '/specifications' || clean === '/specs') return 'faq';
  if (clean === '/tutorials' || clean === '/documentation' || clean === '/docs') return 'tutorials';
  if (clean === '/developer' || clean === '/api') return 'developer';
  if (clean === '/shop' || clean === '/pricing' || clean === '/store') return 'shop';
  if (clean === '/terms' || clean === '/eula' || clean === '/license') return 'terms';
  return '404';
}

function getPathForTab(tab: TabKey): string {
  switch (tab) {
    case 'overview': return '/';
    case 'faq': return '/faq';
    case 'tutorials': return '/documentation';
    case 'developer': return '/developer';
    case 'shop': return '/shop';
    case 'terms': return '/terms';
    case '404': return '/404';
    default: return '/';
  }
}

export default function App() {
  // Navigation State with URL path resolution
  const [activeTab, setActiveTab] = useState<TabKey>(() => {
    return getTabFromPath(window.location.pathname);
  });
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const { language, setLanguage, t } = useLanguage();

  const handleTabChange = (tab: TabKey, customPath?: string) => {
    setActiveTab(tab);
    const targetPath = customPath || getPathForTab(tab);
    setCurrentPath(targetPath);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ tab }, '', targetPath);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const tab = getTabFromPath(window.location.pathname);
      setActiveTab(tab);
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Wait one frame so the first real paint is already underneath the loader
    requestAnimationFrame(() => {
      window.antheLoader?.done();
    });
  }, []);

  useEffect(() => {
    if (activeTab === '404') {
      window.location.replace('/404.html?from=' + encodeURIComponent(window.location.pathname));
    }
  }, [activeTab]);

  const seo = getTabSeo(activeTab, language, currentPath);
  const baseUrl = 'https://anthetech.me';
  const canonicalUrl = `${baseUrl}${seo.canonicalPath === '/' ? '' : seo.canonicalPath}`;

  return (
    <div className="min-h-screen text-stone-800 font-sans relative overflow-hidden flex flex-col justify-between selection:bg-amber-100">
      {/* Dynamic SEO Metadata via React Helmet */}
      <Helmet>
        <html lang={language} />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content={seo.robots} />

        {/* Favicons & Touch Icons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
        <link rel="apple-touch-icon-precomposed" sizes="180x180" href="/apple-touch-icon-precomposed.png?v=2" />
        <link rel="mask-icon" href="/favicon.svg?v=2" color="#1C1B19" />

        {/* OpenGraph Metadata */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={language === 'zh' ? '天御 (ANTHE)' : 'ANTHE'} />
        <meta property="og:image" content={`${baseUrl}/godai-mark.svg`} />

        {/* Twitter / X Metadata */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={`${baseUrl}/godai-mark.svg`} />

        {/* Schema.org Structured Data */}
        {seo.schema && (
          <script type="application/ld+json">
            {JSON.stringify(seo.schema)}
          </script>
        )}
      </Helmet>

      {/* Decorative Golden Line Accent top boundary */}
      <div className="h-[2px] w-full bg-gradient-to-r from-stone-250/30 via-stone-405/40 to-stone-250/30 z-50 relative" />

      {/* Aesthetic Top Navigation bar */}
      <header className="relative z-50 py-6 px-4 md:px-8 max-w-7xl mx-auto w-full border-b border-stone-200/40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo / Title brand mark */}
          <button 
            onClick={() => handleTabChange('overview')}
            className="flex items-center gap-3.5 sm:gap-4 hover:opacity-80 transition-opacity text-left cursor-pointer focus:outline-none"
            aria-label="ANTHE Home"
          >
            <AntheLogo size={32} color="#1c1917" />
            <span className="font-serif font-extrabold tracking-widest text-stone-900 hidden sm:inline text-lg select-none">
              {language === 'zh' ? '天御' : 'ANTHE'}
            </span>
          </button>

          {/* Navigation Items (Designed like premium hotel tabs) */}
          <nav className="flex flex-wrap items-center gap-1 bg-white/70 border border-stone-200/50 p-1.5 rounded-2xl sm:rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.01)] relative overflow-hidden backdrop-blur-lg justify-center transform-gpu">
            <button
              onClick={() => handleTabChange('overview')}
              className={`px-3.5 sm:px-5 py-2 rounded-full text-xs font-serif font-medium tracking-wide transition-all cursor-pointer ${
                activeTab === 'overview' 
                  ? 'bg-gradient-to-b from-stone-900 to-stone-950 text-[#fbfaf7] shadow-md shadow-stone-900/10' 
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {t.nav.overview}
            </button>
            <button
              onClick={() => handleTabChange('faq')}
              className={`px-3.5 sm:px-5 py-2 rounded-full text-xs font-serif font-medium tracking-wide transition-all cursor-pointer ${
                activeTab === 'faq' 
                  ? 'bg-gradient-to-b from-stone-900 to-stone-950 text-[#fbfaf7] shadow-md shadow-stone-900/10' 
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {t.nav.faq}
            </button>
            <button
              onClick={() => handleTabChange('tutorials')}
              className={`px-3.5 sm:px-5 py-2 rounded-full text-xs font-serif font-medium tracking-wide transition-all cursor-pointer ${
                activeTab === 'tutorials' 
                  ? 'bg-gradient-to-b from-stone-900 to-stone-950 text-[#fbfaf7] shadow-md shadow-stone-900/10' 
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {t.nav.tutorials}
            </button>
            <button
              onClick={() => handleTabChange('developer')}
              className={`px-3.5 sm:px-5 py-2 rounded-full text-xs font-serif font-medium tracking-wide transition-all cursor-pointer ${
                activeTab === 'developer' 
                  ? 'bg-gradient-to-b from-stone-900 to-stone-950 text-[#fbfaf7] shadow-md shadow-stone-900/10' 
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {t.nav.developer}
            </button>
            <button
              onClick={() => handleTabChange('shop')}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs font-serif font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === 'shop' 
                  ? 'bg-gradient-to-b from-stone-900 to-stone-950 text-[#fbfaf7] shadow-md shadow-stone-900/10' 
                  : 'text-[#8c7853] hover:text-[#5c4e36] bg-[#fbfbf9]/60 hover:bg-[#fbfbf9]'
              }`}
            >
              {t.nav.shop}
            </button>
          </nav>

          {/* Premium Language Dropdown / Switches */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full text-[10px] uppercase font-mono tracking-wider border border-stone-200 shadow-inner z-20">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${language === 'en' ? 'bg-stone-900 text-white font-bold' : 'text-stone-500 hover:text-stone-800'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('zh')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${language === 'zh' ? 'bg-stone-900 text-white font-bold' : 'text-stone-500 hover:text-stone-800'}`}
            >
              中文
            </button>
            <button 
              onClick={() => setLanguage('ja')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${language === 'ja' ? 'bg-stone-900 text-white font-bold' : 'text-stone-500 hover:text-stone-800'}`}
            >
              日本語
            </button>
          </div>

        </div>
      </header>

      {/* MAIN LAYOUT WRAPPER */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-10 md:py-16 relative z-10 flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div key="overview" className="w-full">
              <OverviewTab onTabChange={handleTabChange} />
            </motion.div>
          )}

          {activeTab === 'faq' && (
            <motion.div key="specs" className="w-full">
              <SpecificationsTab />
            </motion.div>
          )}

          {activeTab === 'tutorials' && (
            <motion.div key="tutorials" className="w-full">
              <DocumentationTab />
            </motion.div>
          )}

          {activeTab === 'developer' && (
            <motion.div key="developer" className="w-full">
              <DeveloperTab />
            </motion.div>
          )}

          {activeTab === 'shop' && (
            <motion.div key="shop" className="w-full">
              <ShopTab />
            </motion.div>
          )}

          {activeTab === 'terms' && (
            <motion.div key="terms" className="w-full">
              <TermsTab />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER SECTION: Minimal Apple-style bottom showcase bar */}
      <footer className="relative z-10 border-t border-stone-200/40 bg-white/60 backdrop-blur-md py-10 transform-gpu">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-stone-500 font-light">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-3">
              <AntheLogo size={20} color="#57534e" />
              <span 
                className={`text-stone-800 select-none ${
                  language === 'zh' 
                    ? 'font-serif-sc font-extrabold text-base tracking-[0.18em] mr-[-0.18em]' 
                    : 'font-serif font-bold tracking-wider text-sm'
                }`}
              >
                {t.brandName || (language === 'zh' ? '天御' : 'ANTHE')}
              </span>
            </div>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <span>All rights reserved &copy; 2026</span>
          </div>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            <button onClick={() => handleTabChange('overview')} className="hover:text-stone-900 transition-colors cursor-pointer">{t.nav.overview}</button>
            <button onClick={() => handleTabChange('faq')} className="hover:text-stone-900 transition-colors cursor-pointer">{t.nav.faq}</button>
            <button onClick={() => handleTabChange('tutorials')} className="hover:text-stone-900 transition-colors cursor-pointer">{t.nav.tutorials}</button>
            <button onClick={() => handleTabChange('developer')} className="hover:text-stone-900 transition-colors cursor-pointer">{t.nav.developer}</button>
            <button onClick={() => handleTabChange('shop')} className="hover:text-stone-900 transition-colors font-semibold text-[#8c7853] cursor-pointer">{t.nav.shop}</button>
            <button onClick={() => handleTabChange('terms')} className="hover:text-stone-900 transition-colors text-stone-400 cursor-pointer">{t.nav.terms}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
