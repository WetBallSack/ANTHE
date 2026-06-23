import React from 'react';
import { motion } from 'motion/react';
import { Scale, Shield, Landmark, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function TermsTab() {
  const { t } = useLanguage();

  const rightsItems = t.terms?.rightsItems || [];
  const sections = t.terms?.sections || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-8 max-w-5xl mx-auto px-2 sm:px-0 w-full min-w-0 overflow-hidden"
    >
      <div className="p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-3xl bg-white/95 border border-stone-200/60 shadow-xs marble-slab-card w-full max-w-full min-w-0 overflow-hidden">
        <div className="space-y-2 border-b border-stone-200/40 pb-6 mb-8 text-center sm:text-left">
          <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest font-bold flex items-center justify-center sm:justify-start gap-1.5">
            <Scale className="h-3 w-3" /> {t.terms?.badge}
          </span>
          <h3 className="font-serif text-3xl font-light text-stone-950">
            {t.terms?.title}
          </h3>
          <p className="text-xs text-stone-405 font-light">
            {t.terms?.subtitle}
          </p>
        </div>

        {/* Legal Context Warning Callout */}
        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/60 text-xs text-stone-605 leading-relaxed font-light mb-8 grid md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-1 flex justify-center">
            <div className="h-9 w-9 bg-stone-100 rounded-xl flex items-center justify-center border border-stone-150 text-stone-800">
              <Landmark className="h-4.5 w-4.5 text-stone-705" />
            </div>
          </div>
          <div className="md:col-span-11 space-y-1">
            <span className="font-serif font-bold text-stone-900 block text-sm">{t.terms?.calloutTitle}</span>
            <p className="text-[11px] text-stone-500 font-light">
              {t.terms?.calloutDesc}
            </p>
          </div>
        </div>

        {/* Comprehensive Terms Sections */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Quick Summary Navigation Panel */}
          <div className="md:col-span-1">
            <div className="sticky top-6 p-5 rounded-2xl bg-stone-50/70 border border-stone-200/40 space-y-4">
              <span className="text-[9px] font-mono tracking-widest text-stone-400 font-bold block uppercase border-b border-stone-200/55 pb-2">
                {t.terms?.rightsTitle}
              </span>
              
              <div className="space-y-4 text-[11px] text-stone-600 font-light leading-relaxed font-sans">
                {rightsItems.map((item: string, idx: number) => {
                  const parts = item.split(':');
                  const hasPrefix = parts.length > 1;
                  return (
                    <div key={idx} className="flex gap-2.5 items-start">
                      <CheckCircle2 className="h-3.5 w-3.5 text-stone-800 shrink-0 mt-0.5" />
                      <span>
                        {hasPrefix ? (
                          <>
                            <strong>{parts[0]}:</strong>{parts.slice(1).join(':')}
                          </>
                        ) : (
                          item
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Full Legal Text Details */}
          <div className="md:col-span-2 space-y-6 text-xs text-stone-605 leading-relaxed font-light">
            {sections.map((sec: any, idx: number) => (
              <section key={idx} className="space-y-2 border-b border-stone-100 pb-5 last:border-b-0">
                <h4 className="font-serif text-sm font-bold text-stone-950 flex items-center gap-2">
                  <span className="font-mono text-[10px] text-stone-400">{sec.num}</span> {sec.title}
                </h4>
                <p className="whitespace-pre-line text-stone-650">
                  {sec.desc}
                </p>
              </section>
            ))}

            <div className="flex items-center gap-2 pt-6 border-t border-stone-150 text-[10px] font-mono text-stone-400">
              <Shield className="h-4 w-4 text-stone-405" />
              <span>{t.footer?.audit}</span>
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
