"use client";

import { useRef, useEffect, useState } from "react";


import PortfolioButton from "@/app/components/PortfolioButton";
import ExperienceCard from "@/app/components/ExperienceCard";
import ProjectCard from "@/app/components/ProjectCard";
import MouseGlow from "@/app/components/MouseGlow";
import GridBackground from "@/app/components/GridBackground";

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

interface Project {
  id : string;
  project_name: string;
  details: string;
  highlight_image: string;
  tooltip_images: string[];
  tech_skills: { TechnologyName: string }[];
}


export default function Home() {
  const [activeSection, setActiveSection] = useState("aboutme");
  const aboutRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [editExperience, setEditExperience] =  useState<Experience | null> (null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const limit = 5;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const scrollToSection = (section: string) => {
    const options: ScrollIntoViewOptions = {
      behavior: "smooth",
      block: "start",
    };

  if (section === "aboutme") aboutRef.current?.scrollIntoView(options);
  if (section === "experience") experienceRef.current?.scrollIntoView(options);
  if (section === "projects") projectsRef.current?.scrollIntoView(options);
};

  useEffect(() => {
    fetch("/api/public/skills")
      .then((res) => res.json())
      .then((data) => setAvailableSkills(data.map((s: any) => s.TechnologyName)));
  }, []);

    useEffect(() => {
      if (loading) return; // wait until data (and therefore section heights) are settled

      const sections = document.querySelectorAll("section");
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

          if (visible) setActiveSection(visible.target.id);
        },
        { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
      );

      sections.forEach((section) => observer.observe(section));
      return () => sections.forEach((section) => observer.unobserve(section));
    }, [loading, experiences, projects]);


  useEffect(() => {
    setLoading(true);
    fetch(`/api/public/experience?page=${page}&limit=${limit}`)
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
  

    useEffect(() => {
    setLoading(true);
    fetch(`/api/public/projects?page=${page}&limit=${limit}`)
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

  return (
    
    <main className="h-[calc(100vh-5rem)] font-raleway z-2 overflow-y-auto" >
        <div className="flex flex-row justify-between px-30 py-20 items-start">
            <div className="sticky top-20 flex flex-col h-[calc(100vh-10rem)]  w-96">
              <div className="flex flex-col" >
                <h1 className="text-5xl font-bold text-[#ffffff] mb-3 ">
                  Kenneth Rabina
                </h1>
                <p className="text-[#d6d6d6] text-md mb-1">Computer Science Graduate</p>
                <p className="text-[#989898] text-xs">Passionate about software development, technology, and creating user-focused applications. Always eager to learn, build, and grow as a developer.</p>
                <div className="mt-4">
                  
                  <PortfolioButton isActive={activeSection === "aboutme"} onClick={() => scrollToSection("aboutme")} >About Me</PortfolioButton>
                  <PortfolioButton isActive={activeSection === "experience"} onClick={() => scrollToSection("experience")}>Experiences</PortfolioButton>
                  <PortfolioButton isActive={activeSection === "projects"} onClick={() => scrollToSection("projects")}>Projects</PortfolioButton>
                </div>
                <div className=" mt-50">
                  <div className="mt-6 flex  ">
                    <a href="https://www.facebook.com/kenneth.rabina.3" className="px-1 py-1 " target="_blank">
                      <img src="https://img.icons8.com/?size=100&id=118467&format=png&color=FFFFFF" className="w-10 h-10"></img>
                    </a>
                    <a href="https://github.com/Paytonista" className="px-1 py-1  " target="_blank">
                      <img src="https://img.icons8.com/?size=100&id=12599&format=png&color=FFFFFF" className="w-10 h-10"></img>
                    </a>
                    <a href="https://www.linkedin.com/in/kenneth-rabina-856b4a244/" className="px-1 py-1  " target="_blank">
                      <img src="https://img.icons8.com/?size=100&id=8808&format=png&color=FFFFFF" className="w-10 h-10"></img>
                    </a> 
                    
                 </div>
                 <p className="text-[#fdfdfd4e] text-xs m-1">Built with Next.js and a custom CMS developed by Kenneth Rabina.</p>
                </div>
              </div>
            </div>
          <div className="flex-1 flex flex-col max-w-full overflow-hidden pl-45">
            <section id ="aboutme" ref={aboutRef}> 
              <div className="mb-15 text-md">
                  <p>I'm an aspiring software developer with a strong interest in building practical, user-focused applications 
                    and continuously expanding my skills across different areas of technology. I enjoy solving problems through code,
                     exploring new tools and frameworks, and turning ideas into reliable software solutions. 
                     Whether it's web development, backend systems, or cybersecurity, I'm always eager to learn and take
                      on new challenges.</p>
                  <br/>
                  <p>I have experience developing full-stack applications using modern technologies such as 
                    React, Next.js, TypeScript, FastAPI, Python, and SQL databases. Through personal and academic 
                    projects, I've strengthened my understanding of software design, API development, database management, 
                    and responsive user interfaces while focusing on writing clean, maintainable, and scalable code.</p>
                  <br/>
                  <p>I'm currently seeking opportunities in software engineering, 
                    programming, or cybersecurity where I can contribute, continue learning, 
                    and grow alongside experienced professionals.</p>
                  <br/>
                </div>
            </section>
            <section id ="experience" ref={experienceRef}> 
              <div className="my-10">
                {experiences.map((experience) => (
                    <ExperienceCard key={experience.id} {...experience}></ExperienceCard>
                ))}

                <p><a>View Resume</a></p>
              </div>
            </section>

            <section id="projects" ref={projectsRef}>
              <div className="my-10">
                {projects.map((project) => (
                  <ProjectCard key={project.project_name} {...project} />
                ))}
                <p><a href="/works">View All Works</a></p>
              </div>
            </section>
          </div>
        </div>    
        <GridBackground />
        <MouseGlow />
    </main>
  );
}