import Card from "./Card";

function FeatureCard({
  title,
  description,
}) {
  return (
    <Card>
      <div className="mb-4 w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
         <span className="text-teal-400 text-xl">
            ✨
           </span>
      </div>

      <h3 className="text-xl font-semibold mb-3 text-white">
        {title}
      </h3>

      <p className="text-slate-400 leading-relaxed">
        {description}
      </p>
    </Card>
  );
}

export default FeatureCard;