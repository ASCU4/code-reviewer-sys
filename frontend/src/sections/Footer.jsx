function Footer() {
  return (
    <footer className="border-t border-slate-800 py-12 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <div>
            <h3 className="text-2xl font-bold text-white">
              CodeLens
              <span className="text-teal-400">AI</span>
            </h3>

            <p className="text-slate-400 mt-2">
              AI-powered code reviews for modern development teams.
            </p>
          </div>

          <div className="flex gap-8 text-slate-400">
            <a href="#" className="hover:text-teal-400 transition">
              Dashboard
            </a>

            <a href="#" className="hover:text-teal-400 transition">
              Upload
            </a>

            <a href="#" className="hover:text-teal-400 transition">
              Reports
            </a>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500">
          © 2025 CodeLens AI. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;