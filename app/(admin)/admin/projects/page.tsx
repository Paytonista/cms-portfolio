"use client";

import DashboardProjectPanel from "@/app/components/DashboardProjectPanel";
import { useEffect, useState } from "react";
import ExperienceModalForm from "@/app/components/ExperienceModalForm";
import { UploadButton } from "@/app/components/uploadthing";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { Upload } from "lucide-react";

interface Project {
  id : string;
  project_name: string;
  details: string;
  highlight_image: string;
  tooltip_images: string[];
  tech_skills: { TechnologyName: string }[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  {"Pagination"}

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const limit = 5;

  const [formdata, SetFormData] = useState({
      project_name: "",
      details: "",
      highlight_image: "",
      tooltip_images: [] as string[],
      tech_skills: [] as string[],
  })

  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [editProject, setEditProject] =  useState<Project | null> (null);

  useEffect(() => {
    fetch("/api/admin/skills")
      .then((res) => res.json())
      .then((data) => setAvailableSkills(data.map((s: any) => s.TechnologyName)));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/projects?page=${page}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(
          data.projects.map((project: any) => ({
            ...project,
          }))
        );
        setTotalPages(data.totalPages);
        setLoading(false);
      });
      
  }, [page]);

  const handleSubmit = async (e: React.FormEvent) => {
      const method = editProject ? "PATCH" : "POST";
    
      e.preventDefault();
      const req = await fetch("/api/admin/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(editProject && { id: editProject.id }),
          ...formdata,
          tech_skills: formdata.tech_skills.map((name) => ({ TechnologyName: name })),
        }),
      });
      if(req.ok) {
        setShowForm(false);
        setEditProject(null);
        window.location.reload();
      }
  };


  
  return (
    <div className="min-h-screen px-7 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-[#041423] text-white rounded hover:bg-blue-700">
          Add Entry
        </button>
        <ExperienceModalForm
            isOpen={showForm}
            onClose={() => setShowForm(false)}
            title={editProject ? "Edit Project" : "Add Project"}
        >
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Project Name</label>
              <input
                required
                type="text"
                value={formdata.project_name}
                onChange={(e) => SetFormData({ ...formdata, project_name: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
           </div>
           <div>
              <label className="block text-xs text-slate-500 mb-1">Project Details</label>
              <input
                required
                type="text"
                value={formdata.details}
                onChange={(e) => SetFormData({ ...formdata, details: e.target.value })}
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
           <label className=" text-xs text-slate-500">Highlight Image</label>
           <div className="flex flex-col justify-center items-center">
              
              <UploadButton
                endpoint="hightlight_image"
                onClientUploadComplete={(res) => {
                  SetFormData({ ...formdata, highlight_image: res[0].url });
                }}
                onUploadError={() => alert("Upload failed")}
              />       
            {formdata.highlight_image && (
              <div className="mt-2 relative w-48 aspect-video rounded-lg overflow-hidden border border-slate-300">
                <img
                  src={formdata.highlight_image}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => SetFormData({ ...formdata, highlight_image: "" })}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                >
                  &times;
                </button>
              </div>
            )}
            
           </div>
            <label className="block text-xs text-slate-500 mb-1">Carousel Image ( Maximum of 4 images)</label>
           <div className="flex flex-col justify-center items-center">
              <UploadButton
  endpoint="carousel_images"
  onClientUploadComplete={(res) => {
    // Append new URLs to the array (max 4)
    const newUrls = res.map((file) => file.url);
    SetFormData({
      ...formdata,
      tooltip_images: [...formdata.tooltip_images, ...newUrls].slice(0, 4),
    });
  }}
  onUploadError={() => alert("Upload failed")}
/>

{/* Show all images in the array */}
{formdata.tooltip_images.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-2">
    {formdata.tooltip_images.map((url, i) => (
      <div key={url} className="relative w-24 aspect-video rounded-lg overflow-hidden border border-slate-300">
        <img src={url} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
        <button
          type="button"
          onClick={() =>
            SetFormData({
              ...formdata,
              tooltip_images: formdata.tooltip_images.filter((_, idx) => idx !== i),
            })
          }
          className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center"
        >
          &times;
        </button>
      </div>
    ))}
  </div>
)}
          
            <div className="flex flex-col justify-center items-center">
              
              

            
           </div>
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
        {projects.map((project) => (
          <DashboardProjectPanel
            key={project.id}
            {...project}
            onEdit={(project) => {
              setEditProject(project);
              SetFormData({
              project_name: project.project_name,
              details: project.details,
              highlight_image: project.highlight_image,
              tooltip_images: project.tooltip_images,
              tech_skills: project.tech_skills.map((s) => s.TechnologyName),
            });
              setShowForm(true);

            }}
            onDelete={(id) => {
              if(confirm("Delete this project")) {
                fetch(`/api/admin/experience?id=${id}`, {method : "DELETE"})
                  .then((req) => {
                      if (req.ok) setProjects((prev) => prev.filter((e) => e.id !== id));
                  });
              }
            }}
          />
        ))}
      </div>
     <div className="flex items-center justify-between mt-6 px-2">
        <p className="text-sm text-slate-500">
          Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-[#041423] text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-[#041423] text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
      
    </div>
  );
}