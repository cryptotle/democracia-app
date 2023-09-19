import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "No estas logueado" }),
      { status: 401 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email ?? '',
      },
    });

    return NextResponse.json({
      user
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


export async function PUT(req: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "No estas logueado" }),
      { status: 401 }
    );
  }

  try {
    const { payload } = await req.json(); // Parsear el cuerpo del payload
    if (!payload) {
      return NextResponse.json(
        JSON.stringify({
          status: "error",
          message: "La informacion enviada no es la correcta",
        }),
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email ?? '',
      },
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ status: "fail", message: "No existe el usuario" }),
        { status: 401 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: session?.user?.email ?? '',
      },
      data: {
        wallet:payload.wallet // solo actualiza la wallet
      }, 
    });

    return NextResponse.json({
      user: updatedUser,
      message: "Datos actualizados correctamente",
    });
  } catch (error: any) {
    return NextResponse.json(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}