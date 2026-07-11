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
 
  const [experiences, total] = await Promise.all([
    await prisma.experience.findMany({
        orderBy: { created_at: "desc" },
        include: { tech_skills: true },
        take: limit,                      
        skip: skip,                       
      }),
      prisma.experience.count(),
  ]);

  return NextResponse.json({ experiences, total, page, totalPages: Math.ceil(total / limit) }, { status: 200 });
  
}