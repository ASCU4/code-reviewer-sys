function Upload() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-4xl mx-auto px-6 py-20">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">
            Analyze Repository
          </h1>

          <p className="text-slate-400 mt-4">
            Paste your GitHub repository URL and let
            CodeLens AI review your code.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <label className="block text-slate-300 mb-3">
            Repository URL
          </label>

          <input
            type="text"
            placeholder="https://github.com/username/repository"
            className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-teal-400"
          />

          <button
            className="w-full mt-6 bg-teal-500 text-black font-semibold py-4 rounded-xl hover:bg-teal-400 transition"
          >
            Start Analysis
          </button>

        </div>

      </div>

    </div>
  );
}

export default Upload;
