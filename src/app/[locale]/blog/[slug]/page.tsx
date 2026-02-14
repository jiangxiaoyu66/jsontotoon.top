import { notFound } from 'next/navigation';

import { getTranslations } from 'next-intl/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Link } from '@/i18n/routing';
import { getBlogSlugs, getPostBySlug } from '@/lib/blog';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  // Shorten title to 60 characters max
  let shortTitle = post.title;
  if (shortTitle.length > 60) {
    shortTitle = shortTitle.substring(0, 57) + '...';
  }

  return {
    title: shortTitle,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const t = await getTranslations('blog');

  return (
    <article className="min-h-screen bg-[#0a0a0f] px-4 pt-28 pb-24 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(rgba(96, 165, 250, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 165, 250, 0.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* Floating Orbs */}
      <div className="absolute w-96 h-96 bg-purple-500 rounded-full top-40 -right-48 blur-[80px] opacity-15 animate-float" />
      <div className="absolute w-72 h-72 bg-pink-500 rounded-full bottom-1/4 -left-36 blur-[80px] opacity-15 animate-float" style={{ animationDelay: '3s' }} />

      <div className="max-w-3xl mx-auto relative z-10">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white transition-all border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-blue-500/50 hover:bg-white/[0.06]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('back')}
        </Link>

        <header className="mb-12 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <time
              dateTime={post.date}
              className="text-sm text-blue-300 font-medium"
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="text-white/40">•</span>
            <span className="text-sm text-white/60">By {post.author}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-none tracking-tight mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-lg text-white/70 leading-relaxed">{post.description}</p>
          )}
        </header>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10">
          <div className="blog-prose prose prose-invert max-w-none prose-headings:font-bold prose-headings:text-white/95 prose-p:text-white/80 prose-p:leading-relaxed prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:rounded prose-code:bg-black/40 prose-code:border prose-code:border-white/10 prose-code:px-2 prose-code:py-1 prose-code:text-purple-300 prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:shadow-xl prose-ul:text-white/80 prose-ol:text-white/80 prose-li:text-white/80">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </article>
  );
}
