import { verifyCaptcha } from "@/lib/captcha";
import { sendEmail } from "@/lib/mailersend";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

async function generateConfirmationToken(identifier: any, expires: any) {
  // Generar un token aleatorio
  const token =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  // Guardar el token en la base de datos usando el modelo VerificationRequest
  await prisma.verificationRequest.create({
    data: {
      identifier,
      token,
      expires,
      userId: identifier,
    },
  });

  return token;
}

// La función para enviar correos electrónicos de confirmación
async function sendResetPwdEmail(email: string, confirmationToken: string) {
  try {
    // Configura el mensaje de correo electrónico
    const url = `https://democracia-app.vercel.app/reset?token=${confirmationToken}`;
    console.info("URL RESET", url);
    const mailOptions = {
      email, // Dirección de correo electrónico del destinatario
      subject: "Olvidó de Correo Electrónico",
      text: "Confirmación de reset de password",
      content: `<strong>¡A olvidado su password!</strong> Por favor, haz click en el siguiente enlace para generar uno nuevo: ${url}`,
    };

    // Envía el correo electrónico
    await sendEmail(mailOptions);
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    const { payload } = await req.json(); // Parsear el cuerpo del payload
    console.log("payload", payload);
    if (!payload) {
      return NextResponse.json(
        JSON.stringify({
          error: "La informacion enviada no es la correcta",
        }),
        { status: 400 }
      );
    }
    const { email, captcha } = payload;
    if (!(await verifyCaptcha(captcha))) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Unproccesable request, Invalid captcha code",
        }),
        { status: 422 }
      );
    }
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });

    // si el usuario no existe, simulamos que envio mail. Evitamos bots sepan sobre mail registrados
    if (!existingUser) {
      return NextResponse.json({
        emailSent: true,
      });
    }
    // Calcula la fecha y hora de vencimiento en 24 horas desde ahora
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);

    // Generar y enviar un token de confirmación de correo electrónico (puedes implementar esta función)
    const confirmationToken = await generateConfirmationToken(
      existingUser.id,
      expirationDate
    );

    // Enviar el correo electrónico de confirmación (puedes implementar esta función)
    await sendResetPwdEmail(email, confirmationToken);

    return NextResponse.json({
      emailSent: true,
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
