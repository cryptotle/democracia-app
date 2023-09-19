const nodemailer = require("nodemailer");

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
  // Configura el transporte de correo electrónico (SMTP)
  const transporter = nodemailer.createTransport({
    host: process.env.MAILER_SEND_SMTP_HOST,
    port: process.env.MAILER_SEND_SMTP_PORT, // Puerto del servidor SMTP
    secure: false, // false para TLS, true para SSL
    auth: {
      user: process.env.MAILER_SEND_SMTP_USER,
      pass: process.env.MAILER_SEND_SMTP_PASS,
    },
    debug: true,
    tls: {
        rejectUnauthorized: false // Desactiva la verificación del certificado
      }
  });
  const mailOptions = {
    from: process.env.MAILER_SEND_SMTP_FROM,
    to: email, // Dirección de correo electrónico del destinatario
    subject,
    text,
    html: content
  };
  await transporter.sendMail(mailOptions);

}
