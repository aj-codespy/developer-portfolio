import Navbar from "@/components/Navbar";
import FeaturedProjects from "@/components/FeaturedProjects";
import SocialsBar from "@/components/SocialsBar";
import DotGrid from "@/components/DotGrid";
import Experience from "@/components/Experience";

export const metadata = {
  title: "Work | Ayush Jha Portfolio",
  description: "A showcase of all the software products, AI tools, and platforms built by Ayush Jha.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen relative">
      <DotGrid />
      <Navbar />
      <div className="pt-24 flex flex-col gap-2"> {/* Top offset to avoid navbar overlapping */}
        <Experience />
        <FeaturedProjects showViewAll={false} title="All Crafted Software" />
      </div>
      <SocialsBar />
    </main>
  );
}
