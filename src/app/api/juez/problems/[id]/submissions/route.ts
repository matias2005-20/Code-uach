
import { NextResponse } from "next/server";

const JUEZ_API_URL = "http://146.83.216.168";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
   
    const { id } = await params;

    const apiKey = process.env.JUEZ_API_KEY;
    const accessToken = process.env.JUEZ_ACCESS_TOKEN;

    if (!apiKey || !accessToken) {
      return NextResponse.json(
        {
          error:
            "Falta configurar la clave de API o el token de acceso.",
        },
        { status: 500 }
      );
    }

    const respuesta = await fetch(
      `${JUEZ_API_URL}/problems/${encodeURIComponent(id)}/submissions`,
      {
        method: "GET",
        headers: {
          "X-API-Key": apiKey,
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      return NextResponse.json(
        {
          error:
            datos.detail ??
            "No se pudieron obtener los envíos del problema.",
        },
        { status: respuesta.status }
      );
    }

    return NextResponse.json(datos);
  } catch {
    return NextResponse.json(
      {
        error: "Error al comunicarse con el juez virtual.",
      },
      { status: 502 }
    );
  }
}
