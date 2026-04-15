import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const log = await prisma.activityLog.create({
    data: {
      type: body.type,
      ip: body.ip,
      userAgent: body.userAgent,
      details: body.details,
    },
  });

  return Response.json(log);
}
