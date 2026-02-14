import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from 'next/navigation';

import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { StyleGlideProvider } from "@/components/styleglide-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { routing } from '@/i18n/routing';
import "@/styles/globals.css";

const dmSans = localFont({
  src: [
    {
      path: "../../../fonts/dm-sans/DMSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../fonts/dm-sans/DMSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../fonts/dm-sans/DMSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../fonts/dm-sans/DMSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../../fonts/dm-sans/DMSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../fonts/dm-sans/DMSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../../fonts/dm-sans/DMSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../fonts/dm-sans/DMSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const BASE_URL = rawBaseUrl
  ? rawBaseUrl.startsWith('http')
    ? rawBaseUrl
    : `http://${rawBaseUrl}`
  : undefined;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tSeo = await getTranslations({ locale, namespace: 'seo' });

  const title = tSeo('title');
  const description = tSeo('description');
  const siteName = tSeo('siteName');

  return {
    // 必须提供 metadataBase 才能解析相对路径（如 og image），否则 Next 会报 Invalid URL
    metadataBase: new URL(BASE_URL ?? 'http://localhost:3000'),
    title: { default: title, template: `%s | ${siteName}` },
    description,
    keywords: tSeo('keywords'),
    icons: {
      icon: [
        { url: '/favicon/favicon.ico', sizes: 'any' },
        { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      ],
      apple: '/favicon/apple-touch-icon.png',
    },
    manifest: '/favicon/site.webmanifest',
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      ...(BASE_URL && { url: `${BASE_URL}/${locale}` }),
      siteName,
      title,
      description,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    ...(BASE_URL && {
      alternates: {
        canonical: `${BASE_URL}/${locale}`,
        languages: Object.fromEntries(
          routing.locales.map((loc) => [loc, `${BASE_URL}/${loc}`])
        ) as Record<string, string>,
      },
    }),
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          async
          crossOrigin="anonymous"
          src="https://tweakcn.com/live-preview.min.js"
        />
      </head>
      <body className={`${dmSans.variable} ${inter.variable} antialiased`}>
        <a href="#main-content" className="absolute left-4 top-4 -translate-y-full focus:translate-y-0 focus:z-[100] px-4 py-2 bg-white text-black rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0a0a0f]">
          Skip to main content
        </a>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <StyleGlideProvider />
            <Navbar />
            <main id="main-content" className="" role="main">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
