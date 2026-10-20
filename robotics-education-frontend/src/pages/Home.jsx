import { Suspense, lazy } from "react";

const Hero = lazy(() => import("../components/home/Hero"));
const InnovationImpactSection = lazy(() => import("../components/home/InnovationImpactSection"));
const Skills = lazy(() => import("../components/home/Skills"));
const Programs = lazy(() => import("../components/home/Programs"));
const Projects = lazy(() => import("../components/home/Projects"));
const Curriculum = lazy(() => import("../components/home/Curriculum"));
const LearningJourney = lazy(() => import("../components/home/LearningJourney"));
const ForSchools = lazy(() => import("../components/home/ForSchools"));
const Audiences = lazy(() => import("../components/home/Audiences"));
const HomeCommunityPreview = lazy(() => import("../components/home/HomeCommunityPreview"));
const FinalCta = lazy(() => import("../components/home/FinalCta"));

const LazySection = ({ children }) => (
  <Suspense
    fallback={
      <div className="section min-h-[260px] animate-pulse bg-zinc-50" aria-label="Loading section" />
    }
  >
    {children}
  </Suspense>
);

export default function Home() {
  return (
    <main>
      <LazySection>
        <Hero />
      </LazySection>
      <LazySection>
        <InnovationImpactSection />
      </LazySection>
      <LazySection>
        <Skills />
      </LazySection>
      <LazySection>
        <Programs />
      </LazySection>
      <LazySection>
        <Projects limit={3} />
      </LazySection>
      <LazySection>
        <Curriculum />
      </LazySection>
      <LazySection>
        <LearningJourney />
      </LazySection>
      <LazySection>
        <ForSchools />
      </LazySection>
      <LazySection>
        <Audiences />
      </LazySection>
      <LazySection>
        <HomeCommunityPreview />
      </LazySection>
      <LazySection>
        <FinalCta />
      </LazySection>
    </main>
  );
}