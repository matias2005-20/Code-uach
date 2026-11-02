/**
 * La caja del foro: barra de título más contenido. `apagado` la pinta gris en
 * vez de carmesí, que es lo que usan los bloques de la columna lateral.
 */
export default function Bloque({
  titulo,
  nota,
  accion,
  apagado = false,
  children,
}: {
  titulo: string;
  nota?: string;
  accion?: React.ReactNode;
  apagado?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="block">
      <div className={apagado ? "block-bar block-bar--quiet" : "block-bar"}>
        <h2>{titulo}</h2>
        {nota && <span className="sub">{nota}</span>}
        {accion}
      </div>
      {children}
    </section>
  );
}

/** El relleno estándar de un bloque que no lleva tabla. */
export function CuerpoBloque({ children }: { children: React.ReactNode }) {
  return <div className="pad">{children}</div>;
}
