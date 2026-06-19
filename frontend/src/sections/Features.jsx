import SectionHeader from "../components/common/SectionHeader";
import FeatureCard from "../components/ui/FeatureCard";
import { featuresData } from "../utils/featuresData";

import { useRef } from "react";
import useRevealAnimation from "../hooks/useRevealAnimation";

function Features() {
  const sectionRef = useRef(null);

  useRevealAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <SectionHeader
          label="Features"
          title="Everything you need for smarter code reviews"
          description="Improve quality, security and performance with AI."
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;