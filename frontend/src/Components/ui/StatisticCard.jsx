import Card from "./Card";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function StatisticCard({
  value,
  label,
}) {
  const numberRef = useRef(null);

  useEffect(() => {
    let endValue = 0;

    if (value === "25+") endValue = 25;
    if (value === "100+") endValue = 100;
    if (value === "15+") endValue = 15;
    if (value === "50+") endValue = 50;

    const counter = { value: 0 };

    gsap.to(counter, {
      value: endValue,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent =
            Math.floor(counter.value) + "+";
        }
      },
    });
  }, [value]);

  return (
    <Card>
      <div className="mb-4">
        <div className="w-12 h-1 rounded-full bg-teal-500"></div>
      </div>

      <h3
        ref={numberRef}
        className="text-5xl font-bold text-teal-400 mb-4"
      >
        0+
      </h3>

      <p className="text-slate-400 text-lg">
        {label}
      </p>
    </Card>
  );
}

export default StatisticCard;