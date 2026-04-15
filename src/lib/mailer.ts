import nodemailer from "nodemailer";

export async function sendReportEmail(content: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  });

  await transporter.sendMail({
    from: "AI Dashboard",
    to: process.env.MAILER_TO ?? "yt0503683500@icloud.com",
    subject: "Daily Activity Report",
    text: content,
  });
}
