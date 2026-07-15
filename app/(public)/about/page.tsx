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
   const scrollContainerRef = useRef<HTMLDivElement | null>(null);
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
       { root: scrollContainerRef.current, threshold: 0, rootMargin: "-45% 0px -45% 0px" }
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
    
    <main className="lg:h-[calc(100vh-5rem)] font-raleway z-2">
        <div className="flex flex-col px-5 py-5
                        md:flex-row md:px-20 md:py-15
                        lg:flex-row lg:px-30 lg:py-20 h-full">
            <div className="w-full md:w-90 lg:w-96 flex-shrink-0 flex flex-col h-full">
              
                <h1 className="text-[#ffffff] font-bold text-4xl
                                 lg:text-5xl   lg:mb-3 ">
                  Kenneth Rabina
                </h1>
                <p className="text-[#d6d6d6] 
                  lg:text-md mb-1">Computer Science Graduate</p>
                <p className="text-[#989898] text-xs">Passionate about software development, technology, and creating user-focused applications. Always eager to learn, build, and grow as a developer.</p>
                <div className=" flex flex-row order-2 justify-between
                  lg:flex-col lg:mt-4 lg:order-1">
                  <PortfolioButton isActive={activeSection === "aboutme"} onClick={() => scrollToSection("aboutme")} >About Me</PortfolioButton>
                  <PortfolioButton isActive={activeSection === "experience"} onClick={() => scrollToSection("experience")}>Experiences</PortfolioButton>
                  <PortfolioButton isActive={activeSection === "projects"} onClick={() => scrollToSection("projects")}>Projects</PortfolioButton>
                </div>
                <div className="order-1
                lg:mt-50 lg:order-2">
                  <div className="mt-2 lg:mt-6 flex p-1 ">
                    <a href="https://www.facebook.com/kenneth.rabina.3" className="px-1 py-1 " target="_blank">
                      <img src="https://img.icons8.com/?size=100&id=118467&format=png&color=FFFFFF" className="w-5 h-5 lg:w-12 lg:h-12"></img>
                    </a>
                    <a href="https://github.com/Paytonista" className="px-1 py-1  " target="_blank">
                      <img src="https://img.icons8.com/?size=100&id=12599&format=png&color=FFFFFF" className="w-5 h-5 lg:w-12 lg:h-12"></img>
                    </a>
                    <a href="https://www.linkedin.com/in/kenneth-rabina-856b4a244/" className="px-1 py-1  " target="_blank">
                      <img src="https://img.icons8.com/?size=100&id=8808&format=png&color=FFFFFF" className="w-5 h-5 lg:w-12 lg:h-12"></img>
                    </a> 
                 </div>
                 <p className="text-[#fdfdfd4e] text-xs m-1">Built with Next.js and a custom CMS developed by Kenneth Rabina.</p>
                </div>
             
            </div>
          <div ref={scrollContainerRef} className="flex-1 flex flex-col max-w-full overflow-y-auto h-full pl-2 md:pl-15 lg:pl-35 no-scrollbar">
            <section id ="aboutme" ref={aboutRef} > 
              <div className="mb-15 text-xs lg:text-lg text-justify leading-loose space-y-4">
                  <div> 
                    <p>
                      Aspiring software developer with a strong interest in building practical, user-focused applications. 
                      I enjoy solving problems through code and turning ideas into reliable software — whether that's web development, backend systems, or cybersecurity.
                    </p>
                  </div>
                  <p>
                    I have experience developing full-stack applications using modern technologies such as 
                    React, Next.js, TypeScript, FastAPI, Python, and SQL databases. Through personal and academic 
                    projects, I've strengthened my understanding of software design, API development, database management, 
                    and responsive user interfaces while focusing on writing clean, maintainable, and scalable code.
                  </p>
           
                  <p>
                    I'm currently seeking opportunities in software engineering, 
                    programming, or cybersecurity where I can contribute, continue learning, 
                    and grow alongside experienced professionals.
                  </p>
                </div>
            </section>
            <section id ="experience" ref={experienceRef}> 
              <div className="my-10">
                {experiences.map((experience) => (
                    <ExperienceCard key={experience.id} {...experience}></ExperienceCard>
                ))}

                <p><a href="/resume/rabina_kenneth_c_resume1.pdf" target="_blank" rel="noreferrer">View Resume</a></p>
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