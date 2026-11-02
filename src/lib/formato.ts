/** Miles con punto, como se escribe en Chile. */
export const numero = (n: number) => n.toLocaleString("es-CL");

/** Un contador que todavía no tiene valor se muestra como raya, no como cero. */
export const oRaya = (n: number) => (n ? numero(n) : "—");
