import Link from 'next/link';

import { getTranslations } from 'next-intl/server';

import { Comparison } from "@/components/comparison";
import { ComparisonTable } from "@/components/comparison-table";
import { FAQSection } from "@/components/faq-section";
import { HeroConverter } from "@/components/hero-converter";
import { JsonLdHome } from "@/components/json-ld-home";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <>
      <JsonLdHome locale={locale} />
      <HeroConverter />

      <section id="about" className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center">{t('title')}</h2>
        <p className="text-lg text-white/80 text-center leading-relaxed">
          {t('description')}
        </p>
      </section>

      <Comparison />
      <ComparisonTable />
      <FAQSection />

      <section id="learn-more" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {locale === 'zh' ? '了解更多' : 'Learn More'}
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link
            href={`/${locale}/blog/toon-format-explained`}
            className="p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
          >
            <h3 className="font-semibold mb-2">
              {locale === 'zh' ? 'TOON 格式详解' : 'TOON Format Explained'}
            </h3>
            <p className="text-sm text-white/70">
              {locale === 'zh' ? '深入了解 TOON 格式的工作原理' : 'Deep dive into how TOON format works'}
            </p>
          </Link>
          <Link
            href={`/${locale}/blog/welcome`}
            className="p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
          >
            <h3 className="font-semibold mb-2">
              {locale === 'zh' ? '快速入门指南' : 'Getting Started'}
            </h3>
            <p className="text-sm text-white/70">
              {locale === 'zh' ? '开始使用 JSON to TOON 转换器' : 'Start using JSON to TOON converter'}
            </p>
          </Link>
          <Link
            href={`/${locale}/faq`}
            className="p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
          >
            <h3 className="font-semibold mb-2">
              {locale === 'zh' ? '常见问题' : 'FAQ'}
            </h3>
            <p className="text-sm text-white/70">
              {locale === 'zh' ? '查看常见问题解答' : 'View frequently asked questions'}
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
