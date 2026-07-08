"use client";

import { useEffect, useState } from "react";
import DashboardPanel from "@/app/components/DashboardPanel";
import { Plus } from "lucide-react";

interface Skill {
  TechnologyName: string;
  _count: {
    TechnologyName: number;
  };
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
    fetch("/api/admin/skills")
      .then((response) => response.json())
      .then((data) => setSkills(data));
  }, []);
  


  return (
    <div className="min-h-screen px-7 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Skills</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#041423] text-white rounded hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>
      
        {skills.length === 0 ? (
          <p className="p-4 text-slate-500">No skills found.</p>
        ) : (
          <div className="flex flex-wrap gap-3 p-4">
            {skills.map((skill) => (
              <div
                key={skill.TechnologyName}
                className="rounded-xl px-4 py-2 bg-[#0F4C75] flex flex-col items-center"
              >
                <span className="text-[#BBE1FA] font-bold text-sm">{skill.TechnologyName}</span>
                <span className="text-[#BBE1FA]/60 text-xs">Used {skill._count.TechnologyName}x</span>
              </div>
            ))}
          </div>
        )}
      
    </div>
  );
}
