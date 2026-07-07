"use client";

import DashboardExperiencePanel from "@/app/components/DashboardExperiencePanel";
import { useEffect, useState } from "react";

interface Experience {
  id: string;
  order: string;
  role: string;
  tech_company: string;
  active: boolean;
  start_date: Date;
  end_date: Date;
  location: string;
  job_description: string;
  tech_skills: { TechnologyName: string }[];
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetch("/api/admin/experience")
      .then((response) => response.json())
      .then((data) => 
        setExperiences(
          data.map((exp: any) => ({
            ...exp,
            start_date: new Date(exp.start_date),
            end_date: new Date(exp.end_date),
          }))
        )
      );
  }, []);

  
  return (
    <div className="min-h-screen px-7 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Experience</h1>
        <button className="px-4 py-2 bg-[#041423] text-white rounded hover:bg-blue-700">
          Add Entry
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {experiences.map((experience) => (
          <DashboardExperiencePanel
            key={experience.id}
            {...experience}
          />
        ))}
      </div>
    </div>
  );
}
