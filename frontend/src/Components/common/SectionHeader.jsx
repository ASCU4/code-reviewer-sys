function SectionHeader({
  label,
  title,
  description,
}) {
  return (
    <div className="text-center mb-20">

      <div className="inline-flex items-center px-4 py-2 rounded-full border border-teal-500/20 bg-teal-500/5">
        <span className="text-teal-400 text-sm font-semibold uppercase tracking-[0.2em]">
          {label}
        </span>
      </div>

      <h2 className="text-4xl md:text-6xl font-bold mt-6 leading-tight text-white">
        {title}
      </h2>

      <p className="text-slate-400 text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
        {description}
      </p>

    </div>
  );
}

export default SectionHeader;