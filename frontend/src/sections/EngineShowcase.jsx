import SectionHeader from "../components/common/SectionHeader";
import FeatureCard from "../components/ui/FeatureCard";
import { engineData } from "../utils/engineData";
import { useRef } from "react";
import useRevealAnimation from "../hooks/useRevealAnimation";

function EngineShowcase() {
  const sectionRef = useRef(null);

  useRevealAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="engine"
      className="py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <SectionHeader
          label="AI Review Engine"
          title="Understand your codebase before it breaks."
          description="CodeLens AI analyzes architecture, security and performance in seconds."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {engineData.map((item) => (
            <FeatureCard
              key={item.id}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default EngineShowcase;