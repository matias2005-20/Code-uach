import { NextResponse } from "next/server";
export async function GET() {
  try {
    const estadisticas = {
      enviosTotales: 7356,
      problemasPublicados: 62,
      miembros: 248,
      conectados: 3,
      miembroMasReciente: "SoulFast23",
    };

    return NextResponse.json(estadisticas);
  } catch (error) {
    console.error("Error al obtener las estadísticas:", error);

    return NextResponse.json(
      { error: "No se pudieron obtener las estadísticas" },
      { status: 500 }
    );
  }
}