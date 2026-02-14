export const ComparisonTable = () => {
  return (
    <section id="comparison-table" className="py-32 px-4 bg-[#0a0a0f]" aria-labelledby="comparison-table-heading">
      <div className="max-w-6xl mx-auto">
        <h2 id="comparison-table-heading" className="text-5xl font-black text-center mb-20 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Detailed Comparison
        </h2>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th scope="col" className="px-8 py-6 text-left text-lg font-bold text-white/90">Feature</th>
                <th scope="col" className="px-8 py-6 text-left text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">TOON</th>
                <th scope="col" className="px-8 py-6 text-left text-lg font-bold text-white/60">JSON</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/5 transition">
                <td className="px-8 py-5 font-medium text-white/80">Token Usage</td>
                <td className="px-8 py-5 text-green-400 font-bold">30-50% less</td>
                <td className="px-8 py-5 text-white/60">Standard</td>
              </tr>
              <tr className="hover:bg-white/5 transition">
                <td className="px-8 py-5 font-medium text-white/80">Readability</td>
                <td className="px-8 py-5 font-semibold text-white/90">High</td>
                <td className="px-8 py-5 text-white/60">Medium</td>
              </tr>
              <tr className="hover:bg-white/5 transition">
                <td className="px-8 py-5 font-medium text-white/80">API Cost</td>
                <td className="px-8 py-5 text-green-400 font-bold">Lower</td>
                <td className="px-8 py-5 text-white/60">Higher</td>
              </tr>
              <tr className="hover:bg-white/5 transition">
                <td className="px-8 py-5 font-medium text-white/80">Nested Objects</td>
                <td className="px-8 py-5 text-white/90">✓ Supported</td>
                <td className="px-8 py-5 text-white/60">✓ Supported</td>
              </tr>
              <tr className="hover:bg-white/5 transition">
                <td className="px-8 py-5 font-medium text-white/80">Arrays</td>
                <td className="px-8 py-5 text-white/90">✓ Supported</td>
                <td className="px-8 py-5 text-white/60">✓ Supported</td>
              </tr>
              <tr className="hover:bg-white/5 transition">
                <td className="px-8 py-5 font-medium text-white/80">Processing Speed</td>
                <td className="px-8 py-5 text-green-400 font-bold">Faster</td>
                <td className="px-8 py-5 text-white/60">Standard</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
