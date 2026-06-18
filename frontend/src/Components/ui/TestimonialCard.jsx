import Card from "./Card";

function TestimonialCard({
  name,
  review,
}) {
  return (
    <Card>

      <div className="mb-4 text-yellow-400 text-lg">
        ⭐⭐⭐⭐⭐
      </div>

      <p className="text-slate-300 italic leading-relaxed mb-6">
        "{review}"
      </p>

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
          {name.charAt(0)}
        </div>

        <h4 className="font-semibold text-white">
          {name}
        </h4>

      </div>

    </Card>
  );
}

export default TestimonialCard;