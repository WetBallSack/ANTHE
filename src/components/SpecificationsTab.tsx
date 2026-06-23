import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function SpecificationsTab() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { t } = useLanguage();

  const FAQS = t.specs.faqs;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-6 max-w-4xl mx-auto px-2 sm:px-0 w-full min-w-0 overflow-hidden"
    >
      {/* FAQS Accordion list */}
      <section className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white/95 border border-stone-200/60 shadow-xs marble-slab-card space-y-6 w-full max-w-full min-w-0 overflow-hidden">
        <div className="space-y-2 border-b border-stone-200/40 pb-5">
          <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest font-bold">{t.specs.badge || 'PRODUCT MECHANICS'}</span>
          <h3 className="font-serif text-3xl font-light text-stone-950">
            {t.specs.title || 'Conceptual Design FAQ'}
          </h3>
          <p className="text-xs text-stone-405 font-light max-w-xl">
            {t.specs.desc || 'Detailed answers explaining why physical-layer redirection acts as the safest and most solid translation loop.'}
          </p>
        </div>

        <div className="space-y-4 divide-y divide-stone-100 bg-white">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx}
              className="pt-5 first:pt-2 pb-2 space-y-2 font-sans"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left flex items-center justify-between py-2 text-stone-900 hover:text-stone-700 font-serif font-semibold text-sm sm:text-base focus:outline-none transition-colors cursor-pointer group"
               >
                <span className="group-hover:translate-x-1 transition-transform duration-305">{faq.q}</span>
                <ChevronDown className={`h-4 w-4 text-stone-405 transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180 text-stone-800' : ''}`} />
              </button>

              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-stone-600 leading-relaxed font-light bg-stone-50/50 p-4 rounded-xl border border-stone-150 mt-2 font-sans">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
