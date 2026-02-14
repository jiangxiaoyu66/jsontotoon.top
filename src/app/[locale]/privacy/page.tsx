export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'zh' ? '隐私政策 - JSON to TOON' : 'Privacy Policy - JSON to TOON',
    description: locale === 'zh'
      ? 'JSON to TOON 隐私政策。所有转换在浏览器本地完成，不收集、不存储、不上传您的任何数据。完全安全可靠，保护您的数据隐私。'
      : 'JSON to TOON Privacy Policy. All conversions are done locally in your browser. We do not collect, store, or upload any of your data. Completely secure.',
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen pt-24 bg-[#0a0a0f]">
      <section className="py-16 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {locale === 'zh' ? '隐私政策' : 'Privacy Policy'}
          </h1>

          <div className="space-y-8 text-white/80 leading-relaxed">
            {locale === 'zh' ? (
              <>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <p className="text-sm text-white/60 mb-6">最后更新: 2026年2月13日</p>

                  <h2 className="text-2xl font-bold text-white mb-4">数据收集</h2>
                  <p className="mb-4">
                    JSON to TOON 是一个完全在浏览器中运行的工具。我们<strong className="text-white">不收集、不存储、不上传</strong>您的任何数据：
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>您输入的 JSON 或 TOON 数据完全在您的浏览器本地处理</li>
                    <li>转换过程不涉及任何服务器通信</li>
                    <li>我们无法访问您的数据</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Cookies 和本地存储</h2>
                  <p>
                    我们可能使用浏览器本地存储来保存您的偏好设置（如主题选择、语言偏好）。这些数据仅存储在您的设备上，不会发送到我们的服务器。
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">分析和统计</h2>
                  <p>
                    我们可能使用匿名分析工具（如 Google Analytics）来了解网站使用情况。这些工具收集的是匿名的、聚合的统计数据，不包含任何个人身份信息。
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">第三方服务</h2>
                  <p>
                    本网站可能包含指向第三方网站的链接。我们不对这些第三方网站的隐私政策负责。
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">数据安全</h2>
                  <p>
                    由于所有数据处理都在您的浏览器本地进行，您的数据安全完全由您自己控制。我们建议：
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                    <li>使用最新版本的浏览器</li>
                    <li>不要在公共计算机上处理敏感数据</li>
                    <li>定期清理浏览器缓存</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">政策更新</h2>
                  <p>
                    我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，并注明最后更新日期。
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">联系我们</h2>
                  <p>
                    如果您对本隐私政策有任何疑问，请通过 GitHub Issues 联系我们。
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <p className="text-sm text-white/60 mb-6">Last Updated: February 13, 2026</p>

                  <h2 className="text-2xl font-bold text-white mb-4">Data Collection</h2>
                  <p className="mb-4">
                    JSON to TOON is a tool that runs entirely in your browser. We <strong className="text-white">do not collect, store, or upload</strong> any of your data:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Your JSON or TOON data is processed entirely locally in your browser</li>
                    <li>The conversion process involves no server communication</li>
                    <li>We cannot access your data</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Cookies and Local Storage</h2>
                  <p>
                    We may use browser local storage to save your preferences (such as theme selection, language preference). This data is stored only on your device and is not sent to our servers.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Analytics and Statistics</h2>
                  <p>
                    We may use anonymous analytics tools (such as Google Analytics) to understand website usage. These tools collect anonymous, aggregated statistical data that does not include any personally identifiable information.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
                  <p>
                    This website may contain links to third-party websites. We are not responsible for the privacy policies of these third-party websites.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                  <p>
                    Since all data processing occurs locally in your browser, your data security is entirely under your control. We recommend:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                    <li>Use the latest version of your browser</li>
                    <li>Do not process sensitive data on public computers</li>
                    <li>Regularly clear your browser cache</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Policy Updates</h2>
                  <p>
                    We may update this privacy policy from time to time. The updated policy will be posted on this page with the last updated date noted.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                  <p>
                    If you have any questions about this privacy policy, please contact us through GitHub Issues.
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
