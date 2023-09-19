import { sendEmail } from "@/lib/mailersend";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

// La función para enviar correos electrónicos de confirmación
async function sendPwdResetedEmail(email: string) {
  try {
    // Configura el mensaje de correo electrónico
    const mailOptions = {
      email, // Dirección de correo electrónico del destinatario
      subject: "Password actualizado",
      text: "Su password ha sido actualizdo ",
      content: `<strong>¡Su password a sido actualizado!</strong>`,
    };

    // Envía el correo electrónico
    await sendEmail(mailOptions);

    console.log(`Correo electrónico enviado a ${email}`);
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
    const { password, token } = payload;

    const verificationRequest = await prisma.verificationRequest.findFirst({
      where: {
        token: token as string,
      },
    });

    if (!verificationRequest) {
      new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Token invalido",
        }),
        { status: 500 }
      );
    }

    const user = await prisma.user.findFirst({
      where: { id: verificationRequest?.userId! },
    });

    await prisma.verificationRequest.delete({
      where: {
        id: verificationRequest?.id,
      },
    });
    const hashed_password = await hash(password, 12);
    const updatePassword = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: { password: hashed_password },
    });

    await sendPwdResetedEmail(user?.email!);

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
