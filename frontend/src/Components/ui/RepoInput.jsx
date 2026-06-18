import Button from "./Button";

function RepoInput() {
  return (
    <div className="flex flex-col md:flex-row max-w-3xl mx-auto mt-10 rounded-xl border border-slate-800 overflow-hidden bg-slate-900">

      <input
        type="text"
        placeholder="Paste your GitHub repository URL..."
        className="flex-1 px-5 py-4 bg-transparent outline-none text-white"
      />

      <div className="p-2">
        <Button variant="primary">
          Analyze Now
        </Button>
      </div>

    </div>
  );
}

export default RepoInput;