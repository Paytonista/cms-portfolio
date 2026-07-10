"use client";

import DashboardExperiencePanel from "@/app/components/DashboardExperiencePanel";
import { useEffect, useState } from "react";
import ExperienceModalForm from "@/app/components/ExperienceModalForm";

interface Experience {
  id: string;
  role: string;
  tech_company: string;
  active: boolean;
  start_date: Date;
  end_date: Date | null;
  location: string;
  job_description: string;
  tech_skills: { TechnologyName: string }[];
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  {"Pagination"}

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const limit = 5;

  const [formdata, SetFormData] = useState({
    role: "",
    tech_company: "",
    active: false,
    start_date: "",
    end_date: "",
    location: "",
    job_description: "",
    tech_skills: [] as string[],
  })

  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [editExperience, setEditExperience] =  useState<Experience | null> (null);

  useEffect(() => {
    fetch("/api/admin/skills")
      .then((res) => res.json())
      .then((data) => setAvailableSkills(data.map((s: any) => s.TechnologyName)));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/experience?page=${page}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        setExperiences(
          data.experiences.map((exp: any) => ({
            ...exp,
            start_date: new Date(exp.start_date),
            end_date: exp.end_date ? new Date(exp.end_date) : null
          }))
        );
        setTotalPages(data.totalPages);
        setLoading(false);
      });
      
  }, [page]);

  const handleSubmit = async (e: React.FormEvent) => {
      const method = editExperience ? "PATCH" : "POST";
    
      e.preventDefault();
      const req = await fetch("/api/admin/experience", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(editExperience && { id: editExperience.id }),
          ...formdata,
          start_date: new Date(formdata.start_date),
          end_date: formdata.end_date ? new Date(formdata.end_date) : null,
          tech_skills: formdata.tech_skills.map((name) => ({ TechnologyName: name })),
        }),
      });
      if(req.ok) {
        setShowForm(false);
        setEditExperience(null);
        window.location.reload();
      }
  };
  
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
            title={editExperience ? "Edit Experience" : "Add Experience"}
        >
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Role</label>
              <input
                required
                type="text"
                value={formdata.role}
                onChange={(e) => SetFormData({ ...formdata, role: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
           </div>
           <div>
              <label className="block text-xs text-slate-500 mb-1">Company</label>
              <input
                required
                type="text"
                value={formdata.tech_company}
                onChange={(e) => SetFormData({ ...formdata, tech_company: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
           </div>
           <div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input

                  type="checkbox"
                  checked={formdata.active}
                  onChange={(e) => SetFormData({ ...formdata, active: e.target.checked })}
                  className="w-4 h-4"
                />
                Currently active
            </label>
           </div>
           
           
            <div>
              <label className="block text-xs text-slate-500 mb-1">Start Date</label>
              <input
                required
                type="date"
                value={formdata.start_date}
                onChange={(e) => SetFormData({ ...formdata, start_date: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
           </div>

           {!formdata.active && 
           <div>
              <label className="block text-xs text-slate-500 mb-1">End Date</label>
              <input
                type="date"
                value={formdata.end_date}
                onChange={(e) => SetFormData({ ...formdata, end_date: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
           </div>}
           
           <div>
              <label className="block text-xs text-slate-500 mb-1">Location</label>
              <input
                required
                type="text"
                value={formdata.location}
                onChange={(e) => SetFormData({ ...formdata, location: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
           </div>
           <div>
              <label className="block text-xs text-slate-500 mb-1">Job Description</label>
              <input
                required
                type="text"
                value={formdata.job_description}
                onChange={(e) => SetFormData({ ...formdata, job_description: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
           </div>
           <div>
            <label className="block text-xs text-slate-500 mb-1 gap-1">Selected Skills</label>
              {formdata.tech_skills.map((skill) => (
                <span className="gap-1 m-1 border border-slate-300 rounded-xl px-3 py-1 text-xs hover:bg-slate-100" key={skill}>{skill}

                <button
                className="gap-1 m-1 my-2"
                type='button'
                onClick={() => SetFormData({...formdata, tech_skills:formdata.tech_skills.filter(s => s !== skill)})}>
                    &times;

                </button>
                </span>
              ))}
           </div>
           <div >
            <label className="block text-xs text-slate-500 mb-1">Available Skills</label>
              {availableSkills 
                .filter((s) => !formdata.tech_skills.includes(s))
                .map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => SetFormData({ ...formdata, tech_skills: [...formdata.tech_skills, skill] })}
                    className="m-1 border border-slate-300 rounded-xl px-3 py-1 text-xs hover:bg-slate-100"
                  >
                  + {skill}
                </button>


                ))}

           </div>
           <div>
            <label className="block text-xs text-slate-500 mb-1">Enter a new skill</label>
            <input
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            placeholder="Type a new skill and press Enter"
            onKeyDown={(e) => {
               if(e.key === "Enter" && e.currentTarget.value) {
                e.preventDefault();
                const newSkill = e.currentTarget.value.trim();
                if(newSkill && !formdata.tech_skills.includes(newSkill)) {
                  SetFormData({ ...formdata, tech_skills: [...formdata.tech_skills, newSkill]});
                }
                e.currentTarget.value = "";
               }
            }}
            
            
            
            />


           </div>

           
           


            <div className="flex justify-end gap-2 pt-2">

              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>

        </ExperienceModalForm>
      </div>
      <div className="flex flex-col gap-4">
        {experiences.map((experience) => (
          <DashboardExperiencePanel
            key={experience.id}
            {...experience}
            onEdit={(experience) => {
              setEditExperience(experience);
              SetFormData({
                role: experience.role,
                tech_company: experience.tech_company,
                active: experience.active,
                start_date: experience.start_date ? new Date(experience.start_date).toISOString().split("T")[0] : "",
                end_date: experience.end_date ? new Date(experience.end_date).toISOString().split("T")[0] : "",
                location: experience.location,
                job_description: experience.job_description,
                tech_skills: experience.tech_skills.map((s) => s.TechnologyName),
              });
              setShowForm(true);

            }}
            onDelete={(id) => {
              if(confirm("Delete this experience")) {
                fetch(`/api/admin/experience?id=${id}`, {method : "DELETE"})
                  .then((req) => {
                      if (req.ok) setExperiences((prev) => prev.filter((e) => e.id !== id));
                  });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
