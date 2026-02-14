export const Comparison = () => {
  return (
    <section id="comparison" className="py-32 px-4 relative bg-[#0a0a0f]" aria-labelledby="comparison-heading">
      <div className="max-w-6xl mx-auto">
        <h2 id="comparison-heading" className="text-5xl font-black text-center mb-20 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          JSON vs TOON
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-3xl hover:border-white/20 transition-all">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-4 h-4 bg-slate-500 rounded-full" />
              <h3 className="text-3xl font-bold text-white/90">JSON</h3>
            </div>
            <pre className="bg-black/40 p-8 rounded-2xl text-sm overflow-x-auto border border-white/10">
              <code className="text-white/80">{`{
  "name": "Alice",
  "age": 30,
  "city": "New York",
  "skills": ["Python", "JavaScript"]
}`}</code>
            </pre>
            <div className="mt-8 space-y-3">
              <div className="flex items-center justify-between p-4 backdrop-blur-xl bg-white/5 rounded-xl">
                <span className="text-white/60">Tokens</span>
                <span className="font-bold text-xl text-white/90">~45</span>
              </div>
              <p className="text-white/50 text-sm">Standard format with brackets and quotes</p>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-purple-500/50 p-10 rounded-3xl hover:border-purple-500/70 transition-all overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  TOON
                </h3>
              </div>
              <pre className="bg-black/40 p-8 rounded-2xl text-sm overflow-x-auto border border-purple-500/30">
                <code className="text-white/80">{`name:Alice
age:30
city:New York
skills:[Python,JavaScript]`}</code>
              </pre>
              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between p-4 backdrop-blur-xl bg-white/5 rounded-xl border border-green-500/30">
                  <span className="text-white/60">Tokens</span>
                  <span className="font-bold text-xl text-green-400">~25 (44% less!)</span>
                </div>
                <p className="text-white/50 text-sm">Minimal syntax, maximum efficiency</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
