import Navbar from "../components/layout/Navbar";
import Hero from "../sections/Hero";
import EngineShowcase from "../sections/EngineShowcase";
import ProblemSolution from "../sections/ProblemSolution";
import Footer from "../sections/Footer";
import Features from "../sections/Features";
import Workflow from "../sections/Workflow";
import Analytics from "../sections/Analytics";
import Testimonials from "../sections/Testimonials";
import CTA from "../sections/CTA";


function Home() {
  return (
    <>
      <Navbar />

      <Hero />
      <EngineShowcase />
      <ProblemSolution />
      <Features />
      <Workflow />
      <Analytics />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;