"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

interface Project {
  name: string;
  description: string;
  pills: string[];
  github: string;
  liveUrl: string;
  logoPath: string;
}

const projects: Project[] = [
  {
    name: "getPlaced",
    description:
      "AI-powered interview prep platform helping students crack tech roles with real-time audio and behavioral feedback.",
    pills: ["Next.js", "FastAPI", "Supabase"],
    github: "https://github.com/aj-codespy/getplaced",
    liveUrl: "https://getplaced.online",
    logoPath: "/logos/getplaced.png",
  },
  {
    name: "Cureify",
    description:
      "Multimodal clinical decision support system utilizing a multi-agent AI architecture to analyze patient records, handwritten notes, and medical images.",
    pills: ["LangGraph", "Multimodal AI", "FastAPI", "React"],
    github: "https://github.com/aj-codespy/Cureify-02",
    liveUrl: "https://cureifyy.streamlit.app",
    logoPath: "/logos/cureify.png",
  },
  {
    name: "FinChat",
    description:
      "AI financial analyst with interactive Plotly visualizations, real-time yFinance metrics, and LangChain-based IPO document Q&A.",
    pills: ["Streamlit", "Gemini API", "LangChain", "yFinance"],
    github: "https://github.com/aj-codespy/FinChat",
    liveUrl: "https://finchat-hackx.streamlit.app",
    logoPath: "/logos/finchat.png",
  },
  {
    name: "Vital",
    description:
      "Real-time medical agentic monitoring system streaming clinical vitals via WebSockets to predict patient risk and alert doctors.",
    pills: ["Next.js", "WebSockets", "Supabase", "Chart.js"],
    github: "https://github.com/aj-codespy/NFC4_DevDeities",
    liveUrl: "",
    logoPath: "/logos/vital.png",
  },
  {
    name: "AI Form Builder",
    description:
      "Dynamic form generator for SMBs that structures, customizes, and renders complete surveys and questionnaires instantly from simple prompts.",
    pills: ["Next.js", "Gemini API", "Tailwind CSS", "Supabase"],
    github: "https://github.com/aj-codespy/AIFormBuilder",
    liveUrl: "https://aj-aiformbuilder.streamlit.app",
    logoPath: "/logos/aiformbuilder.png",
  },
  {
    name: "LawBuddy",
    description:
      "Legal RAG agent trained on the Indian Constitution and acts, translating complex legal terminology into clear, actionable advice.",
    pills: ["LangChain", "Gemini API", "Pinecone", "Python"],
    github: "https://github.com/aj-codespy/LawBuddy",
    liveUrl: "https://aj-law-buddy.streamlit.app",
    logoPath: "/logos/lawbuddy.png",
  },
  {
    name: "Lead Scraper",
    description:
      "Lead scraping automation engine for agencies and freelancers to extract, compile, and export Yelp business leads across multiple countries into downloadable Excel spreadsheets.",
    pills: ["Streamlit", "Python", "BeautifulSoup", "Pandas"],
    github: "https://github.com/aj-codespy/Lead_Scraper",
    liveUrl: "https://lead-scraper.streamlit.app",
    logoPath: "/logos/leadscraper.png",
  },
  {
    name: "Tax Minimisation",
    description:
      "Full-stack gamified learning platform educating students on tax structures, income generation, assets, liabilities, and investment strategies.",
    pills: ["Next.js", "Node.js", "Supabase", "Framer Motion"],
    github: "https://github.com/aj-codespy/tax_minimisation",
    liveUrl: "",
    logoPath: "/logos/taxminimisation.png",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as any,
    },
  }),
};

interface FeaturedProjectsProps {
  limit?: number;
  showViewAll?: boolean;
  title?: string;
  subtitle?: string;
}

export default function FeaturedProjects({
  limit,
  showViewAll = true,
  title = "Crafted Software",
  subtitle = "Featured Projects",
}: FeaturedProjectsProps) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section id="work" className="mx-auto max-w-7xl px-6 pt-16 pb-20">
      {/* Header row */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-text">
            {subtitle}
          </span>
          <h2 className="font-display text-2xl font-black text-dark-card tracking-tight uppercase">
            {title}
          </h2>
        </div>
        {showViewAll && (
          <Link
            href="/work"
            className="flex items-center gap-1 text-sm font-semibold text-accent-blue transition-colors hover:text-accent-blue/80"
          >
            View all work
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {/* Project cards grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {displayedProjects.map((project, i) => (
          <motion.div
            key={project.name}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={cardVariants}
            whileHover={project.liveUrl ? { y: -6 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`overflow-hidden rounded-[2rem] border border-black/5 bg-[#F4F3EF] p-6 flex flex-col justify-between group transition-all duration-300 min-h-[250px] relative ${
              project.liveUrl 
                ? "cursor-pointer hover:bg-[#EDEDE8] hover:shadow-xl hover:shadow-black/5" 
                : "cursor-default"
            }`}
          >
            {/* Top link to liveUrl / project (only if liveUrl exists) */}
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 z-10" 
              />
            )}

            <div className="relative z-0 flex flex-col h-full justify-between">
              <div>
                {/* Header: Icon on Left, Title on Right, GitHub on far Right */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Small square image/icon container */}
                    <div className={`w-12 h-12 rounded-2xl overflow-hidden border border-black/5 flex items-center justify-center shadow-sm relative transition-transform duration-300 ${
                      project.liveUrl ? "group-hover:scale-105" : ""
                    }`}>
                      <img 
                        src={project.logoPath} 
                        alt={`${project.name} logo`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Title & Arrow */}
                    <div className="flex flex-col">
                      <h3 className={`font-display text-lg font-black text-dark-card tracking-tight flex items-center gap-1 transition-colors ${
                        project.liveUrl ? "group-hover:text-accent-blue" : ""
                      }`}>
                        {project.name}
                        {project.liveUrl && (
                          <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-accent-blue" />
                        )}
                      </h3>
                      <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-0.5">
                        {project.pills[0]}
                      </p>
                    </div>
                  </div>

                  {/* GitHub button (above link so it is clickable) */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 border border-black/5 flex items-center justify-center text-gray-500 hover:text-dark-card transition-all hover:scale-110 shadow-sm relative z-20"
                    title="View Source Code"
                  >
                    <GithubIcon className="w-4.5 h-4.5" />
                  </a>
                </div>

                {/* Short Description */}
                <p className="mt-4 text-sm text-gray-500 leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              {/* Footer details: pills */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.pills.map((pill) => (
                  <span
                    key={pill}
                    className="px-2.5 py-1 bg-white/80 text-[10px] font-mono font-bold text-gray-500 rounded-lg border border-black/5 shadow-sm"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
