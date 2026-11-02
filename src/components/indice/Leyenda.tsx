/** Qué significa cada icono de carpeta de las filas. */
const ENTRADAS = [
  {
    texto: "Tiene problemas sin resolver",
    fondo: "var(--crimson-wash)",
    borde: "1px solid var(--crimson)",
  },
  {
    texto: "Todo resuelto",
    fondo: "color-mix(in srgb, var(--ac) 12%, #fff)",
    borde: "1px solid var(--ac)",
  },
  {
    texto: "Sin novedades",
    fondo: "var(--surface-3)",
    borde: "1px solid var(--border-strong)",
  },
];

export default function Leyenda() {
  return (
    <div className="block">
      <div className="legend">
        {ENTRADAS.map((e) => (
          <span key={e.texto}>
            <i style={{ background: e.fondo, border: e.borde }} />
            {e.texto}
          </span>
        ))}
      </div>
    </div>
  );
}
