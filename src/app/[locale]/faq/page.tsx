import { getTranslations } from 'next-intl/server';

import { cn } from '@/lib/utils';

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'zh' ? '常见问题 - JSON to TOON 转换器' : 'FAQ - JSON to TOON Converter',
    description: locale === 'zh'
      ? '关于 JSON to TOON 转换器的常见问题解答。了解如何减少 30-50% LLM token 消耗，优化 ChatGPT、Claude、OpenAI API 成本。'
      : 'Frequently asked questions about JSON to TOON converter. Learn how to reduce LLM token usage by 30-50% and optimize ChatGPT, Claude, OpenAI API costs.',
  };
}

export default async function Page() {
  const t = await getTranslations('faq');

  return (
    <div className="min-h-screen pt-24">
      <section id="faq" className="py-16 px-4 relative bg-[#0a0a0f]" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <h1 id="faq-heading" className="text-5xl font-black text-center mb-20 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t('title')}
          </h1>

          <div className="faq-accordion space-y-4">
            {FAQ_KEYS.map((key) => (
              <details
                key={key}
                className={cn(
                  'group/details backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 overflow-hidden',
                  'hover:border-white/20 transition-colors'
                )}
              >
                <summary className="faq-summary list-none cursor-pointer flex items-center justify-between gap-3 text-left text-white/90 hover:text-white py-5 text-sm font-medium">
                  <span>{t(`${key}.question`)}</span>
                  <span className="faq-icon shrink-0 transition-transform duration-200" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <div className="text-white/70 pb-5 pl-0">
                  {t(`${key}.answer`)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
