import SectionHeader from "../components/common/SectionHeader";
import InfoCard from "../components/ui/InfoCard";

import {
  problems,
  solutions,
} from "../utils/problemSolutionData";

function ProblemSolution() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <SectionHeader
          label="Problem & Solution"
          title="Why teams need AI code reviews"
          description="Reduce review time, improve quality and catch issues early."
        />

        <div className="grid lg:grid-cols-2 gap-10">

          <div>
            <h3 className="text-2xl font-bold mb-6">
              Problems
            </h3>

            <div className="space-y-6">
              {problems.map((item) => (
                <InfoCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">
              Solutions
            </h3>

            <div className="space-y-6">
              {solutions.map((item) => (
                <InfoCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ProblemSolution;