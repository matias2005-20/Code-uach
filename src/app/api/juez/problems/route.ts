
import { NextResponse } from "next/server";
const JUEZ_API_URL = "http://146.83.216.168";
export async function GET() {
  try {
    const apiKey = process.env.JUEZ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Falta configurar JUEZ_API_KEY en el servidor." },
        { status: 500 }
      );
    }

    const respuesta = await fetch(`${JUEZ_API_URL}/problems`, {
      method: "GET",
      headers: {
        "X-API-Key": apiKey,
      },
      cache: "no-store",
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      return NextResponse.json(
        { error: datos.detail ?? "No se pudieron obtener los problemas." },
        { status: respuesta.status }
      );
    }

    return NextResponse.json(datos);
  } catch {
    return NextResponse.json(
      { error: "Error al comunicarse con el juez virtual." },
      { status: 502 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.JUEZ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Falta configurar JUEZ_API_KEY en el servidor." },
        { status: 500 }
      );
    }
    const body = await request.json();
    const respuesta = await fetch(`${JUEZ_API_URL}/problems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      return NextResponse.json(
        { error: datos.detail ?? "No se pudo crear el problema." },
        { status: respuesta.status }
      );
    }
    return NextResponse.json(datos, {
      status: respuesta.status,
    });
  } catch {
    return NextResponse.json(
      { error: "Error al comunicarse con el juez virtual." },
      { status: 502 }
    );
  }
}
