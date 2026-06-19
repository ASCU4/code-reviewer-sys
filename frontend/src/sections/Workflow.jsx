import SectionHeader from "../components/common/SectionHeader";
import WorkflowStep from "../components/ui/WorkflowStep";
import { workflowData } from "../utils/workflowData";

import { useRef } from "react";
import useRevealAnimation from "../hooks/useRevealAnimation";

function Workflow() {
  const sectionRef = useRef(null);

  useRevealAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="workflow"
      className="py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <SectionHeader
          label="Workflow"
          title="From code to insights in minutes"
          description="A simple process designed for developers."
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {workflowData.map((step) => (
            <WorkflowStep
              key={step.id}
              step={step.step}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Workflow;