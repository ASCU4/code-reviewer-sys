import Button from "../components/ui/Button";
import CodePreview from "../components/ui/CodePreview";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function Hero() {
 const leftRef = useRef(null);
const rightRef = useRef(null);

useEffect(() => {

  gsap.fromTo(
    leftRef.current,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }
  );

  gsap.fromTo(
    rightRef.current,
    {
      opacity: 0,
      x: 100,
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      delay: 0.4,
      ease: "power3.out",
    }
  );

}, []);
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center px-6"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
         <div ref={leftRef}>
          <div className="hero-badge">
            AI Code Intelligence Engine v2.4
          </div>

          <h1 className="hero-title">
            <span className="block">
              Your code has
            </span>

            <span className="block text-teal-400">
              a blind spot.
            </span>
          </h1>

          <p className="hero-sub max-w-xl mt-6">
            CodeLens AI scans every line, every dependency,
            every pattern — and surfaces the bugs,
            security gaps, and architectural debt your
            team can't see.
          </p>

          <div className="mt-8">
            <Button variant="primary">
              Analyze My Code Free
            </Button>
          </div>
        </div>

      <div ref={rightRef}>
         <CodePreview />
       </div>

      </div>
    </section>
  );
}

export default Hero;