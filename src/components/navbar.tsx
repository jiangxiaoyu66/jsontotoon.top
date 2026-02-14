'use client';

import Image from 'next/image';

import { useLocale, useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/routing';

const LOCALES = ['en', 'zh'] as const;

const navLink =
  'relative font-text text-sm font-medium text-white/75 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm';

export const Navbar = () => {
  const t = useTranslations('nav');
  const currentLocale = useLocale() as (typeof LOCALES)[number];
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-white/[0.06] backdrop-blur-xl supports-[backdrop-filter]:bg-white/[0.04]"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg outline-none transition focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.08] shadow-md ring-1 ring-white/10"
            aria-hidden
          >
            <Image src="/favicon/favicon.svg" alt="JSON to TOON logo" width={20} height={20} className="h-5 w-5 shrink-0" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight bg-gradient-to-r from-blue-200 via-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
            JSON to TOON
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link href="/#converter" className={`px-3 py-2 ${navLink}`}>{t('converter')}</Link>
          <Link href="/#about" className={`px-3 py-2 ${navLink}`}>{t('about')}</Link>
          <Link href="/#comparison" className={`px-3 py-2 ${navLink}`}>{t('features')}</Link>
          <Link href="/blog" className={`px-3 py-2 ${navLink} ${pathname.startsWith('/blog') ? 'text-white' : ''}`}>{t('blog')}</Link>
          <Link href="/faq" className={`px-3 py-2 ${navLink} ${pathname === '/faq' ? 'text-white' : ''}`}>{t('faq')}</Link>

          <span className="mx-1 h-4 w-px bg-white/20" aria-hidden />

          <div className="flex items-center gap-0.5 rounded-lg bg-white/[0.06] p-0.5 ring-1 ring-white/10" role="group" aria-label="Language">
            {LOCALES.map((locale) => {
              const isActive = locale === currentLocale;
              return (
                <Link
                  key={locale}
                  href={pathname}
                  locale={locale}
                  className={`relative min-w-[2.25rem] rounded-md px-2.5 py-1.5 text-center text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                    isActive
                      ? 'bg-white/15 text-white shadow-sm'
                      : 'text-white/70 hover:bg-white/[0.08] hover:text-white'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {locale.toUpperCase()}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
