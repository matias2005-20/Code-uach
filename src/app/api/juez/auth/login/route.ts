
import { NextResponse } from "next/server";

const JUEZ_API_URL = "http://146.83.216.168";

export async function POST(request: Request) {
  try {
 
    const body = await request.json();

 
    const apiKey = process.env.JUEZ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Falta configurar JUEZ_API_KEY en el servidor." },
        { status: 500 }
      );
    }

   
    const respuesta = await fetch(`${JUEZ_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
      }),
      cache: "no-store",
    });
    const datos = await respuesta.json();
    if (!respuesta.ok) {
      return NextResponse.json(
        { error: datos.detail ?? "No se pudo iniciar sesión." },
        { status: respuesta.status }
      );
    }

    return NextResponse.json(datos, { status: respuesta.status });
  } catch {
 
    return NextResponse.json(
      { error: "Error al comunicarse con el juez virtual." },
      { status: 502 }
    );
  }
}
