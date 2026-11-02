
import { NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const problemas = [
      {
        letra: "A",
        nombre: "Suma de dos números",
        veredicto: "ac",
      },
      {
        letra: "B",
        nombre: "Cuenta de vocales",
        veredicto: "ac",
      },
      {
        letra: "C",
        nombre: "Mochila del estudiante",
        veredicto: "wa",
      },
      {
        letra: "D",
        nombre: "Rutas del campus Isla Teja",
        veredicto: "tle",
      },
      {
        letra: "E",
        nombre: "Mediana en línea",
        veredicto: null,
      },
    ];

    return NextResponse.json({
      asignacionId: id,
      problemas,
    });
  } catch (error) {
    console.error("Error al obtener los problemas:", error);

    return NextResponse.json(
      { error: "No se pudieron obtener los problemas" },
      { status: 500 }
    );
  }
}
