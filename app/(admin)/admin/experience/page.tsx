"use client";

import DashboardExperiencePanel from "@/app/components/DashboardExperiencePanel";
import { useEffect, useState } from "react";
import ExperienceModalForm from "@/app/components/ExperienceModalForm";

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const limit = 5;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/experience?page=${page}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => 
        setExperiences(
          data.experiences.map((exp: any) => ({
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
        <button 
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-[#041423] text-white rounded hover:bg-blue-700">
          Add Entry
        </button>
        <ExperienceModalForm
            isOpen={showForm}
            onClose={() => setShowForm(false)}
            title="Add Experience"
        >
        <form>
          113
        </form>

        </ExperienceModalForm>
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
