// Contenido de relleno del comparador de estilos, y sólo de ahí.
//
// Vive aquí y no en src/lib porque no es dato de la aplicación: es la muestra
// que permite comparar tres tratamientos visuales sobre el mismo contenido.
// Una tabla vacía no sirve para juzgar una tipografía.

export type ProblemaDemo = {
  id: string;
  nombre: string;
  tema: string;
  rating: number;
  resueltos: number;
  estado: "resuelto" | "intentado" | "nuevo";
};

export const problemas: ProblemaDemo[] = [
  { id: "A", nombre: "Suma de dos números", tema: "implementación", rating: 800, resueltos: 142, estado: "resuelto" },
  { id: "B", nombre: "Cuenta de vocales", tema: "strings", rating: 900, resueltos: 128, estado: "resuelto" },
  { id: "C", nombre: "Mochila del estudiante", tema: "programación dinámica", rating: 1400, resueltos: 61, estado: "intentado" },
  { id: "D", nombre: "Rutas del campus Isla Teja", tema: "grafos", rating: 1600, resueltos: 38, estado: "intentado" },
  { id: "E", nombre: "Mediana en línea", tema: "estructuras de datos", rating: 1900, resueltos: 17, estado: "nuevo" },
  { id: "F", nombre: "Marea del río Calle-Calle", tema: "geometría", rating: 2200, resueltos: 6, estado: "nuevo" },
];

export const ranking = [
  { puesto: 1, usuario: "Lasc19", carrera: "Ing. Civil Informática", resueltos: 14, puntaje: 1820, rating: 2100 },
  { puesto: 2, usuario: "matias2005-20", carrera: "Ing. Civil Informática", resueltos: 12, puntaje: 1640, rating: 1750 },
  { puesto: 3, usuario: "facs2005", carrera: "Ing. Civil Electrónica", resueltos: 11, puntaje: 1585, rating: 1520 },
  { puesto: 4, usuario: "SoulFast23", carrera: "Ing. Civil Informática", resueltos: 9, puntaje: 1290, rating: 1240 },
  { puesto: 5, usuario: "jurjur45", carrera: "Bioinformática", resueltos: 8, puntaje: 1155, rating: 980 },
];

export const casos = [
  { n: 1, desc: "«valdivia» → «4»", ms: 10 },
  { n: 2, desc: "«xyz» → «0»", ms: 12 },
  { n: 3, desc: "palabra de 10⁵ letras", ms: 24 },
  { n: 4, desc: "aleatorio", ms: 11 },
];
