function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Welcome back to CodeLens AI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-slate-400">
              Total Scans
            </h3>

            <p className="text-4xl font-bold text-teal-400 mt-3">
              12
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-slate-400">
              Security Issues
            </h3>

            <p className="text-4xl font-bold text-red-400 mt-3">
              5
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-slate-400">
              Performance Alerts
            </h3>

            <p className="text-4xl font-bold text-yellow-400 mt-3">
              3
            </p>
          </div>

        </div>

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Recent Reports
          </h2>

          <div className="space-y-4">

            <div className="border border-slate-800 rounded-xl p-4">
              uber-clone-mern
            </div>

            <div className="border border-slate-800 rounded-xl p-4">
              ecommerce-dashboard
            </div>

            <div className="border border-slate-800 rounded-xl p-4">
              code-review-system
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;