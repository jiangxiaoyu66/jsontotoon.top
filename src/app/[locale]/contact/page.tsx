import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'zh' ? '联系我们 - JSON to TOON' : 'Contact Us - JSON to TOON',
    description: locale === 'zh'
      ? '联系 JSON to TOON 团队。通过电子邮件提交问题、功能建议或反馈。我们致力于帮助 AI 开发者优化 LLM token 使用，降低 API 成本。'
      : 'Contact JSON to TOON team. Submit issues, feature requests, or feedback via email. We help AI developers optimize LLM token usage and reduce API costs.',
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen pt-24 bg-[#0a0a0f]">
      <section className="py-16 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {locale === 'zh' ? '联系我们' : 'Contact Us'}
          </h1>

          <div className="space-y-8">
            {locale === 'zh' ? (
              <>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">联系方式</h2>
                  <p className="text-white/80 mb-6">
                    感谢您使用 JSON to TOON 转换器。如果您有任何问题、建议或反馈，欢迎通过以下方式联系我们。
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">电子邮件</h3>
                        <p className="text-white/70">
                          发送邮件至: <a href="mailto:contact@json2toon.com" className="text-blue-400 hover:text-blue-300 transition-colors">contact@json2toon.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">反馈类型</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">🐛 Bug 报告</h3>
                      <p className="text-white/70">
                        发现了转换错误或其他问题？请详细描述问题，包括输入数据和预期结果。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">💡 功能建议</h3>
                      <p className="text-white/70">
                        有新功能想法？我们欢迎所有建议！请描述您的需求和使用场景。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">❓ 使用问题</h3>
                      <p className="text-white/70">
                        不确定如何使用某个功能？查看我们的 <a href="/faq" className="text-blue-400 hover:text-blue-300 transition-colors">FAQ 页面</a> 或直接联系我们。
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">📝 其他反馈</h3>
                      <p className="text-white/70">
                        任何其他意见或建议，我们都很乐意听取。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">响应时间</h2>
                  <p className="text-white/80">
                    我们通常会在 1-3 个工作日内回复您的邮件。对于紧急问题，我们会优先处理。
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">常见问题</h2>
                  <p className="text-white/80 mb-4">
                    在联系我们之前，您可能想先查看我们的 <a href="/faq" className="text-blue-400 hover:text-blue-300 transition-colors">常见问题页面</a>，那里可能已经有您需要的答案。
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                  <p className="text-white/80 mb-6">
                    Thank you for using JSON to TOON converter. If you have any questions, suggestions, or feedback, please feel free to contact us.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                        <p className="text-white/70">
                          Send email to: <a href="mailto:contact@json2toon.com" className="text-blue-400 hover:text-blue-300 transition-colors">contact@json2toon.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Feedback Types</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">🐛 Bug Reports</h3>
                      <p className="text-white/70">
                        Found a conversion error or other issue? Please describe the problem in detail, including input data and expected results.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">💡 Feature Suggestions</h3>
                      <p className="text-white/70">
                        Have a new feature idea? We welcome all suggestions! Please describe your needs and use cases.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">❓ Usage Questions</h3>
                      <p className="text-white/70">
                        Not sure how to use a feature? Check our <a href="/faq" className="text-blue-400 hover:text-blue-300 transition-colors">FAQ page</a> or contact us directly.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">📝 Other Feedback</h3>
                      <p className="text-white/70">
                        Any other comments or suggestions, we'd love to hear from you.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Response Time</h2>
                  <p className="text-white/80">
                    We typically respond to emails within 1-3 business days. Urgent issues will be prioritized.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                  <p className="text-white/80 mb-4">
                    Before contacting us, you may want to check our <a href="/faq" className="text-blue-400 hover:text-blue-300 transition-colors">FAQ page</a>, which may already have the answers you need.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
