import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

const ALLOWED_TYPES = new Set(["login", "action"]);

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const type = typeof body.type === "string" ? body.type : undefined;
  if (!type || !ALLOWED_TYPES.has(type)) {
    return Response.json(
      { error: "Invalid or missing 'type'. Allowed values: login, action." },
      { status: 400 },
    );
  }

  // Resolve client IP from proxy headers or the socket address
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    null;

  const log = await prisma.activityLog.create({
    data: {
      type,
      ip,
      userAgent:
        typeof body.userAgent === "string" ? body.userAgent.slice(0, 512) : null,
      details:
        typeof body.details === "string" ? body.details.slice(0, 1000) : null,
    },
  });

  return Response.json(log);
}
