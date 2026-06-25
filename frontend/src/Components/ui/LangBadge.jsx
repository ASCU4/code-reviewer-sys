function LangBadge({ lang }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
      {lang}
    </span>
  );
}

export default LangBadge;