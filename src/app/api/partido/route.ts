import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

/* Recupera los datos de los partidos*/ 
export async function GET(req: Request) {

  try {
    const partidos = await prisma.partido.findMany({});
    return new NextResponse(
      JSON.stringify( partidos ),{ status: 200 }
    );
  } catch (error) {
    console.error('Error al obtener partidos:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Ocurrió un error al obtener la data del partidos.'
      }),
      { status: 500 }
    );
  }
}
