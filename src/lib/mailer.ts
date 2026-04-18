import nodemailer from "nodemailer";

export async function sendReportEmail(content: string) {
  const user = process.env.MAILER_USER;
  const pass = process.env.MAILER_PASS;
  const to = process.env.MAILER_TO;

  if (!user || !pass) {
    throw new Error("MAILER_USER and MAILER_PASS environment variables are required");
  }
  if (!to) {
    throw new Error("MAILER_TO environment variable is required");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: "AI Dashboard",
    to,
    subject: "Daily Activity Report",
    text: content,
  });
}
