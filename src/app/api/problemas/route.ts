import { NextResponse } from "next/server";
export async function GET() {
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

  return NextResponse.json(problemas);
}