"use client";

import { useEffect, useState } from "react";


import PortfolioButton from "@/app/components/PortfolioButton";
import ExperienceCard from "@/app/components/ExperienceCard";
import ProjectCard from "@/app/components/ProjectCard";
import MouseGlow from "@/app/components/MouseGlow";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver((entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }), { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));   

    return () => sections.forEach(section => observer.unobserve(section)); // ← cleanup
  }, []);



  return (
    
    <main className="min-h-screen font-raleway z-2" >
        
        <div className="flex flex-row justify-between px-40 py-20">
            <div className="sticky top-20 flex flex-col h-full">
              <div className="flex flex-col h-full" >
                <h1 className="text-5xl font-bold text-[#ffffff] mb-3 whitespace-nowrap">
                  Kenneth Rabina
                </h1>
                <p className="text-[#d6d6d6] text-md mb-1">Computer Science Graduate</p>
                <p className="text-[#989898] text-xs">Passionate about software development, technology, and creating user-focused applications. Always eager to learn, build, and grow as a developer.</p>
                <div className="mt-4">
                  
                  <PortfolioButton isActive={activeSection === "aboutme"}>About Me</PortfolioButton>
                  <PortfolioButton isActive={activeSection === "experience"}>Experiences</PortfolioButton>
                  <PortfolioButton isActive={activeSection === "projects"}>Projects</PortfolioButton>
                </div>
                <div className="">
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
                </div>
              </div>
            </div>
          <div className="flex-1 flex flex-col px-15 mx-15 ">
            <section id ="aboutme"> 
              <div className="mb-15">
                  <p>I’m a frontend engineer with an expertise in building accessible, pixel-perfect user interfaces. I take pride in crafting thoughtful, inclusive products and have a sharp eye for the little details that elevate user experience. I do my best work at the intersection of design and engineering, where great UX meets clean, scalable code.</p>
                  <br/>
                  <p>Currently, I'm on the component library team at Klaviyo, where I maintain and evolve the company's design system. I lead engineering efforts across components, tooling, and patterns, partnering closely with designers and engineers to ensure accessibility is built into the foundation of our products.</p>
                  <br/>
                  <p>Currently, I'm on the component library team at Klaviyo, where I maintain and evolve the company's design system. I lead engineering efforts across components, tooling, and patterns, partnering closely with designers and engineers to ensure accessibility is built into the foundation of our products.</p>
                  <br/>
                  <p>Currently, I'm on the component library team at Klaviyo, where I maintain and evolve the company's design system. I lead engineering efforts across components, tooling, and patterns, partnering closely with designers and engineers to ensure accessibility is built into the foundation of our products.</p>
              </div>
            </section>
            <section id ="experience"> 
              <div className="my-10">
                <ExperienceCard />
                <ExperienceCard />
                <p><a>View Resume</a></p>
              </div>
            </section>

            <section id ="projects"> 
              <div>
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <p><a href="/works">View All Works</a></p>
              </div>
            </section>
          </div>
        </div>    
        <MouseGlow />
    </main>
  );
}