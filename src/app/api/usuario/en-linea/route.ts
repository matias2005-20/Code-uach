
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const usuarios = [
      {
        usuario: "Lasc19",
        rating: 100,
      },
      {
        usuario: "matias2005-20",
        rating: 100,
      },
      {
        usuario: "jurjur45",
        rating: 2650,
      },
    ];
    return NextResponse.json(usuarios);
  } catch (error) {
    console.error("Error al obtener los usuarios en línea:", error);

    return NextResponse.json(
      { error: "No se pudieron obtener los usuarios en línea" },
      { status: 500 }
    );
  }
}
