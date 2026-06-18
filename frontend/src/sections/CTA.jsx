import RepoInput from "../components/ui/RepoInput";

function CTA() {
  return (
    <section
      id="cta"
      className="py-32 px-6"
    >
      <div className="max-w-5xl mx-auto text-center">

        <div className="inline-flex items-center px-4 py-2 rounded-full border border-teal-500/20 bg-teal-500/5 mb-6">
          <span className="text-teal-400 text-sm font-semibold uppercase tracking-[0.2em]">
            Start Your Free Analysis
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Your codebase is live.
          <br />
          <span className="text-teal-400">
            Is it safe?
          </span>
        </h2>

        <p className="text-slate-400 text-lg max-w-3xl mx-auto mt-6">
          Drop your repository URL and receive a complete
          security, performance, and architecture report
          in seconds.
        </p>

        <RepoInput />

        <p className="text-slate-500 text-sm mt-6">
          No credit card required • Free for open source projects
        </p>

      </div>
    </section>
  );
}

export default CTA;