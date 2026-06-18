import Card from "./Card";

function WorkflowStep({
  step,
  title,
  description,
}) {
  return (
    <Card>

      <div className="flex items-center justify-between mb-6">

        <div className="w-12 h-12 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
          <span className="text-teal-400 font-bold">
            {step}
          </span>
        </div>

        <div className="h-px flex-1 bg-slate-800 ml-4"></div>

      </div>

      <h3 className="text-xl font-semibold text-white mb-3">
        {title}
      </h3>

      <p className="text-slate-400 leading-relaxed">
        {description}
      </p>

    </Card>
  );
}

export default WorkflowStep;