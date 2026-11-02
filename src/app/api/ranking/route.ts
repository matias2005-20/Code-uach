
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ranking = [
      {
        puesto: 1,
        usuario: "jurjur45",
        carrera: "Hacker",
        rating: 2650,
        resueltos: 187,
        delta: 45,
        yo: true,
      },
      {
        puesto: 2,
        usuario: "Lasc19",
        carrera: "Ing. Civil Informática",
        rating: 100,
        resueltos: 3,
        delta: 0,
      },
      {
        puesto: 3,
        usuario: "matias2005-20",
        carrera: "Ing. Civil Informática",
        rating: 100,
        resueltos: 3,
        delta: 0,
      },
      {
        puesto: 4,
        usuario: "facs2005",
        carrera: "Ing. Civil Electrónica",
        rating: 100,
        resueltos: 2,
        delta: 0,
      },
      {
        puesto: 5,
        usuario: "SoulFast23",
        carrera: "Ing. Civil Informática",
        rating: 100,
        resueltos: 2,
        delta: 0,
      },
    ];

    // Devuelve el ranking en formato JSON.
    return NextResponse.json(ranking);
  } catch (error) {
    console.error("Error al obtener el ranking:", error);

    // Respuesta de error si algo falla.
    return NextResponse.json(
      { error: "No se pudo obtener el ranking" },
      { status: 500 }
    );
  }
}
