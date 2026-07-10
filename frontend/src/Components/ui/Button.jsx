function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  onClick,
}) {
  const baseClasses =
    "rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-teal-500 text-black hover:scale-105",
    secondary: "border border-slate-700 text-white hover:bg-slate-800",
    ghost: "text-slate-300 hover:bg-slate-800",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

export default Button;
