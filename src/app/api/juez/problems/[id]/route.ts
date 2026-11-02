
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

    if (!apiKey) {
      return NextResponse.json(
        { error: "Falta configurar JUEZ_API_KEY en el servidor." },
        { status: 500 }
      );
    }
    const respuesta = await fetch(
      `${JUEZ_API_URL}/problems/${encodeURIComponent(id)}`,
      {
        method: "GET",
        headers: {
          "X-API-Key": apiKey,
        },
        cache: "no-store",
      }
    );
    if (respuesta.status === 204) {
      return new Response(null, { status: 204 });
    }

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      return NextResponse.json(
        { error: datos.detail ?? "No se pudo consultar el problema." },
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

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const apiKey = process.env.JUEZ_API_KEY;
    const accessToken = process.env.JUEZ_ACCESS_TOKEN;

    if (!apiKey || !accessToken) {
      return NextResponse.json(
        { error: "Falta configurar la clave de API o el token de acceso." },
        { status: 500 }
      );
    }

    const respuesta = await fetch(
      `${JUEZ_API_URL}/problems/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
        headers: {
          "X-API-Key": apiKey,
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );
    if (respuesta.status === 204) {
      return new Response(null, { status: 204 });
    }

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      return NextResponse.json(
        { error: datos.detail ?? "No se pudo eliminar el problema." },
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
