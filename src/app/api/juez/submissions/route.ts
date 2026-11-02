
import { NextResponse } from "next/server";

const WANDBOX_URL = "https://wandbox.org/api/compile.json";

// Casos de prueba del problema A: Suma de dos números.
const CASOS_SUMA = [
  { entrada: "2 3", esperado: "5" },
  { entrada: "10 20", esperado: "30" },
  { entrada: "-5 8", esperado: "3" },
  { entrada: "0 0", esperado: "0" },
];

// Casos de prueba del problema B: Cuenta de vocales.
const CASOS_VOCALES = [
  { entrada: "valdivia", esperado: "4" },
  { entrada: "xyz", esperado: "0" },
];

// Compiladores disponibles en Wandbox.
const COMPILADORES: Record<string, string> = {
  python: "cpython-3.11.10",
  cpp: "gcc-13.2.0",
};

// Normaliza la salida para evitar diferencias por saltos de línea
// o espacios al principio y al final.
function normalizar(salida: string) {
  return salida.replace(/\r\n/g, "\n").trim();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validamos los datos recibidos.
    if (
      !Number.isInteger(body.problem_id) ||
      body.problem_id <= 0 ||
      typeof body.language !== "string" ||
      typeof body.code !== "string" ||
      !body.code.trim()
    ) {
      return NextResponse.json(
        { error: "Datos de envío inválidos." },
        { status: 400 }
      );
    }

    // Seleccionamos los casos según el problema.
    let casos;

    if (body.problem_id === 1) {
      casos = CASOS_SUMA;
    } else if (body.problem_id === 2) {
      casos = CASOS_VOCALES;
    } else {
      return NextResponse.json(
        { error: "Este ejercicio todavía no está habilitado." },
        { status: 400 }
      );
    }

    // Comprobamos que el lenguaje esté permitido.
    const compiler = COMPILADORES[body.language];

    if (!compiler) {
      return NextResponse.json(
        { error: "Lenguaje no permitido." },
        { status: 400 }
      );
    }

    // Aquí guardaremos los resultados de cada caso.
    const resultados: {
      caso: number;
      entrada: string;
      esperado: string;
      obtenido: string;
      correcto: boolean;
    }[] = [];

    // Ejecutamos el código una vez por cada caso de prueba.
    for (const caso of casos) {
      const respuesta = await fetch(WANDBOX_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          compiler,
          code: body.code,
          stdin: caso.entrada,
          save: false,

          // Si es C++, utilizamos el estándar C++17.
          ...(body.language === "cpp"
            ? { "compiler-option-raw": "-std=c++17" }
            : {}),
        }),
        cache: "no-store",
      });

      // Si Wandbox no responde correctamente, informamos del error.
      if (!respuesta.ok) {
        throw new Error("Wandbox no pudo ejecutar el código.");
      }

      const datos = await respuesta.json();

      // Error de compilación.
      if (datos.compiler_error) {
        return NextResponse.json({
          veredicto: "ce",
          detalle: "Error de compilación.",
          resultados,
        });
      }

      // Error durante la ejecución.
      if (String(datos.status) !== "0") {
        return NextResponse.json({
          veredicto: "re",
          detalle: "El programa terminó con errores.",
          resultados,
        });
      }

      // Comparamos la salida del programa con la esperada.
      const obtenido = normalizar(datos.program_output ?? "");
      const esperado = normalizar(caso.esperado);

      const correcto = obtenido === esperado;

      resultados.push({
        caso: resultados.length + 1,
        entrada: caso.entrada,
        esperado,
        obtenido,
        correcto,
      });

      // Si un caso falla, el envío recibe WA.
      if (!correcto) {
        return NextResponse.json({
          veredicto: "wa",
          detalle: "La salida no coincide con la esperada.",
          resultados,
        });
      }
    }

    // Si todos los casos pasan, el envío es aceptado.
    return NextResponse.json({
      veredicto: "ac",
      detalle: "Todos los casos fueron superados.",
      resultados,
    });

  } catch (error) {
    console.error("Error en el juez virtual:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Error al ejecutar el envío.",
      },
      { status: 502 }
    );
  }
}
