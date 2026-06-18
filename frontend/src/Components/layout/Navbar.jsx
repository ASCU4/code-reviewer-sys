function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto h-[68px] flex items-center justify-between">
        
        <a
          href="#"
          className="flex items-center gap-2 font-bold text-white"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
            AI
          </div>

          <span>
            CodeLens
            <span className="text-teal-400">AI</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          <li>
            <a href="#engine">Engine</a>
          </li>

          <li>
            <a href="#features">Features</a>
          </li>

          <li>
            <a href="#workflow">Workflow</a>
          </li>

          <li>
            <a href="#analytics">Analytics</a>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <button className="border px-4 py-2 rounded-lg">
            Sign In
          </button> 
        </div>
      </div>
    </nav>
  );
}

export default Navbar;