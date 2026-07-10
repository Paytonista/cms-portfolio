import { prisma } from "@/lib/prisma";

const experiences = [
  {
    role: "Senior Full Stack Developer",
    tech_company: "TechCorp Solutions",
    active: true,
    start_date: new Date("2024-01-15"),
    end_date: new Date("2026-06-11"),
    location: "Manila, Philippines",
    job_description:
      "Leading development of enterprise-level web applications using React and Node.js. Architected microservices infrastructure serving 500k+ daily users. Mentored a team of 5 junior developers and established CI/CD pipelines reducing deployment time by 60%.",
    tech_skills: {
      connectOrCreate: [
        { where: { TechnologyName: "React" }, create: { TechnologyName: "React" } },
        { where: { TechnologyName: "TypeScript" }, create: { TechnologyName: "TypeScript" } },
        { where: { TechnologyName: "Node.js" }, create: { TechnologyName: "Node.js" } },
        { where: { TechnologyName: "PostgreSQL" }, create: { TechnologyName: "PostgreSQL" } },
        { where: { TechnologyName: "AWS" }, create: { TechnologyName: "AWS" } },
      ],
    },
  },
  {
    role: "Full Stack Developer",
    tech_company: "Digital Innovations Inc.",
    active: false,
    start_date: new Date("2022-03-01"),
    end_date: new Date("2023-12-31"),
    location: "Cebu, Philippines",
    job_description:
      "Built and maintained multiple client-facing web applications. Developed RESTful APIs and integrated third-party services including payment gateways and analytics platforms. Improved application performance by 40% through code optimization and caching strategies.",
    tech_skills: {
      connectOrCreate: [
        { where: { TechnologyName: "React" }, create: { TechnologyName: "React" } },
        { where: { TechnologyName: "JavaScript" }, create: { TechnologyName: "JavaScript" } },
        { where: { TechnologyName: "Express.js" }, create: { TechnologyName: "Express.js" } },
        { where: { TechnologyName: "MongoDB" }, create: { TechnologyName: "MongoDB" } },
        { where: { TechnologyName: "Docker" }, create: { TechnologyName: "Docker" } },
      ],
    },
  },
  {
    role: "Frontend Developer",
    tech_company: "Creative Web Studio",
    active: false,
    start_date: new Date("2021-01-10"),
    end_date: new Date("2022-02-28"),
    location: "Manila, Philippines",
    job_description:
      "Developed responsive and accessible user interfaces for e-commerce and SaaS platforms. Collaborated with UX designers to implement pixel-perfect designs. Introduced component library standards adopted across the organization.",
    tech_skills: {
      connectOrCreate: [
        { where: { TechnologyName: "React" }, create: { TechnologyName: "React" } },
        { where: { TechnologyName: "Tailwind CSS" }, create: { TechnologyName: "Tailwind CSS" } },
        { where: { TechnologyName: "Next.js" }, create: { TechnologyName: "Next.js" } },
        { where: { TechnologyName: "Figma" }, create: { TechnologyName: "Figma" } },
      ],
    },
  },
  {
    role: "Junior Web Developer",
    tech_company: "StartUp Labs PH",
    active: false,
    start_date: new Date("2020-06-01"),
    end_date: new Date("2020-12-31"),
    location: "Davao, Philippines",
    job_description:
      "Assisted in building MVPs for early-stage startups. Implemented frontend features from wireframes and contributed to backend API development. Participated in daily stand-ups and agile sprint planning.",
    tech_skills: {
      connectOrCreate: [
        { where: { TechnologyName: "HTML" }, create: { TechnologyName: "HTML" } },
        { where: { TechnologyName: "CSS" }, create: { TechnologyName: "CSS" } },
        { where: { TechnologyName: "JavaScript" }, create: { TechnologyName: "JavaScript" } },
        { where: { TechnologyName: "PHP" }, create: { TechnologyName: "PHP" } },
        { where: { TechnologyName: "MySQL" }, create: { TechnologyName: "MySQL" } },
      ],
    },
  },
];

const projects = [
  {
    project_name: "E-Commerce Platform",
    details:
      "Built a full-featured e-commerce platform with real-time inventory management, payment gateway integration, and admin dashboard serving 10k+ daily transactions.",
    highlight_image: "https://placehold.co/600x400/0F4C75/BBE1FA?text=E-Commerce",
    tooltip_images: JSON.stringify([]),
    tech_skills: {
      connectOrCreate: [
        { where: { TechnologyName: "Next.js" }, create: { TechnologyName: "Next.js" } },
        { where: { TechnologyName: "TypeScript" }, create: { TechnologyName: "TypeScript" } },
        { where: { TechnologyName: "Stripe" }, create: { TechnologyName: "Stripe" } },
        { where: { TechnologyName: "PostgreSQL" }, create: { TechnologyName: "PostgreSQL" } },
        { where: { TechnologyName: "Docker" }, create: { TechnologyName: "Docker" } },
      ],
    },
  },
  {
    project_name: "Task Management App",
    details:
      "A Kanban-style project management tool with drag-and-drop, real-time collaboration via WebSockets, and role-based access control.",
    highlight_image: "https://placehold.co/600x400/0F4C75/BBE1FA?text=Task+App",
    tooltip_images: JSON.stringify([]),
    tech_skills: {
      connectOrCreate: [
        { where: { TechnologyName: "React" }, create: { TechnologyName: "React" } },
        { where: { TechnologyName: "Node.js" }, create: { TechnologyName: "Node.js" } },
        { where: { TechnologyName: "Socket.io" }, create: { TechnologyName: "Socket.io" } },
        { where: { TechnologyName: "MongoDB" }, create: { TechnologyName: "MongoDB" } },
      ],
    },
  },
  {
    project_name: "Weather Dashboard",
    details:
      "Interactive weather visualization dashboard pulling data from OpenWeather API with historical trends, 7-day forecasts, and location-based alerts.",
    highlight_image: "https://placehold.co/600x400/0F4C75/BBE1FA?text=Weather",
    tooltip_images: JSON.stringify([]),
    tech_skills: {
      connectOrCreate: [
        { where: { TechnologyName: "Next.js" }, create: { TechnologyName: "Next.js" } },
        { where: { TechnologyName: "TypeScript" }, create: { TechnologyName: "TypeScript" } },
        { where: { TechnologyName: "NextAuth" }, create: { TechnologyName: "NextAuth" } },
        { where: { TechnologyName: "Tailwind CSS" }, create: { TechnologyName: "Tailwind CSS" } },
      ],
    },
  },
  {
    project_name: "CMS Portfolio",
    details:
      "Headless CMS-driven portfolio website with admin dashboard, analytics tracking, and dynamic content management for experience and projects.",
    highlight_image: "https://placehold.co/600x400/0F4C75/BBE1FA?text=CMS+Portfolio",
    tooltip_images: JSON.stringify([]),
    tech_skills: {
      connectOrCreate: [
        { where: { TechnologyName: "React" }, create: { TechnologyName: "React" } },
        { where: { TechnologyName: "Chart.js" }, create: { TechnologyName: "Chart.js" } },
        { where: { TechnologyName: "Tailwind CSS" }, create: { TechnologyName: "Tailwind CSS" } },
        { where: { TechnologyName: "REST API" }, create: { TechnologyName: "REST API" } },
      ],
    },
  },
];

const messages = [
  {
    sender: "Sarah Johnson",
    email: "sarah@example.com",
    subject: "Website Redesign Project",
    message:
      "Hi, I'm interested in discussing a complete website redesign for my e-commerce business...",
    starred: true,
    unread: true,
  },
  {
    sender: "Michael Chen",
    email: "michael@tech.com",
    subject: "Re: Portfolio Review",
    message:
      "Thanks for sharing your portfolio. Your work is impressive and I'd like to discuss potential collaboration...",
    starred: false,
    unread: true,
  },
  {
    sender: "Emily Rodriguez",
    email: "emily@creative.io",
    subject: "Freelance Opportunity",
    message:
      "We have an exciting opportunity for a freelance developer to join our team for a 3-month project...",
    starred: true,
    unread: false,
  },
  {
    sender: "David Park",
    email: "david@startup.co",
    subject: "App Development Quote",
    message:
      "Could you provide a quote for developing a mobile app with the following specifications...",
    starred: false,
    unread: false,
  },
  {
    sender: "Lisa Thompson",
    email: "lisa@agency.com",
    subject: "Partnership Proposal",
    message:
      "We're looking to establish partnerships with talented developers. Would you be interested in exploring this...",
    starred: false,
    unread: false,
  },
];

async function main() {
  console.log("Seeding experiences...");
  for (const exp of experiences) {
    const { tech_skills, ...expData } = exp;
    const skills = tech_skills.connectOrCreate;

    for (const skill of skills) {
      await prisma.techSkill.upsert({
        where: { TechnologyName: skill.create.TechnologyName },
        update: {},
        create: { TechnologyName: skill.create.TechnologyName },
      });
    }

    await prisma.experience.create({
      data: {
        ...expData,
        tech_skills: {
          connect: skills.map((s) => ({
            TechnologyName: s.create.TechnologyName,
          })),
        },
      },
    });
  }

  console.log("Seeding projects...");
  for (const project of projects) {
    const { tech_skills, ...projectData } = project;
    const skills = tech_skills.connectOrCreate;

    for (const skill of skills) {
      await prisma.techSkill.upsert({
        where: { TechnologyName: skill.create.TechnologyName },
        update: {},
        create: { TechnologyName: skill.create.TechnologyName },
      });
    }

    await prisma.project.create({
      data: {
        ...projectData,
        tech_skills: {
          connect: skills.map((s) => ({
            TechnologyName: s.create.TechnologyName,
          })),
        },
      },
    });
  }

  console.log("Seeding messages...");
  for (const msg of messages) {
    await prisma.message.create({ data: msg });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });