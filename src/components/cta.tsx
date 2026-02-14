'use client';

export const CTA = () => {
  return (
    <section id="cta" className="py-32 px-4 relative overflow-hidden bg-[#0a0a0f]" aria-labelledby="cta-heading">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 id="cta-heading" className="text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Ready to Reduce API Costs?
        </h2>
        <p className="text-2xl mb-12 text-white/70">Start converting your JSON to TOON format today</p>
        <button
          onClick={() => document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' })}
          className="group px-12 py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 relative overflow-hidden"
        >
          <span className="relative z-10">Try Converter Now</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </section>
  );
};
