"use client";

import { useRef, useEffect, useState } from "react";


import PortfolioButton from "@/app/components/PortfolioButton";
import ExperienceCard from "@/app/components/ExperienceCard";
import ProjectCard from "@/app/components/ProjectCard";
import MouseGlow from "@/app/components/MouseGlow";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const aboutRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const experiences = [
  {
    id: "1",
    order: "01",
    role: "Senior Full Stack Developer",
    tech_company: "TechCorp Solutions",
    active: true,
    start_date: new Date("2024-01-15"),
    end_date: new Date("2026-06-11"),
    location: "Manila, Philippines",
    job_description:
      "Leading development of enterprise-level web applications using React and Node.js. Architected microservices infrastructure serving 500k+ daily users. Mentored a team of 5 junior developers and established CI/CD pipelines reducing deployment time by 60%.",
    tech_skills: [
      { TechnologyName: "React" },
      { TechnologyName: "TypeScript" },
      { TechnologyName: "Node.js" },
      { TechnologyName: "PostgreSQL" },
      { TechnologyName: "AWS" },
    ],
  },
  {
    id: "2",
    order: "02",
    role: "Full Stack Developer",
    tech_company: "Digital Innovations Inc.",
    active: false,
    start_date: new Date("2022-03-01"),
    end_date: new Date("2023-12-31"),
    location: "Cebu, Philippines",
    job_description:
      "Built and maintained multiple client-facing web applications. Developed RESTful APIs and integrated third-party services including payment gateways and analytics platforms. Improved application performance by 40% through code optimization and caching strategies.",
    tech_skills: [
      { TechnologyName: "React" },
      { TechnologyName: "JavaScript" },
      { TechnologyName: "Express.js" },
      { TechnologyName: "MongoDB" },
      { TechnologyName: "Docker" },
    ],
  },
  {
    id: "3",
    order: "03",
    role: "Frontend Developer",
    tech_company: "Creative Web Studio",
    active: false,
    start_date: new Date("2021-01-10"),
    end_date: new Date("2022-02-28"),
    location: "Manila, Philippines",
    job_description:
      "Developed responsive and accessible user interfaces for e-commerce and SaaS platforms. Collaborated with UX designers to implement pixel-perfect designs. Introduced component library standards adopted across the organization.",
    tech_skills: [
      { TechnologyName: "React" },
      { TechnologyName: "Tailwind CSS" },
      { TechnologyName: "Next.js" },
      { TechnologyName: "Figma" },
    ],
  },
  {
    id: "4",
    order: "04",
    role: "Junior Web Developer",
    tech_company: "StartUp Labs PH",
    active: false,
    start_date: new Date("2020-06-01"),
    end_date: new Date("2020-12-31"),
    location: "Davao, Philippines",
    job_description:
      "Assisted in building MVPs for early-stage startups. Implemented frontend features from wireframes and contributed to backend API development. Participated in daily stand-ups and agile sprint planning.",
    tech_skills: [
      { TechnologyName: "HTML" },
      { TechnologyName: "CSS" },
      { TechnologyName: "JavaScript" },
      { TechnologyName: "PHP" },
      { TechnologyName: "MySQL" },
    ],
  },
  ];

  const projects = [
    {
      project_name: "E-Commerce Platform",
      details: "Built a full-featured e-commerce platform with real-time inventory management, payment gateway integration, and admin dashboard serving 10k+ daily transactions.",
      highlight_image: "",
      tooltip_images: [],
      tech_skills: [
        { TechnologyName: "Next.js" },
        { TechnologyName: "TypeScript" },
        { TechnologyName: "Stripe" },
        { TechnologyName: "PostgreSQL" },
        { TechnologyName: "Docker" },
      ],
    },
    {
      project_name: "Task Management App",
      details: "A Kanban-style project management tool with drag-and-drop, real-time collaboration via WebSockets, and role-based access control.",
      highlight_image: "",
      tooltip_images: [],
      tech_skills: [
        { TechnologyName: "React" },
        { TechnologyName: "Node.js" },
        { TechnologyName: "Socket.io" },
        { TechnologyName: "MongoDB" },
      ],
    },
    {
      project_name: "Weather Dashboard",
      details: "Interactive weather visualization dashboard pulling data from OpenWeather API with historical trends, 7-day forecasts, and location-based alerts.",
      highlight_image: "",
      tooltip_images: [],
      tech_skills: [
        { TechnologyName: "React" },
        { TechnologyName: "Chart.js" },
        { TechnologyName: "Tailwind CSS" },
        { TechnologyName: "REST API" },
      ],
    },
    {
      project_name: "CMS Portfolio",
      details: "Headless CMS-driven portfolio website with admin dashboard, analytics tracking, and dynamic content management for experience and projects.",
      highlight_image: "",
      tooltip_images: [],
      tech_skills: [
        { TechnologyName: "Next.js" },
        { TechnologyName: "TypeScript" },
        { TechnologyName: "NextAuth" },
        { TechnologyName: "Tailwind CSS" },
      ],
    },
  ];

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
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver((entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }), { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));   

    return () => sections.forEach(section => observer.unobserve(section)); // ← cleanup
  }, []);



  return (
    
    <main className="h-[calc(100vh-5rem)] font-raleway z-2" >
        
        <div className="flex flex-row justify-between px-50 py-30">
            <div className="sticky top-20 flex flex-col h-full">
              <div className="flex flex-col h-full" >
                <h1 className="text-5xl font-bold text-[#ffffff] mb-3 whitespace-nowrap">
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
          <div className="flex-1 flex flex-col px-15 mx-15 ">
            <section id ="aboutme" ref={aboutRef}> 
              <div className="mb-15 text-lg">
                  <p>I’m a frontend engineer with an expertise in building accessible, pixel-perfect user interfaces. I take pride in crafting thoughtful, inclusive products and have a sharp eye for the little details that elevate user experience. I do my best work at the intersection of design and engineering, where great UX meets clean, scalable code.</p>
                  <br/>
                  <p>Currently, I'm on the component library team at Klaviyo, where I maintain and evolve the company's design system. I lead engineering efforts across components, tooling, and patterns, partnering closely with designers and engineers to ensure accessibility is built into the foundation of our products.</p>
                  <br/>
                  <p>Currently, I'm on the component library team at Klaviyo, where I maintain and evolve the company's design system. I lead engineering efforts across components, tooling, and patterns, partnering closely with designers and engineers to ensure accessibility is built into the foundation of our products.</p>
                  <br/>
                  <p>Currently, I'm on the component library team at Klaviyo, where I maintain and evolve the company's design system. I lead engineering efforts across components, tooling, and patterns, partnering closely with designers and engineers to ensure accessibility is built into the foundation of our products.</p>
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
        <MouseGlow />
    </main>
  );
}