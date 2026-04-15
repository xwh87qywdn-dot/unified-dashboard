import nodemailer from "nodemailer";

export async function sendReportEmail(content: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "AI Dashboard",
    to: "yt0503683500@icloud.com",
    subject: "Daily Activity Report",
    text: content,
  });
}
