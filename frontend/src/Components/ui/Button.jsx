function Button({
  children,
  variant = "primary",
}) {
  const baseClasses =
    "px-6 py-3 rounded-xl font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-teal-500 text-black hover:scale-105",

    secondary:
      "border border-slate-700 text-white hover:bg-slate-800",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;