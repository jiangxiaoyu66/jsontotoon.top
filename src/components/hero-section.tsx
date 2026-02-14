import { getTranslations } from 'next-intl/server';

import { HeroConverterClient } from '@/components/hero-converter-client';

export async function HeroSection() {
  const t = await getTranslations('hero');

  return (
    <section
      id="converter"
      className="min-h-screen flex items-center px-4 pt-32 pb-20 relative"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="absolute w-96 h-96 bg-blue-500 rounded-full top-20 -left-48 blur-[80px] opacity-30 animate-[float_8s_ease-in-out_infinite]" />
      <div className="absolute w-80 h-80 bg-purple-500 rounded-full top-1/3 right-0 blur-[80px] opacity-30 animate-[float_8s_ease-in-out_infinite_2s]" />
      <div className="absolute w-72 h-72 bg-pink-500 rounded-full bottom-1/4 left-1/4 blur-[80px] opacity-30 animate-[float_8s_ease-in-out_infinite_4s]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-white/5 border border-blue-500/30 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-blue-300">{t('badge')}</span>
          </div>
          <h1
            id="hero-heading"
            className="text-5xl md:text-6xl font-black mb-4 leading-none tracking-tight"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('title')}
            </span>
            <span className="text-white/90"> {t('subtitle')}</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            {t('description')} <span className="text-green-400 font-semibold">{t('savings')}</span>
          </p>
        </div>

        <HeroConverterClient />
      </div>
    </section>
  );
}
