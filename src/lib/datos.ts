
import type {
  Aviso,
  Autor,
  Categoria,
  Estadisticas,
  EstadoEnProblema,
  EnvioFila,
  Hilo,
  PerfilUsuario,
  ProblemaDelSet,
  ResumenVeredictos,
  TopUsuario,
  UsuarioEnLinea,
} from "./tipos";

/**
 * Datos de presentación de CodeUACH.
 * Actualmente son datos de ejemplo.
 * Más adelante se conectarán con Prisma y la base de datos.
 */

export async function obtenerCategorias(): Promise<Categoria[]> {
  return [
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
          problemas: 2,
          envios: 3210,
          ultimo: {
            que: "Suma de dos números",
            quien: "jurjur45",
            rating: 2650,
            cuando: "hace 12 min",
          },
          icono: "nuevo",
        },
      ],
    },
  ];
}

/** Perfil del usuario de ejemplo. */
export async function obtenerPerfil(): Promise<PerfilUsuario> {
  return {
    handle: "jurjur45",
    carrera: "Hacker",
    rating: 2650,
    puesto: 1,
    totalUsuarios: 248,
    resueltos: 187,
    intentados: 6,
    envios: 412,
    aceptacion: 78,
    racha: 36,
    ultimosResueltos: [
      { nombre: "Cuenta de vocales", ramo: "INFO082", cuando: "ayer" },
      { nombre: "Suma de dos números", ramo: "INFO082", cuando: "hace 3 días" },
    ],
    deltaSemana: 45,
    historial: [2380, 2425, 2410, 2490, 2545, 2605, 2650],
    rival: {
      handle: "Lasc19",
      rating: 100,
      puesto: 2,
    },
  };
}

/** Ranking de usuarios. */
export async function obtenerTopRating(): Promise<TopUsuario[]> {
  return [
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
}

/** Usuarios conectados. */
export async function obtenerEnLinea(): Promise<UsuarioEnLinea[]> {
  return [
    { usuario: "Lasc19", rating: 100 },
    { usuario: "matias2005-20", rating: 100 },
    { usuario: "jurjur45", rating: 2650 },
  ];
}

/** Estadísticas generales. */
export async function obtenerEstadisticas(): Promise<Estadisticas> {
  return {
    enviosTotales: 7356,
    problemasPublicados: 2,
    miembros: 248,
    conectados: 3,
    miembroMasReciente: "SoulFast23",
  };
}

/** Aviso de la plataforma. */
export async function obtenerAviso(): Promise<Aviso | null> {
  return {
    id: "aviso-1",
    cuerpo: "Ya puedes practicar con los primeros dos problemas de CodeUACH.",
  };
}

const docente: Autor = {
  handle: "prof.rojas",
  rating: 2300,
  rol: "Docente",
  mensajes: 87,
  desde: "mar 2024",
};

const alumno: Autor = {
  handle: "jurjur45",
  rating: 2650,
  rol: "Estudiante",
  mensajes: 14,
  desde: "mar 2026",
};

/**
 * Hilo del problema B: Cuenta de vocales.
 */
export async function obtenerHilo(): Promise<Hilo | null> {
  return {
    titulo: "B · Cuenta de vocales",
    limites: "1 s · 256 MB",
    ramo: {
      codigo: "Práctica libre",
      nombre: "Strings y arreglos",
    },
    mensajes: [
      {
        id: "m1",
        numero: 1,
        autor: docente,
        cuando: "28 sep 2026, 10:00",
        fijado: true,
        cuerpo:
          "Dada una palabra en minúsculas, imprime cuántas vocales tiene. La palabra tiene entre 1 y 10⁵ letras.",
      },
      {
        id: "m2",
        numero: 2,
        autor: alumno,
        cuando: "28 sep 2026, 18:42",
        cuerpo:
          "Mi solución recorre la palabra una sola vez, así que es O(n).",
        envio: {
          veredicto: "ac",
          lenguaje: "Python 3",
          archivo: "vocales.py",
          codigo:
            'palabra = input().strip()\nprint(sum(1 for c in palabra if c in "aeiou"))',
          casos: [
            { n: 1, desc: "«valdivia» → «4»", ms: 10, veredicto: "ac" },
            { n: 2, desc: "«xyz» → «0»", ms: 12, veredicto: "ac" },
          ],
          resumen: "2 de 2 casos correctos",
        },
      },
    ],
    totalMensajes: 2,
    pagina: 1,
    totalPaginas: 1,
  };
}

/** Estado de ejemplo para un problema. */
export async function obtenerEstadoEnProblema(): Promise<EstadoEnProblema | null> {
  return {
    veredicto: "ac",
    intentos: 2,
    mejorTiempoMs: 24,
    puntaje: 100,
  };
}

/**
 * Problemas disponibles en la demostración.
 * Solamente A y B.
 */
export async function obtenerProblemasDelSet(): Promise<ProblemaDelSet[]> {
  return [
    {
      letra: "A",
      nombre: "Suma de dos números",
      veredicto: null,
    },
    {
      letra: "B",
      nombre: "Cuenta de vocales",
      veredicto: null,
    },
  ];
}

/** Envíos de ejemplo para mostrar la interfaz. */
export async function obtenerEnvios(): Promise<EnvioFila[]> {
  return [
    {
      id: 10482,
      cuando: "hace 2 min",
      usuario: "jurjur45",
      rating: 2650,
      problema: "B · Cuenta de vocales",
      lenguaje: "Python 3",
      veredicto: "ac",
      tiempoMs: 46,
      memoriaKb: 0,
    },
    {
      id: 10481,
      cuando: "hace 4 min",
      usuario: "matias2005-20",
      rating: 100,
      problema: "A · Suma de dos números",
      lenguaje: "Python 3",
      veredicto: "ac",
      tiempoMs: 0,
      memoriaKb: 0,
    },
  ];
}

/** Resumen de veredictos de ejemplo. */
export async function obtenerResumenVeredictos(): Promise<ResumenVeredictos> {
  return {
    ac: 321,
    wa: 54,
    tle: 21,
    mle: 4,
    ce: 5,
    re: 7,
  };
}
