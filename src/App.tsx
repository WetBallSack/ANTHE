import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage, Language } from './LanguageContext';
import OverviewTab from './components/OverviewTab';
import SpecificationsTab from './components/SpecificationsTab';
import ShopTab from './components/ShopTab';
import DocumentationTab from './components/DocumentationTab';
import TermsTab from './components/TermsTab';
import DeveloperTab from './components/DeveloperTab';
import AntheLogo from './components/AntheLogo';
import MarbleBackground from './components/MarbleBackground';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'overview' | 'faq' | 'tutorials' | 'developer' | 'shop' | 'terms'>('overview');
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen text-stone-800 font-sans relative overflow-hidden flex flex-col justify-between selection:bg-amber-100">
      {/* Dynamic drifting black marble veins backdrop */}
      <MarbleBackground />

      {/* Decorative Golden Line Accent top boundary */}
      <div className="h-[2px] w-full bg-gradient-to-r from-stone-250/30 via-stone-405/40 to-stone-250/30 z-50 relative" />

      {/* Aesthetic Top Navigation bar */}
      <header className="relative z-50 py-6 px-4 md:px-8 max-w-7xl mx-auto w-full border-b border-stone-200/40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo / Title brand mark */}
          <div className="flex items-center gap-4">
            <AntheLogo size={32} color="#1c1917" />
            <span className="font-serif font-extrabold tracking-widest text-stone-900 hidden sm:inline text-lg">ANTHE</span>
          </div>

          {/* Navigation Items (Designed like premium hotel tabs) */}
          <nav className="flex flex-wrap items-center gap-1 bg-white/70 border border-stone-200/50 p-1.5 rounded-2xl sm:rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.01)] relative overflow-hidden backdrop-blur-lg justify-center">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 sm:px-5 py-2 rounded-full text-xs font-serif font-medium tracking-wide transition-all ${
                activeTab === 'overview' 
                  ? 'bg-gradient-to-b from-stone-900 to-stone-950 text-[#fbfaf7] shadow-md shadow-stone-900/10' 
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {t.nav.overview}
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-3.5 sm:px-5 py-2 rounded-full text-xs font-serif font-medium tracking-wide transition-all ${
                activeTab === 'faq' 
                  ? 'bg-gradient-to-b from-stone-900 to-stone-950 text-[#fbfaf7] shadow-md shadow-stone-900/10' 
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {t.nav.faq}
            </button>
            <button
              onClick={() => setActiveTab('tutorials')}
              className={`px-3.5 sm:px-5 py-2 rounded-full text-xs font-serif font-medium tracking-wide transition-all ${
                activeTab === 'tutorials' 
                  ? 'bg-gradient-to-b from-stone-900 to-stone-950 text-[#fbfaf7] shadow-md shadow-stone-900/10' 
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {t.nav.tutorials}
            </button>
            <button
              onClick={() => setActiveTab('developer')}
              className={`px-3.5 sm:px-5 py-2 rounded-full text-xs font-serif font-medium tracking-wide transition-all ${
                activeTab === 'developer' 
                  ? 'bg-gradient-to-b from-stone-900 to-stone-950 text-[#fbfaf7] shadow-md shadow-stone-900/10' 
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {t.nav.developer}
            </button>
            <button
              onClick={() => setActiveTab('shop')}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs font-serif font-bold tracking-wide transition-all ${
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
              className={`px-3 py-1 rounded-full transition-all ${language === 'en' ? 'bg-stone-900 text-white font-bold' : 'text-stone-500 hover:text-stone-800'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('zh')}
              className={`px-3 py-1 rounded-full transition-all ${language === 'zh' ? 'bg-stone-900 text-white font-bold' : 'text-stone-500 hover:text-stone-800'}`}
            >
              中文
            </button>
            <button 
              onClick={() => setLanguage('ja')}
              className={`px-3 py-1 rounded-full transition-all ${language === 'ja' ? 'bg-stone-900 text-white font-bold' : 'text-stone-500 hover:text-stone-800'}`}
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
              <OverviewTab onTabChange={setActiveTab} />
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
      <footer className="relative z-10 border-t border-stone-200/40 bg-white/60 backdrop-blur-md py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-stone-500 font-light">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-3">
              <AntheLogo size={20} color="#57534e" />
              <span className="font-serif font-bold tracking-wider text-stone-800 text-sm">ANTHE</span>
            </div>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <span>All rights reserved &copy; 2026</span>
          </div>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            <button onClick={() => setActiveTab('overview')} className="hover:text-stone-900 transition-colors">{t.nav.overview}</button>
            <button onClick={() => setActiveTab('faq')} className="hover:text-stone-900 transition-colors">{t.nav.faq}</button>
            <button onClick={() => setActiveTab('tutorials')} className="hover:text-stone-900 transition-colors">{t.nav.tutorials}</button>
            <button onClick={() => setActiveTab('developer')} className="hover:text-stone-900 transition-colors">{t.nav.developer}</button>
            <button onClick={() => setActiveTab('shop')} className="hover:text-stone-900 transition-colors font-semibold text-[#8c7853]">{t.nav.shop}</button>
            <button onClick={() => setActiveTab('terms')} className="hover:text-stone-900 transition-colors text-stone-400">{t.nav.terms}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
