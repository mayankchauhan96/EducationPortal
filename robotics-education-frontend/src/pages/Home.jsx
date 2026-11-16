import { Suspense, lazy } from "react";

const Hero = lazy(() => import("../components/home/Hero"));
const InnovationImpactSection = lazy(() => import("../components/home/InnovationImpactSection"));
const Skills = lazy(() => import("../components/home/Skills"));
const Curriculum = lazy(() => import("../components/home/Curriculum"));
const Projects = lazy(() => import("../components/home/Projects"));
const HomeCommunityPreview = lazy(() => import("../components/home/HomeCommunityPreview"));
const TechnologyCurriculum = lazy(() => import("../components/home/TechnologyCurriculum"));
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
    <main className="home-page">
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
        <Curriculum />
      </LazySection>
      <LazySection>
        <Projects limit={3} />
      </LazySection>
      <LazySection>
        <HomeCommunityPreview />
      </LazySection>
      <LazySection>
        <TechnologyCurriculum />
      </LazySection>
      <LazySection>
        <FinalCta />
      </LazySection>
    </main>
  );
}