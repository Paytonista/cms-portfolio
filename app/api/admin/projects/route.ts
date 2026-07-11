// Import NextResponse to send back HTTP responses (JSON, status codes, etc.)
import { NextResponse } from "next/server";
// Import Prisma client to talk to PostgreSQL
import { prisma } from "@/lib/prisma";

/**
 * GET — Read data from the database
 * URL example: /api/admin/experience or /api/admin/experience?limit=3
 *
 * Flow:
 *   1. Extract query params (like ?limit=3) from the URL
 *   2. Call prisma to find records from the database
 *   3. Return the data as JSON
 */
export async function GET(req: Request) {


  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("page")) || 1;
  const skip = (page - 1) * limit;

 
 
  const [projects, total] = await Promise.all([
    await prisma.project.findMany({
        orderBy: { created_at: "desc" },
        include: { tech_skills: true },
        take: limit,                      
        skip: skip,                       
      }),
      prisma.project.count(),
  ]);

  const parsed = projects.map((p) => ({
  ...p,
  tooltip_images: JSON.parse(p.tooltip_images || "[]"),
}));

  return NextResponse.json({ projects : parsed, total, page, totalPages: Math.ceil(total / limit) }, { status: 200 });
  
}

export async function POST(req: Request) {

  const body = await req.json();

  for (const skill of body.tech_skills) {
    await prisma.techSkill.upsert({
      where: { TechnologyName: skill.TechnologyName },
      update: {},
      create: { TechnologyName: skill.TechnologyName },
    });
  }

  
 
  const project = await prisma.project.create({
    data: {
        ...body,
        tooltip_images: JSON.stringify(body.tooltip_images || []),
        tech_skills: {
            connect: body.tech_skills.map((skill: { TechnologyName: string }) => ({
                TechnologyName: skill.TechnologyName,
            })),
        },
    }
  });



  return NextResponse.json(project, { status: 201 });
}

export async function PATCH(req: Request) {

  const body = await req.json();

  for (const skill of body.tech_skills) {
    await prisma.techSkill.upsert({
      where: { TechnologyName: skill.TechnologyName },
      update: {},
      create: { TechnologyName: skill.TechnologyName },
    });
  }
 

  const project = await prisma.project.update({
    where: {id: body.id},
    data: {
      ...body,
      tooltip_images: JSON.stringify(body.tooltip_images || []),
      tech_skills: {
        set: body.tech_skills.map((s) => ({ TechnologyName: s.TechnologyName})),
      },
    },
    include: { tech_skills: true },
  })
  return NextResponse.json(project);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}