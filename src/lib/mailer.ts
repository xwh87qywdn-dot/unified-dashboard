import nodemailer from "nodemailer";

export async function sendReportEmail(content: string) {
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;
  const to = process.env.REPORT_EMAIL;

  if (!user || !pass || !to) {
    throw new Error("Missing required email environment variables: MAIL_USER, MAIL_PASS, REPORT_EMAIL");
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
