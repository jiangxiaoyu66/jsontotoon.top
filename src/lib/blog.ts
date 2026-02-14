import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  content: string;
};

function getSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => f.replace(/\.(md|mdx)$/, ''));
}

export function getAllPosts(): BlogPost[] {
  const slugs = getSlugs();
  return slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  for (const ext of ['.md', '.mdx']) {
    const filePath = path.join(BLOG_DIR, `${slug}${ext}`);
    if (!fs.existsSync(filePath)) continue;
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? '',
      date: data.date ?? new Date().toISOString().slice(0, 10),
      author: data.author ?? 'JSON to TOON Team',
      content,
    };
  }
  return null;
}

export function getBlogSlugs(): string[] {
  return getSlugs();
}
