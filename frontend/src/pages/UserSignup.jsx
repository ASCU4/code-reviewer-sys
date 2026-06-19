import { Link } from "react-router-dom";

function UserSignup() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="w-full max-w-md p-8 rounded-2xl border border-slate-800 bg-slate-900">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-slate-400 mt-2">
            Start using CodeLens AI today.
          </p>
        </div>

        <form className="space-y-5">

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-teal-400"
            />
          </div>

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
              placeholder="Create a password"
              className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-teal-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-black font-semibold py-3 rounded-lg hover:bg-teal-400 transition"
          >
            Create Account
          </button>

        </form>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?

          <Link
            to="/login"
            className="text-teal-400 ml-2 hover:text-teal-300"
          >
            Sign In
          </Link>
        </p>

      </div>

    </div>
  );
}

export default UserSignup;