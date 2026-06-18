import SectionHeader from "../components/common/SectionHeader";
import StatisticCard from "../components/ui/StatisticCard";

import { analyticsData } from "../utils/analyticsData";

function Analytics() {
  return (
    <section
      id="analytics"
      className="py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <SectionHeader
          label="Analytics"
          title="Insights that help teams move faster"
          description="Track reviews, vulnerabilities and performance trends."
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {analyticsData.map((stat) => (
            <StatisticCard
              key={stat.id}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Analytics;