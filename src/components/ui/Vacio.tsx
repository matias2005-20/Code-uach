/**
 * Estado vacío de un bloque. La estructura del foro se mantiene en pie y el
 * hueco dice qué falta, en vez de dejar una caja en blanco o inventar datos.
 */
export default function Vacio({
  children,
  compacto = false,
}: {
  children: React.ReactNode;
  compacto?: boolean;
}) {
  return (
    <p className={compacto ? "vacio vacio--compacto" : "vacio"}>
      <span className="vacio-marca" aria-hidden="true">
        —
      </span>
      {children}
    </p>
  );
}
