// Rango por rating. Es lógica de presentación, no un dato: la clase CSS que
// devuelve tiñe el handle con el color de facultad correspondiente
// (paleta secundaria del manual UACh, ver globals.css).

export type Rango = { nombre: string; clase: string };

export function rango(rating: number): Rango {
  if (rating < 1000) return { nombre: "novato", clase: "r1" };
  if (rating < 1400) return { nombre: "aprendiz", clase: "r2" };
  if (rating < 1700) return { nombre: "competente", clase: "r3" };
  if (rating < 2000) return { nombre: "avanzado", clase: "r4" };
  if (rating < 2400) return { nombre: "experto", clase: "r5" };
  return { nombre: "maestro", clase: "r6" };
}

/** Los rangos en orden, con el rating desde el que se alcanzan. */
export const CORTES = [
  { desde: 0, nombre: "novato" },
  { desde: 1000, nombre: "aprendiz" },
  { desde: 1400, nombre: "competente" },
  { desde: 1700, nombre: "avanzado" },
  { desde: 2000, nombre: "experto" },
  { desde: 2400, nombre: "maestro" },
];

/** El rango que viene, cuánto falta y qué fracción del tramo actual va hecha.
 *  Nulo cuando ya se está en el rango más alto. */
export function siguienteRango(rating: number) {
  const i = CORTES.findIndex((c) => c.desde > rating);
  if (i === -1) return null;
  const actual = CORTES[i - 1];
  const sig = CORTES[i];
  return {
    nombre: sig.nombre,
    clase: rango(sig.desde).clase,
    faltan: sig.desde - rating,
    progreso: (rating - actual.desde) / (sig.desde - actual.desde),
  };
}

/** La insignia de un rango, recortada de public/rangos.jpg. */
export const insignia = (nombre: string) => `/rangos/${nombre}.jpg`;

/** Etiqueta corta de veredicto, la que cabe en una insignia de tabla. */
export const veredictoCorto = {
  ac: "OK",
  wa: "WA",
  tle: "TLE",
  mle: "MLE",
  ce: "CE",
  re: "RE",
} as const;

/** Etiqueta larga, la que se usa cuando hay espacio. */
export const veredictoLargo = {
  ac: "Aceptado",
  wa: "Incorrecto",
  tle: "Tiempo excedido",
  mle: "Memoria excedida",
  ce: "Error de compilación",
  re: "Error en ejecución",
} as const;
