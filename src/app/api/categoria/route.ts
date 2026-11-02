
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const categorias = [
      {
        id: "practica",
        titulo: "Práctica libre",
        nota: "Abierto a toda la universidad",
        vacio: "Todavía no hay problemas liberados a práctica libre.",
        filas: [
          {
            slug: "iniciacion",
            titulo: "Problemas de iniciación",
            desc: "Para quien recién empieza: entrada, salida y ciclos.",
            etiquetas: ["principiante"],
            problemas: 20,
            envios: 3210,
            ultimo: {
              que: "Suma de dos números",
              quien: "jurjur45",
              rating: 2650,
              cuando: "hace 12 min",
            },
            icono: "nuevo",
          },
          {
            slug: "strings",
            titulo: "Strings y arreglos",
            desc: "Recorridos, conteos y manipulación de texto.",
            etiquetas: ["strings", "arreglos"],
            problemas: 14,
            envios: 1845,
            ultimo: {
              que: "Cuenta de vocales",
              quien: "matias2005-20",
              rating: 100,
              cuando: "hace 40 min",
            },
            icono: "listo",
          },
          {
            slug: "algoritmos",
            titulo: "Grafos y programación dinámica",
            desc: "Problemas de nivel intermedio y avanzado para entrenar.",
            etiquetas: ["grafos", "dp"],
            problemas: 11,
            envios: 902,
            ultimo: {
              que: "Rutas del campus Isla Teja",
              quien: "Lasc19",
              rating: 100,
              cuando: "hace 3 h",
            },
            icono: "normal",
          },
        ],
      },
    ];
    return NextResponse.json(categorias);
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    return NextResponse.json(
      { error: "No se pudieron obtener las categorías" },
      { status: 500 }
    );
  }
}
