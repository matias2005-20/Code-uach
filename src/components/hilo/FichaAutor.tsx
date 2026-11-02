import Avatar from "@/components/ui/Avatar";
import Handle from "@/components/ui/Handle";
import { rango } from "@/lib/rango";
import type { Autor } from "@/lib/tipos";

/** La columna izquierda de un mensaje: quién lo escribió y su trayectoria. */
export default function FichaAutor({ autor }: { autor: Autor }) {
  return (
    <div className="poster">
      <Avatar handle={autor.handle} />
      <div>
        <span className="poster-name">
          <Handle usuario={autor.handle} rating={autor.rating} />
        </span>
        <div className="poster-rank">{autor.rol}</div>
        <div className="poster-stats">
          Mensajes: {autor.mensajes}
          <br />
          Desde: {autor.desde}
          <br />
          Rating: <span className={`u ${rango(autor.rating).clase}`}>{autor.rating}</span>
        </div>
      </div>
    </div>
  );
}
