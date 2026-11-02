
import { NextResponse } from "next/server";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
 
    const { id: idTexto } = await params;
    const id = Number(idTexto);

    if (
      !Number.isInteger(id) ||
      id < 1
    ) {
      return NextResponse.json(
        { error: "El ID del envío no es válido." },
        { status: 400 }
      );
    }

    const globalConEnvios = globalThis as typeof globalThis & {
      enviosDemo?: Map<
        number,
        {
          id: number;
          problem_id: number;
          language: "cpp" | "python";
          code: string;
          verdict: "QUEUED" | "RUNNING" | "DEMO";
          detail: string;
          created_at: string;
        }
      >;
    };

    const envio = globalConEnvios.enviosDemo?.get(id);

    if (!envio) {
      return NextResponse.json(
        {
          error:
            "No se encontró el envío. Recuerda que la demo guarda datos temporalmente.",
        },
        { status: 404 }
      );
    }


    const { code: _codigo, ...resultado } = envio;

    return NextResponse.json(resultado);
  } catch {
    return NextResponse.json(
      { error: "No se pudo consultar el envío." },
      { status: 500 }
    );
  }
}
