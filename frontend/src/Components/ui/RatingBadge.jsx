function RatingBadge({ rating }) {
  const styles = {
    Excellent:
      "bg-green-500/10 text-green-400 border border-green-500/20",

    Good:
      "bg-blue-500/10 text-blue-400 border border-blue-500/20",

    Average:
      "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",

    Poor:
      "bg-red-500/10 text-red-400 border border-red-500/20",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[rating] ||
        "bg-slate-800 text-slate-400 border border-slate-700"
      }`}
    >
      {rating}
    </span>
  );
}

export default RatingBadge;