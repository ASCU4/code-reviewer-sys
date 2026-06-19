function Card({ children }) {
  return (
    <div
      className="
        rounded-2xl
        border border-slate-800
        bg-slate-900
        p-6
        transition-all
        duration-300
        hover:border-teal-500/40
        hover:-translate-y-2
      "
    >
      {children}
    </div>
  );
}

export default Card;