import { COLEGIOS } from "./colegios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  /* Recupera los centros electorales en base al input de busqueda*/ 
  
  const allSchools = COLEGIOS
  const { searchParams } = new URL(req.url)
  const searchTerm = searchParams.get('name') ?? ''

  const filteredSchools = searchTerm != '' ? allSchools.filter((school) =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  // Limitar los resultados a los primeros 10
  const firstTenSchools = filteredSchools.slice(0, 10);

  return new NextResponse(
    JSON.stringify({
      colegios: firstTenSchools,
    }),
    { status: 200 }
  );
}
