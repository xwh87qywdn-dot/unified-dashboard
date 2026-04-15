import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const { type, ip, userAgent, details } = body as {
    type?: unknown;
    ip?: unknown;
    userAgent?: unknown;
    details?: unknown;
  };

  if (typeof type !== "string" || !type) {
    return Response.json({ error: "Invalid or missing 'type'" }, { status: 400 });
  }

  const log = await prisma.activityLog.create({
    data: {
      type,
      ip: typeof ip === "string" ? ip : null,
      userAgent: typeof userAgent === "string" ? userAgent : null,
      details: typeof details === "string" ? details : null,
    },
  });

  return Response.json(log);
}
