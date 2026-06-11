import DashboardExperiencePanel from "@/app/components/DashboardExperiencePanel"

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

export default function ExperiencePage() {
  return (
    <div className="min-h-screen px-7 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Experience</h1>
        <button className="px-4 py-2 bg-[#041423] text-white rounded hover:bg-blue-700">
          Add Entry
        </button>
      </div>
      <div className="flex flex-col gap-4">
       {experiences.map ((experience) =>(
          <DashboardExperiencePanel
            key ={experience.id}
            {...experience}/>
       ))}
      </div>
    </div>
  );
}
