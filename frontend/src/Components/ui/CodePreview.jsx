function CodePreview() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 w-full max-w-lg">

      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>

      <div className="space-y-3 text-left text-sm font-mono">

        <div className="text-slate-500">
          auth/middleware.ts
        </div>

        <div className="text-slate-300">
          const userId = parseJWT(req.headers.token)
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-red-400 font-semibold">
            Security Risk Detected
          </p>

          <p className="text-slate-400 mt-1">
            Token validation vulnerability found.
          </p>
        </div>

        <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-3">
          <p className="text-teal-400 font-semibold">
            AI Suggestion
          </p>

          <p className="text-slate-400 mt-1">
            Use secure middleware validation before parsing.
          </p>
        </div>

      </div>
    </div>
  );
}

export default CodePreview;