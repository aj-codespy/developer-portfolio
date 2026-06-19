import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import TechMarquee from "@/components/TechMarquee";
import FeaturedProjects from "@/components/FeaturedProjects";
import JourneyTimeline from "@/components/JourneyTimeline";
import BlogPreview from "@/components/BlogPreview";
import SocialsBar from "@/components/SocialsBar";
import DotGrid from "@/components/DotGrid";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <DotGrid />
      <Navbar />
      <Hero />
      <BentoGrid />
      <TechMarquee />
      <FeaturedProjects limit={3} />
      <JourneyTimeline />
      <BlogPreview />
      <SocialsBar />
    </main>
  );
}
