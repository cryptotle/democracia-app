import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

/* Recupera los centros electorales en base al input de busqueda*/ 
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse(
      JSON.stringify({
        error: 'No estás autenticado.'
      }),
      { status: 401 }
    );
  }
  const userEmail = session?.user?.email;

  try {
    const denuncias = await prisma.denuncias.findMany({
      where: {
        user: {
          email: userEmail,
        },
      },
    });

    return new NextResponse(
      JSON.stringify( denuncias),{ status: 200 }
    );
  } catch (error) {
    console.error('Error al obtener denuncias:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Ocurrió un error al obtener las denuncias.'
      }),
      { status: 500 }
    );
  }
}

/* actualizar datos de la denuncia del usuario logueado por id de denuncia*/
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse(
      JSON.stringify({
        error: 'No estás autenticado.'
      }),
      { status: 401 }
    );
  }

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

    const updatedDenuncia = await prisma.denuncias.update({
      where: {
        id: payload.id,
      },
      data: payload, // Los campos que deseas actualizar
    });

    return new NextResponse(
      JSON.stringify(updatedDenuncia),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al actualizar denuncia:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Ocurrió un error al actualizar la denuncia.'
      }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new NextResponse(
      JSON.stringify({
        error: 'No estás autenticado.'
      }),
      { status: 401 }
    );
  }

  try {
    const { payload } = await req.json();
    if (!payload) {
      return NextResponse.json(
        JSON.stringify({
          error: "La informacion enviada no es la correcta",
        }),
        { status: 400 }
      );
    }

    // Obtener el userId del correo electrónico de la sesión
    const userEmail = session?.user?.email;
    const user = await prisma.user.findUnique({
      where: { email: userEmail ?? 'noUser' },
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          error: 'No se encontró el usuario.',
        }),
        { status: 404 }
      );
    }

    // Asociar el userId a la nueva denuncia
    const newDenuncia = await prisma.denuncias.create({
      data: {
        ...payload,
        userId: user.id,
      },
    });

    return new NextResponse(
      JSON.stringify({
        ...newDenuncia,
        message:"Datos guardados correctamente"        
    }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al crear denuncia:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Ocurrió un error al guardar los datos.'
      }),
      { status: 500 }
    );
  }
}
