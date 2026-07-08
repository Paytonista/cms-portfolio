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

  const limit = Number(searchParams.get("limit")) || undefined;

 
  const skills = await prisma.techSkill.groupBy({
    by: ["TechnologyName"],
    _count: { TechnologyName: true},
    orderBy: { TechnologyName: "asc" },            
  });

  return NextResponse.json(skills);
}

export async function POST(req: Request) {

  const body = await req.json();

  const techSkill = await prisma.techSkill.upsert({
    where: { TechnologyName: body.TechnologyName },
    update: {},
    create: { TechnologyName: body.TechnologyName },
  });

  return NextResponse.json(techSkill, { status: 201 });
}