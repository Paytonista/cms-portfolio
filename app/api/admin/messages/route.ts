
// Import NextResponse to send back HTTP responses (JSON, status codes, etc.)
import { NextResponse } from "next/server";
// Import Prisma client to talk to PostgreSQL
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {


  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("page")) || 1;
  const skip = (page - 1) * limit;


 
  const [messages, total, unread] = await Promise.all([
    await prisma.message.findMany({
        orderBy: { created_at: "desc" },
        take: limit,                      
        skip: skip,                       
      }),
      prisma.message.count(),
      prisma.message.count({where: {unread: true}}),
      
  ]);

  return NextResponse.json({ messages, total, unread, page, totalPages: Math.ceil(total / limit) }, { status: 200 });
  
}

