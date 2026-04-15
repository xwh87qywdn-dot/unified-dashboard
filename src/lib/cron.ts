import cron from "node-cron";
import { prisma } from "@/lib/prisma";
import { sendReportEmail } from "./mailer";

cron.schedule("0 5 * * *", async () => {
  const logs = await prisma.activityLog.findMany({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  });

  const report = logs
    .map((l) => `${l.createdAt} | ${l.type} | ${l.ip} | ${l.details}`)
    .join("\n");

  await sendReportEmail(report);
});
