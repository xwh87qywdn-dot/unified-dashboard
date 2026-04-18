import cron from "node-cron";
import { prisma } from "@/lib/prisma";
import { sendReportEmail } from "./mailer";

cron.schedule("0 5 * * *", async () => {
  try {
    const logs = await prisma.activityLog.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });

    if (logs.length === 0) {
      console.log("Daily report: no activity in the last 24 hours, skipping email.");
      return;
    }

    const report = logs
      .map((l) => `${l.createdAt} | ${l.type} | ${l.ip} | ${l.details}`)
      .join("\n");

    await sendReportEmail(report);
  } catch (err) {
    console.error("Daily report cron job failed:", err);
  }
});
