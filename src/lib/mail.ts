import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
const sender = process.env.SENDGRID_FROM_EMAIL!;
interface SendEmailParams {
  email: string;
  subject: string;
  text: string;
  content?: string;
}

export async function sendEmail({
  email,
  subject,
  text,
  content,
}: SendEmailParams) {
  const msg = {
    to: email,
    from: sender,
    subject: subject,
    text: text,
    html: content,
  };

  console.log("Email ", msg);
  sgMail
    .send(msg)
    .then((msg: any) => {
      // logs response data
      console.log("Emailed ", msg);
    })
    .catch((err: any) => {
      // logs any error
      console.error(err);
    });
}
