import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/routing';
import { getAllPosts } from '@/lib/blog';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'zh' ? 'JSON to TOON 博客 - Token 优化技巧' : 'JSON to TOON Blog - Token Optimization Tips',
    description: locale === 'zh'
      ? '学习如何使用 JSON to TOON 减少 LLM token 消耗，优化 ChatGPT、Claude、OpenAI API 成本。实用技巧、案例分析和最佳实践。'
      : 'Learn how to reduce LLM token usage with JSON to TOON and optimize ChatGPT, Claude, OpenAI API costs. Practical tips, case studies, and best practices.',
  };
}

export default async function BlogPage() {
  const t = await getTranslations('blog');
  const posts = getAllPosts();

  return (
    <section className="min-h-screen bg-[#0a0a0f] px-4 pt-28 pb-24 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'linear-gradient(rgba(96, 165, 250, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 165, 250, 0.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* Floating Orbs */}
      <div className="absolute w-96 h-96 bg-blue-500 rounded-full top-20 -left-48 blur-[80px] opacity-20 animate-float" />
      <div className="absolute w-80 h-80 bg-purple-500 rounded-full top-1/3 -right-40 blur-[80px] opacity-20 animate-float" style={{ animationDelay: '2s' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-500/30 bg-white/[0.03] backdrop-blur-xl">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-blue-300">Latest Articles</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 leading-none tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            {t('description')}
          </p>
        </div>

        <ul className="space-y-6">
          {posts.length === 0 ? (
            <li className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl px-6 py-12 text-center text-white/60">
              {t('empty')}
            </li>
          ) : (
            posts.map((post, i) => (
              <li key={post.slug} style={{ animationDelay: `${i * 100}ms` }} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all hover:border-purple-500/50 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-purple-500/10 hover:scale-[1.01]"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="text-2xl font-bold text-white/95 group-hover:text-white transition-colors group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent">
                      {post.title}
                    </h2>
                    <svg className="w-6 h-6 text-white/40 group-hover:text-purple-400 transition-all group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  {post.description && (
                    <p className="mb-4 text-base text-white/60 line-clamp-2">
                      {post.description}
                    </p>
                  )}
                  <time
                    dateTime={post.date}
                    className="text-sm text-white/50 font-medium"
                  >
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
