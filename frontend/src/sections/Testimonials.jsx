import SectionHeader from "../components/common/SectionHeader";
import TestimonialCard from "../components/ui/TestimonialCard";

import { testimonialData } from "../utils/testimonialData";

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <SectionHeader
          label="Testimonials"
          title="Loved by development teams"
          description="See what developers are saying about the platform."
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {testimonialData.map((item) => (
            <TestimonialCard
              key={item.id}
              name={item.name}
              review={item.review}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;