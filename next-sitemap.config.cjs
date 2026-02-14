const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const LOCALES = ['en', 'zh'];

function getBlogSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => f.replace(/\.(md|mdx)$/, ''));
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://jsontotoon.top',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  outDir: 'public',
  exclude: ['/api/*', '/login', '/signup', '/404', '/_next/*', '/sitemap.xml', '/sitemap-*.xml'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  additionalPaths: async (config) => {
    const blogSlugs = getBlogSlugs();
    const result = [];

    const staticRoutes = ['', '/blog', '/faq', '/about', '/contact', '/privacy'];
    for (const locale of LOCALES) {
      for (const route of staticRoutes) {
        result.push({
          loc: `/${locale}${route}`,
          changefreq: 'weekly',
          priority: route === '' ? 1 : 0.8,
          lastmod: new Date().toISOString(),
        });
      }
    }

    for (const locale of LOCALES) {
      for (const slug of blogSlugs) {
        result.push({
          loc: `/${locale}/blog/${slug}`,
          changefreq: 'weekly',
          priority: 0.7,
          lastmod: new Date().toISOString(),
        });
      }
    }

    return result;
  },
};
