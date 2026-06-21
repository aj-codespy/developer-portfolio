"use client";

import { motion } from "framer-motion";
import { Award, BarChart2, Trophy, Zap } from "lucide-react";

interface Achievement {
  position: string;
  competition: string;
  organizer: string;
  details: string;
}

interface CodingPlatform {
  name: string;
  rating: string;
  title: string;
  solved: string;
  percentile: string;
  color: string;
  profileUrl: string;
}

const platforms: CodingPlatform[] = [
  {
    name: "LeetCode",
    rating: "1920",
    title: "Knight",
    solved: "800+ Problems",
    percentile: "Top 4.5% globally",
    color: "border-yellow-500/20 text-yellow-600 bg-yellow-500/5",
    profileUrl: "https://leetcode.com/u/aj_codess/"
  },
  {
    name: "Codeforces",
    rating: "1480",
    title: "Specialist",
    solved: "300+ Problems",
    percentile: "Active Contestant",
    color: "border-blue-500/20 text-blue-600 bg-blue-500/5",
    profileUrl: "https://codeforces.com/profile/aj.codes.py"
  },
  {
    name: "CodeChef",
    rating: "1720",
    title: "3-Star",
    solved: "250+ Problems",
    percentile: "Top 8% globally",
    color: "border-emerald-500/20 text-emerald-600 bg-emerald-500/5",
    profileUrl: "https://www.codechef.com/users/aj_codespy"
  }
];

const achievements: Achievement[] = [
  {
    position: "1st Place (Winner)",
    competition: "Pune District HackFest 2024",
    organizer: "MMCOE Pune",
    details: "Built and pitched a real-time hospital bed allocation system under 36 hours."
  },
  {
    position: "2nd Place",
    competition: "Pune Smart City Hackathon",
    organizer: "Pune Municipal Corporation",
    details: "Designed a decentralized citizen grievance dashboard utilizing natural language processing."
  },
  {
    position: "1st Place",
    competition: "DevDeities NFC Sprint",
    organizer: "Buildspace Community",
    details: "Developed a WebSockets-based monitor for real-time tracking of NFC transactions."
  },
  {
    position: "Finalist (Top 10)",
    competition: "National Smart India Hackathon",
    organizer: "Ministry of Education, Govt of India",
    details: "Architected a scalable solution for rural education content distribution offline."
  },
  {
    position: "1st Place",
    competition: "CodeDev Hackathon",
    organizer: "RHV Group Sprints",
    details: "Built an automated data preprocessing and formatting agent for model training sets."
  },
  {
    position: "3rd Place",
    competition: "ByteSynergy Hackathon",
    organizer: "Aligned Automation",
    details: "Developed a LangGraph validation prototype for enterprise system workflows."
  },
  {
    position: "1st Place (Winner)",
    competition: "Innovate Pune Coding Battle",
    organizer: "COEP Pune Tech Festival",
    details: "Optimized complex algorithmic routing solutions under strict memory limitations."
  },
  {
    position: "Elite Division",
    competition: "LeetCode Biweekly Sprints",
    organizer: "LeetCode Official",
    details: "Placed inside top 2% of 40,000+ global participants in contest metrics."
  }
];

export default function Achievements() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 font-mono">
      <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 md:p-8 border border-black/5 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-accent-blue mb-4 font-bold">
          // COMPETITIVE PROGRAMMING & HONORS
        </p>
        <h2 className="font-display text-3xl font-extrabold text-dark-card mb-8 tracking-tight">
          Ratings & Achievements
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column — Coding Platform Ratings */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-dark-card border-b border-black/5 pb-2 mb-2 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-accent-blue" />
              Platform Standings
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              {platforms.map((plat) => (
                <a
                  key={plat.name}
                  href={plat.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-2xl p-5 border border-black/5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-display font-bold text-sm text-dark-card group-hover:text-accent-blue transition-colors">
                      {plat.name}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${plat.color}`}>
                      {plat.title}
                    </span>
                  </div>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-dark-card tracking-tight">
                      {plat.rating}
                    </span>
                    <span className="text-[10px] text-muted-text font-bold uppercase tracking-wider">
                      Max Rating
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-black/5 text-xs text-gray-500">
                    <span>{plat.solved}</span>
                    <span className="text-[10px] bg-black/5 text-dark-card font-mono px-2 py-0.5 rounded">
                      {plat.percentile}
                    </span>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="bg-dark-card text-white p-5 rounded-2xl border border-white/5 shadow-md mt-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-accent-blue uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5" />
                  ALGORITHMIC CORE
                </h4>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Solving complex problems isn't just about syntax. It's about data structures, time complexity bounds, and designing correct algorithms under pressure. My standings validate my capability to write highly optimized, correct code.
                </p>
              </div>
              <p className="text-[10px] text-gray-500 mt-4 leading-tight font-mono">
                // Solved 1350+ algorithmic problems across all platforms.
              </p>
            </div>
          </div>

          {/* Right Column — Competition Wins & Honors List */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-dark-card border-b border-black/5 pb-2 mb-2 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-accent-blue" />
              Competition Wins & Placement
            </h3>

            <div className="bg-white rounded-2xl border border-black/5 shadow-sm divide-y divide-black/5 overflow-hidden">
              <div className="max-h-[520px] overflow-y-auto scrollbar-none">
                {achievements.map((ach, idx) => (
                  <div key={idx} className="p-4 hover:bg-gray-50/50 transition-colors flex gap-4 items-start">
                    <div className="bg-accent-blue/10 text-accent-blue p-2 rounded-lg shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                        <h4 className="text-xs font-bold text-dark-card truncate">
                          {ach.position}
                        </h4>
                        <span className="text-[10px] font-bold text-accent-blue shrink-0">
                          @{ach.organizer}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-dark-card mb-0.5">
                        {ach.competition}
                      </p>
                      <p className="text-[11px] text-muted-text leading-relaxed">
                        {ach.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
