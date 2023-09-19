import "dotenv/config";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILER_SEND_API_KEY!,
});

interface SendEmailParams {
  email: string;
  subject: string;
  text: string;
  content: string;
}

const sentFrom = new Sender("no-reply@bitju.app", "Bitju app");

export async function sendEmail({
  email,
  subject,
  text,
  content,
}: SendEmailParams) {
  const recipients = [new Recipient(email, `User ${email}`)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject(subject)
    .setHtml(content)
    .setText(text);
  try {
    console.log("ENVIANDO MAIL")
    const response = await mailerSend.email.send(emailParams);
    console.log("EMAIL ENVIADO", response)
  } catch (e) {
    console.log("error mailer send", e);
  }
}
