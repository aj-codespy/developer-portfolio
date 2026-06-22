import Navbar from "@/components/Navbar";
import FeaturedProjects from "@/components/FeaturedProjects";
import SocialsBar from "@/components/SocialsBar";
import DotGrid from "@/components/DotGrid";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";

export const metadata = {
  title: "Work & Experience | Ayush Jha Portfolio (AI Engineer)",
  description: "Explore the complete portfolio of AI agents, LangGraph workflows, full-stack applications, and machine learning models shipped by Ayush Jha.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen relative">
      <DotGrid />
      <Navbar />
      <div className="pt-24 flex flex-col gap-2"> {/* Top offset to avoid navbar overlapping */}
        <Experience />
        <Achievements />
        <FeaturedProjects showViewAll={false} title="All Crafted Software" />
      </div>
      <SocialsBar />
    </main>
  );
}
