import Link from "next/link";
import Etiqueta from "@/components/ui/Etiqueta";
import Handle from "@/components/ui/Handle";
import IconoEstado from "@/components/ui/IconoEstado";
import { numero } from "@/lib/formato";
import type { Fila } from "@/lib/tipos";

export default function FilaRamo({ fila }: { fila: Fila }) {
  return (
    <article className="row">
      <IconoEstado tipo={fila.icono} />

      <div className="rmain">
        <Link className="rtitle" href="/hilo">
          {fila.titulo}
        </Link>
        <span className="rdesc">{fila.desc}</span>
        {fila.etiquetas && fila.etiquetas.length > 0 && (
          <span className="rtags">
            {fila.etiquetas.map((t) => (
              <Etiqueta key={t}>{t}</Etiqueta>
            ))}
          </span>
        )}
      </div>

      <div className="rmeta">
        <div className="count">
          {fila.problemas}
          <span>problemas</span>
        </div>
        <div className="count">
          {numero(fila.envios)}
          <span>envíos</span>
        </div>
        <div className="last">
          {fila.ultimo ? (
            <>
              <Link href="/hilo">{fila.ultimo.que}</Link>
              <span className="when">
                por <Handle usuario={fila.ultimo.quien} rating={fila.ultimo.rating} /> ·{" "}
                {fila.ultimo.cuando}
              </span>
            </>
          ) : (
            <span className="faint">sin envíos todavía</span>
          )}
        </div>
      </div>
    </article>
  );
}
