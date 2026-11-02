
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const envios = [
      { id: 10482, cuando: "hace 2 min", usuario: "jurjur45", rating: 2650, problema: "E · Mediana en línea", lenguaje: "C++17", veredicto: "ac", tiempoMs: 46, memoriaKb: 3412 },
      { id: 10481, cuando: "hace 4 min", usuario: "matias2005-20", rating: 100, problema: "C · Mochila del estudiante", lenguaje: "Python 3", veredicto: "tle", caso: 7, tiempoMs: 1000, memoriaKb: 14820 },
      { id: 10480, cuando: "hace 6 min", usuario: "jurjur45", rating: 2650, problema: "E · Mediana en línea", lenguaje: "C++17", veredicto: "wa", caso: 12, tiempoMs: 41, memoriaKb: 3400 },
      { id: 10479, cuando: "hace 9 min", usuario: "Lasc19", rating: 100, problema: "D · Rutas del campus Isla Teja", lenguaje: "C++17", veredicto: "ac", tiempoMs: 124, memoriaKb: 8920 },
      { id: 10478, cuando: "hace 11 min", usuario: "SoulFast23", rating: 100, problema: "B · Cuenta de vocales", lenguaje: "Java 21", veredicto: "ce", tiempoMs: 0, memoriaKb: 0 },
      { id: 10477, cuando: "hace 15 min", usuario: "facs2005", rating: 100, problema: "C · Mochila del estudiante", lenguaje: "C++17", veredicto: "ac", tiempoMs: 78, memoriaKb: 40216 },
      { id: 10476, cuando: "hace 18 min", usuario: "jurjur45", rating: 2650, problema: "D · Rutas del campus Isla Teja", lenguaje: "C++17", veredicto: "ac", tiempoMs: 93, memoriaKb: 7844 },
      { id: 10475, cuando: "hace 22 min", usuario: "matias2005-20", rating: 100, problema: "C · Mochila del estudiante", lenguaje: "Python 3", veredicto: "re", caso: 3, tiempoMs: 62, memoriaKb: 9120 },
      { id: 10474, cuando: "hace 30 min", usuario: "SoulFast23", rating: 100, problema: "A · Suma de dos números", lenguaje: "Java 21", veredicto: "ac", tiempoMs: 108, memoriaKb: 21504 },
      { id: 10473, cuando: "hace 41 min", usuario: "Lasc19", rating: 100, problema: "E · Mediana en línea", lenguaje: "C++17", veredicto: "mle", caso: 18, tiempoMs: 310, memoriaKb: 262144 },
      { id: 10472, cuando: "hace 55 min", usuario: "jurjur45", rating: 2650, problema: "C · Mochila del estudiante", lenguaje: "C++17", veredicto: "ac", tiempoMs: 31, memoriaKb: 4096 },
      { id: 10471, cuando: "hace 1 h", usuario: "facs2005", rating: 100, problema: "B · Cuenta de vocales", lenguaje: "C", veredicto: "ac", tiempoMs: 15, memoriaKb: 1024 },
    ];
    return NextResponse.json(envios);
  } catch (error) {
    console.error("Error al obtener los envíos:", error);
    return NextResponse.json(
      { error: "No se pudieron obtener los envíos" },
      { status: 500 }
    );
  }
}
