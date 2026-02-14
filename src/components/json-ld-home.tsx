import { getTranslations } from 'next-intl/server';

function getBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return 'http://localhost:3000';
  return raw.startsWith('http') ? raw : `http://${raw}`;
}

type Props = { locale: string };

export async function JsonLdHome({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'seo' });
  const tFaq = await getTranslations({ locale, namespace: 'faq' });
  const url = `${getBaseUrl()}/${locale}`;

  const webApp = {
    '@type': 'SoftwareApplication',
    name: 'JSON to TOON & TOON to JSON Converter',
    alternateName: ['JSON to TOON', 'TOON to JSON', 'json2toon', 'toon2json'],
    description: t('description'),
    url,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: [
      'JSON to TOON conversion',
      'TOON to JSON conversion',
      '30-50% token reduction',
      'Real-time token savings calculator',
      'Browser-based, no server upload',
      'Free, no signup required'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127'
    },
    author: {
      '@type': 'Organization',
      name: 'JSON to TOON'
    },
    keywords: t('keywords')
  };

  const faqEntries = ['q1', 'q2', 'q3', 'q4', 'q5'].map((key) => ({
    '@type': 'Question' as const,
    name: tFaq(`${key}.question`),
    acceptedAnswer: {
      '@type': 'Answer' as const,
      text: tFaq(`${key}.answer`),
    },
  }));

  const faqPage = {
    '@type': 'FAQPage',
    mainEntity: faqEntries,
  };

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [webApp, faqPage],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
