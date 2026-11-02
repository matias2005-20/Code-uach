/** El icono de carpeta del foro clásico: aquí dice si queda algo sin resolver. */
export default function IconoEstado({ tipo }: { tipo: "nuevo" | "listo" | "normal" }) {
  const clase =
    tipo === "nuevo" ? "ficon ficon--new" : tipo === "listo" ? "ficon ficon--done" : "ficon";
  const titulo =
    tipo === "nuevo"
      ? "Con problemas sin resolver"
      : tipo === "listo"
        ? "Todo resuelto"
        : "Sin novedades";

  return (
    <span className={clase} title={titulo} aria-label={titulo} role="img">
      {tipo === "listo" ? (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2.5 8.5 6 12l7.5-8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path
            d="M1.6 4.1a1 1 0 0 1 1-1h3.3l1.5 1.7h5a1 1 0 0 1 1 1v6.1a1 1 0 0 1-1 1h-9.8a1 1 0 0 1-1-1z"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}
