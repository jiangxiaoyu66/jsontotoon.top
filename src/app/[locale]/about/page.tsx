export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'zh' ? '关于我们 - JSON to TOON' : 'About Us - JSON to TOON',
    description: locale === 'zh'
      ? '了解 JSON to TOON 的使命和愿景。我们帮助 AI 开发者和创业公司减少 30-50% LLM API token 消耗，降低 ChatGPT、Claude、OpenAI 成本。'
      : 'Learn about JSON to TOON mission and vision. We help AI developers and startups reduce LLM API token usage by 30-50%, lowering ChatGPT, Claude, OpenAI costs.',
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen pt-24 bg-[#0a0a0f]">
      <section className="py-16 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {locale === 'zh' ? '关于 JSON to TOON' : 'About JSON to TOON'}
          </h1>

          <div className="space-y-8 text-white/80 leading-relaxed">
            {locale === 'zh' ? (
              <>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">我们的使命</h2>
                  <p>
                    JSON to TOON 致力于帮助 AI 开发者和创业公司降低 LLM API 成本。通过将标准 JSON 转换为 token 高效的 TOON 格式，我们帮助用户减少 30-50% 的 token 消耗。
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">为什么选择 TOON 格式？</h2>
                  <p className="mb-4">
                    TOON (Token-Optimized Object Notation) 是专为 LLM 优化的 JSON 极简表示格式。它保留了 JSON 的所有数据结构，同时去除了不必要的字符：
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>无需双引号包裹键名和字符串值</li>
                    <li>最小化标点符号使用</li>
                    <li>使用换行符分隔对象属性</li>
                    <li>完全保留数据类型和结构</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">适用场景</h2>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>ChatGPT、Claude、OpenAI API 调用</li>
                    <li>LLM 应用开发</li>
                    <li>AI 创业公司成本优化</li>
                    <li>大规模 AI 数据处理</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">核心优势</h2>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>✅ 免费使用，无需注册</li>
                    <li>✅ 浏览器内运行，数据不上传服务器</li>
                    <li>✅ 实时显示 token 节省比例</li>
                    <li>✅ 支持双向转换 (JSON ↔ TOON)</li>
                    <li>✅ 开源透明</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                  <p>
                    JSON to TOON is dedicated to helping AI developers and startups reduce LLM API costs. By converting standard JSON to token-efficient TOON format, we help users reduce token consumption by 30-50%.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Why TOON Format?</h2>
                  <p className="mb-4">
                    TOON (Token-Optimized Object Notation) is a minimal JSON representation optimized for LLMs. It preserves all JSON data structures while removing unnecessary characters:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>No quotes around keys and string values</li>
                    <li>Minimal punctuation usage</li>
                    <li>Newline separation for object properties</li>
                    <li>Full preservation of data types and structure</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Use Cases</h2>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>ChatGPT, Claude, OpenAI API calls</li>
                    <li>LLM application development</li>
                    <li>AI startup cost optimization</li>
                    <li>Large-scale AI data processing</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Key Benefits</h2>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>✅ Free to use, no signup required</li>
                    <li>✅ Runs in browser, data never uploaded</li>
                    <li>✅ Real-time token savings display</li>
                    <li>✅ Bidirectional conversion (JSON ↔ TOON)</li>
                    <li>✅ Open source and transparent</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
