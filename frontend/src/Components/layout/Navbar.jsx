import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-slate-800"
          : "bg-transparent"
      }`}
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

        <ul className="hidden md:flex items-center gap-8 text-slate-300">

          <li>
            <a
              href="#"
              className="hover:text-teal-400 transition"
            >
              Dashboard
            </a>
          </li>

          <li>
            <a
              href="#"
              className="hover:text-teal-400 transition"
            >
              Upload
            </a>
          </li>

          <li>
            <a
              href="#"
              className="hover:text-teal-400 transition"
            >
              Reports
            </a>
          </li>

        </ul>

        <div className="flex items-center gap-3">
          <Link
           to="/login"
           className="border border-slate-700 px-4 py-2 rounded-lg hover:border-teal-400 transition"
           > 
          Sign In
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;