import Hero from "../components/home/Hero";
import Skills from "../components/home/Skills";
import Programs from "../components/home/Programs";
import Projects from "../components/home/Projects";
import Curriculum from "../components/home/Curriculum";
import LearningJourney from "../components/home/LearningJourney";
import ForSchools from "../components/home/ForSchools";
import Audiences from "../components/home/Audiences";
import FinalCta from "../components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Programs />
      <Projects />
      <Curriculum />
      <LearningJourney />
      <ForSchools />
      <Audiences />
      <FinalCta />
    </>
  );
}
