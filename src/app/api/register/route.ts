import { sendEmail } from "@/lib/mailersend";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { emailContent } from "./email";
import { isForStatement } from "typescript";
import { verifyCaptcha } from "@/lib/captcha";

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
async function sendConfirmationEmail(email: string, confirmationToken: string) {
  try {
    // Configura el mensaje de correo electrónico
    const url = `https://bitju.app/confirmar?token=${confirmationToken}`;
    const mailOptions = {
      email, // Dirección de correo electrónico del destinatario
      subject: "Confirmación de Correo Electrónico",
      text: "Confirmación de registración",
      content: `Por favor, haga click en el siguiente enlace para confirmar su correo electrónico: ${url}`
    };

    // Envía el correo electrónico
    await sendEmail(mailOptions);
    console.log(`Correo electrónico enviado a ${email}`);
  } catch (error) {
    console.error(
      "Error al enviar el correo electrónico de confirmación:",
      error
    );
    throw error;
  }
}

const checkValidEmailString = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function POST(req: Request) {
  try {
    const { name, email, password, captcha } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
      captcha: string;
    };

    if (!email || !password || !captcha) {
      throw new Error("Por favor, complete todos los campos.");
    }

    if (password.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres.");
    }

    if (!checkValidEmailString(email)) {
      throw new Error("El correo electrónico no es válido.");
    }

    const hashed_password = await hash(password, 12);

    if (!(await verifyCaptcha(captcha))) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Unproccesable request, Invalid captcha code",
        }),
        { status: 422 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    // Calcula la fecha y hora de vencimiento en 24 horas desde ahora
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);

    // Generar y enviar un token de confirmación de correo electrónico (puedes implementar esta función)
    const confirmationToken = await generateConfirmationToken(
      newUser.id,
      expirationDate
    );

    // Enviar el correo electrónico de confirmación (puedes implementar esta función)
    await sendConfirmationEmail(email, confirmationToken);

    return NextResponse.json({
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    let message = error.message;
    if (error.code === "P2002") {
      message = "El correo electrónico ya está registrado";
    }
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: message,
      }),
      { status: 500 }
    );
  }
}
