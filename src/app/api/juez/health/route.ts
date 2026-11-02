
import { NextResponse } from "next/server";
const JUEZ_API_URL = "http://146.83.216.168";

export async function GET() {
  try {
    const respuesta = await fetch(`${JUEZ_API_URL}/health`, {
      method: "GET",
      cache: "no-store",
    });
    if (!respuesta.ok) {
      return NextResponse.json(
        {
          conectado: false,
          error: "El juez respondió con un error.",
        },
        { status: 502 }
      );
    }
    const datos = await respuesta.json();

    return NextResponse.json({
      conectado: true,
      juez: datos,
    });
  } catch {
    return NextResponse.json(
      {
        conectado: false,
        error: "No se pudo conectar con el juez virtual.",
      },
      { status: 502 }
    );
  }
}
