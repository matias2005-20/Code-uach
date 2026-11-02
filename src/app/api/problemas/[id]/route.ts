import { NextResponse } from "next/server";
const problemas = [
  {
    id: "suma-dos-numeros",
    letra: "A",
    nombre: "Suma de dos números",
    veredicto: "ac",
  },
  {
    id: "cuenta-vocales",
    letra: "B",
    nombre: "Cuenta de vocales",
    veredicto: "ac",
  },
  {
    id: "mochila-estudiante",
    letra: "C",
    nombre: "Mochila del estudiante",
    veredicto: "wa",
  },
  {
    id: "rutas-campus-isla-teja",
    letra: "D",
    nombre: "Rutas del campus Isla Teja",
    veredicto: "tle",
  },
  {
    id: "mediana-en-linea",
    letra: "E",
    nombre: "Mediana en línea",
    veredicto: null,
  },
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const problema = problemas.find((p) => p.id === id);

  if (!problema) {
    return NextResponse.json(
      { error: "Problema no encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(problema);
}