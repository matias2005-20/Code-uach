import Bloque from "@/components/layout/Bloque";
import Vacio from "@/components/ui/Vacio";
import FilaRamo from "./FilaRamo";
import type { Categoria } from "@/lib/tipos";

export default function SeccionRamos({ categoria }: { categoria: Categoria }) {
  const hayFilas = categoria.filas.length > 0;

  return (
    <Bloque
      titulo={categoria.titulo}
      nota={categoria.nota}
      accion={hayFilas ? <a href="#">marcar como leído</a> : undefined}
    >
      {!hayFilas ? (
        <Vacio>{categoria.vacio}</Vacio>
      ) : (
        <>
          <div className="colhead">
            <span />
            <span>Ramo</span>
            <span className="n">Problemas</span>
            <span className="n">Envíos</span>
            <span>Último envío</span>
          </div>
          {categoria.filas.map((f) => (
            <FilaRamo key={f.slug} fila={f} />
          ))}
        </>
      )}
    </Bloque>
  );
}
