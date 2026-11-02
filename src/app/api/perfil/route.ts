import { NextResponse } from "next/server";
export async function GET() {
  try {
    const perfil = {
      handle: "jurjur45",
      carrera: "Hacker",
      rating: 2650,
      puesto: 1,
      totalUsuarios: 248,
      resueltos: 187,
      intentados: 6,
      envios: 412,
      aceptacion: 78,
      racha: 36,
      ultimosResueltos: [
        {
          nombre: "Cuenta de vocales",
          ramo: "INFO082",
          cuando: "ayer",
        },
        {
          nombre: "Suma de dos números",
          ramo: "INFO082",
          cuando: "hace 3 días",
        },
        {
          nombre: "Pila balanceada",
          ramo: "INFO165",
          cuando: "hace 5 días",
        },
      ],
      deltaSemana: 45,
      historial: [2380, 2425, 2410, 2490, 2545, 2605, 2650],

      rival: {
        handle: "Lasc19",
        rating: 100,
        puesto: 2,
      },
    };
    return NextResponse.json(perfil);
  } catch (error) {
    console.error("Error al obtener el perfil:", error);

    return NextResponse.json(
      { error: "No se pudo obtener el perfil" },
      { status: 500 }
    );
  }
}