import Link from "next/link";

const variantes = [
  {
    k: "a",
    nombre: "Códex",
    desc: "La densidad de Codeforces, ordenada. Gris claro, filas bajas, bordes finos, todo a la vista sin scroll. Es la opción que menos estorba cuando estás resolviendo.",
    colores: ["#f2f3f5", "#ffffff", "#c20430", "#0b4f8a", "#00693e"],
  },
  {
    k: "b",
    nombre: "Austral",
    desc: "Institucional moderno. Barra negra con el carmesí de acento, Garamond en los títulos y más aire entre elementos. Es la que más se parece a una plataforma oficial de la universidad.",
    colores: ["#f6f5f3", "#1d1d1b", "#c20430", "#c0ddea", "#00693e"],
  },
  {
    k: "c",
    nombre: "Nocturno",
    desc: "La misma densidad de Códex, en oscuro. Base en el negro institucional en vez del azul de siempre. Pensada como tema alternativo, no como única identidad.",
    colores: ["#131413", "#1b1c1b", "#c20430", "#7fb2e5", "#3fbf7f"],
  },
];

const paleta = [
  { hex: "#c20430", pantone: "Pantone 200", uso: "marca" },
  { hex: "#c0ddea", pantone: "Pantone 290", uso: "fondos suaves" },
  { hex: "#ffc82e", pantone: "Pantone 123", uso: "avisos" },
  { hex: "#00693e", pantone: "Pantone 349", uso: "aceptado" },
  { hex: "#1d1d1b", pantone: "Pantone Black", uso: "texto y barra" },
];

export default function Estilos() {
  return (
    <div className="pick">
      <div className="wrapx">
        <h1>Tres direcciones para CodeUACh</h1>
        <p className="lede">
          La misma pantalla —lista de problemas, veredicto de un envío y ranking del
          ramo— con la estructura de Codeforces y tres tratamientos distintos. Los
          colores salen del Manual de Estilo Corporativo UACh 2023; la tipografía de
          títulos es EB Garamond, que es la Garamond que pide el manual.
        </p>

        <div className="picks">
          {variantes.map((v) => (
            <Link key={v.k} className="pick-card" href={`/estilos/${v.k}`}>
              <span className="k">variante {v.k}</span>
              <h2>{v.nombre}</h2>
              <p>{v.desc}</p>
              <span className="swatches">
                {v.colores.map((c) => (
                  <i key={c} style={{ background: c }} />
                ))}
              </span>
            </Link>
          ))}
        </div>

        <div className="palette">
          <h3>Paleta primaria UACh</h3>
          <p>
            Los cinco colores planos del isotipo. El carmesí queda reservado para la
            identidad: el rojo de «incorrecto» usa otro tono a propósito.
          </p>
          <div className="chips">
            {paleta.map((c) => (
              <div className="sw" key={c.hex}>
                <b style={{ background: c.hex }} />
                <span>{c.hex}</span>
                <em>
                  {c.pantone} · {c.uso}
                </em>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
