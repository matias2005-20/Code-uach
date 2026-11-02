// Contrato de datos de la interfaz. Son los tipos que las pantallas esperan
// recibir; de dónde salgan es problema de src/lib/datos.ts.
//
// Se corresponden con los modelos de prisma/schema.prisma, pero no son lo
// mismo: aquí sólo está lo que la vista necesita mostrar, ya resuelto y
// aplanado. La capa de datos es la que traduce de uno al otro.

export type Estado = "resuelto" | "intentado" | "nuevo";

export type Veredicto = "ac" | "wa" | "tle" | "mle" | "ce" | "re";

/** Una fila del índice: un ramo, o una sección de la comunidad. */
export type Fila = {
  slug: string;
  titulo: string;
  desc: string;
  etiquetas?: string[];
  problemas: number;
  envios: number;
  /** Nulo cuando todavía no hay ningún envío. */
  ultimo: { que: string; quien: string; rating: number; cuando: string } | null;
  icono: "nuevo" | "listo" | "normal";
};

/** Una sección del índice. El título es parte de la estructura de la portada;
 *  las filas son datos. */
export type Categoria = {
  id: string;
  titulo: string;
  nota?: string;
  /** Qué decir cuando no hay ninguna fila. */
  vacio: string;
  filas: Fila[];
};

export type Problema = {
  id: string;
  nombre: string;
  tema: string;
  rating: number;
  resueltos: number;
  estado: Estado;
};

export type TopUsuario = {
  puesto: number;
  usuario: string;
  carrera: string;
  rating: number;
  resueltos: number;
  /** Cambio de rating de la última semana. */
  delta: number;
  yo?: boolean;
};

export type UsuarioEnLinea = {
  usuario: string;
  rating: number;
};

export type Estadisticas = {
  enviosTotales: number;
  problemasPublicados: number;
  miembros: number;
  conectados: number;
  miembroMasReciente: string | null;
};

export type Aviso = {
  id: string;
  cuerpo: string;
};

export type Caso = {
  n: number;
  desc: string;
  ms: number;
  veredicto: Veredicto;
};

export type Autor = {
  handle: string;
  rating: number;
  rol: string;
  mensajes: number;
  desde: string;
};

export type Mensaje = {
  id: string;
  numero: number;
  autor: Autor;
  cuando: string;
  cuerpo: string;
  /** El enunciado va fijado arriba del hilo. */
  fijado?: boolean;
  cita?: { de: string; texto: string };
  envio?: {
    veredicto: Veredicto;
    lenguaje: string;
    archivo: string;
    codigo: string;
    casos: Caso[];
    resumen: string;
  };
};

export type Hilo = {
  titulo: string;
  limites: string;
  ramo: { codigo: string; nombre: string } | null;
  mensajes: Mensaje[];
  totalMensajes: number;
  pagina: number;
  totalPaginas: number;
};

export type EstadoEnProblema = {
  veredicto: Veredicto | null;
  intentos: number;
  mejorTiempoMs: number | null;
  puntaje: number;
};

export type ProblemaDelSet = {
  letra: string;
  nombre: string;
  veredicto: Veredicto | null;
};

/** El usuario con la sesión abierta y su resumen, para la portada. */
export type PerfilUsuario = {
  handle: string;
  carrera: string;
  rating: number;
  /** Puesto en el ranking general y de cuántos. */
  puesto: number;
  totalUsuarios: number;
  resueltos: number;
  intentados: number;
  envios: number;
  /** Porcentaje de envíos aceptados. */
  aceptacion: number;
  /** Días seguidos con al menos un envío. */
  racha: number;
  ultimosResueltos: { nombre: string; ramo: string; cuando: string }[];
  /** Cambio de rating en los últimos 7 días. */
  deltaSemana: number;
  /** Rating al cierre de cada una de las últimas semanas, de la más antigua a hoy. */
  historial: number[];
  /** Quien está justo arriba en el ranking (o, si se es el #1, quien viene detrás). */
  rival: { handle: string; rating: number; puesto: number } | null;
};

/** Una fila de la tabla de envíos, al estilo de la página de estado de Codeforces. */
export type EnvioFila = {
  id: number;
  cuando: string;
  usuario: string;
  rating: number;
  problema: string;
  lenguaje: string;
  veredicto: Veredicto;
  /** El caso en que falló; se omite si fue aceptado o no compiló. */
  caso?: number;
  tiempoMs: number;
  memoriaKb: number;
};

/** Conteo de los envíos del usuario por veredicto. */
export type ResumenVeredictos = Record<Veredicto, number>;
