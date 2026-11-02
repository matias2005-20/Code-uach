
import { NextResponse } from "next/server";

type Lenguaje = "cpp" | "python";

type Veredicto = "QUEUED" | "RUNNING" | "DEMO";

type EnvioDemo = {
  id: number;
  problem_id: number;
  language: Lenguaje;
  code: string;
  verdict: Veredicto;
  detail: string;
  created_at: string;
};

const globalConEnvios = globalThis as typeof globalThis & {
  enviosDemo?: Map<number, EnvioDemo>;
  siguienteIdDemo?: number;
};

const envios =
  globalConEnvios.enviosDemo ??
  (globalConEnvios.enviosDemo = new Map<number, EnvioDemo>());

if (globalConEnvios.siguienteIdDemo === undefined) {
  globalConEnvios.siguienteIdDemo = 1;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

  
    if (
      typeof body !== "object" ||
      body === null ||
      !("problem_id" in body) ||
      !("language" in body) ||
      !("code" in body)
    ) {
      return NextResponse.json(
        { error: "Faltan problem_id, language o code." },
        { status: 400 }
      );
    }

    const { problem_id, language, code } = body;

    if (
      typeof problem_id !== "number" ||
      !Number.isInteger(problem_id) ||
      problem_id < 1
    ) {
      return NextResponse.json(
        { error: "problem_id debe ser un entero positivo." },
        { status: 400 }
      );
    }

    if (language !== "cpp" && language !== "python") {
      return NextResponse.json(
        { error: "Lenguaje no admitido en la demo." },
        { status: 400 }
      );
    }

    if (typeof code !== "string" || code.trim().length === 0) {
      return NextResponse.json(
        { error: "El código fuente no puede estar vacío." },
        { status: 400 }
      );
    }

    if (new TextEncoder().encode(code).length > 64 * 1024) {
      return NextResponse.json(
        { error: "El código supera el límite de 64 KB." },
        { status: 413 }
      );
    }

    const id = globalConEnvios.siguienteIdDemo!++;
    const envio: EnvioDemo = {
      id,
      problem_id,
      language,
      code,
      verdict: "DEMO",
      detail:
        "Envío registrado en modo demostración. Todavía no se ha ejecutado en un juez.",
      created_at: new Date().toISOString(),
    };

    envios.set(id, envio);

 
    return NextResponse.json(envio, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "No se pudo procesar el envío." },
      { status: 400 }
    );
  }
}
