
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const aviso = {
      id: "aviso-1",
      cuerpo:
        "Esta semana se liberaron 3 problemas nuevos en práctica libre.",
    };

    return NextResponse.json(aviso);
  } catch (error) {
    console.error("Error al obtener los avisos:", error);

    return NextResponse.json(
      { error: "No se pudieron obtener los avisos" },
      { status: 500 }
    );
  }
}
