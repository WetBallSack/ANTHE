import React from 'react';

interface BrandMarqueeProps {
  title: string;
}

export default function BrandMarquee({ title }: BrandMarqueeProps) {
  // We only keep pure GODAI text and replicate it for seamless scrolling
  const brands = Array.from({ length: 8 }, (_, i) => ({
    id: `goda-${i}`,
    element: (
      <span className="font-sans text-xl font-bold tracking-[0.25em] text-stone-500 hover:text-stone-800 transition-colors duration-300 select-none">
        GODAI
      </span>
    ),
  }));

  // We duplicate the list to ensure infinite seamless wrapping during animation
  const scrollingItems = [...brands, ...brands, ...brands];

  return (
    <section className="w-full bg-white/40 border-y border-stone-200/50 py-10 overflow-hidden relative select-none">
      {/* Decorative vertical gradient fading out the left & right scroll edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f8f7f5] via-[#f8f7f5]/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f8f7f5] via-[#f8f7f5]/40 to-transparent z-10 pointer-events-none" />

      {/* Localized Section Title */}
      <div className="text-center mb-6">
        <span className="text-[10px] text-stone-450 font-mono uppercase tracking-[0.3em] font-semibold">
          {title}
        </span>
      </div>

      {/* Marquee viewport container */}
      <div className="flex overflow-hidden w-full relative">
        <div className="flex whitespace-nowrap gap-16 md:gap-24 items-center animate-marquee py-2 w-max pr-16 md:pr-24">
          {scrollingItems.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="inline-flex items-center justify-center shrink-0"
            >
              {brand.element}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

