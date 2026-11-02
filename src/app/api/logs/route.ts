
import { NextResponse } from "next/server";

// GET: consultar los registros de actividad
export async function GET() {
  try {
    return NextResponse.json({
      mensaje: "API de logs funcionando",
      logs: [],
    });
  } catch (error) {
    console.error("Error al consultar los logs:", error);

    return NextResponse.json(
      { error: "No se pudieron consultar los logs" },
      { status: 500 }
    );
  }
}
