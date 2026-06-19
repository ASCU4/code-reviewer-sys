import { Link } from "react-router-dom";

function UserLogin() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="w-full max-w-md p-8 rounded-2xl border border-slate-800 bg-slate-900">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-slate-400 mt-2">
            Sign in to access CodeLens AI
          </p>
        </div>

        <form className="space-y-5">

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-teal-400"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-teal-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-black font-semibold py-3 rounded-lg hover:bg-teal-400 transition"
          >
            Sign In
          </button>

        </form>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account?

          <Link
            to="/signup"
            className="text-teal-400 ml-2 hover:text-teal-300"
          >
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}

export default UserLogin;