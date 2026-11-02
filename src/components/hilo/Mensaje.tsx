import Insignia from "@/components/ui/Insignia";
import Cita from "./Cita";
import EnvioAdjunto from "./EnvioAdjunto";
import FichaAutor from "./FichaAutor";
import type { Mensaje as Datos } from "@/lib/tipos";

export default function Mensaje({ mensaje }: { mensaje: Datos }) {
  return (
    <article className="post">
      <FichaAutor autor={mensaje.autor} />

      <div className="post-body">
        <div className="post-head">
          {mensaje.fijado && <span className="badge badge--pin">Enunciado</span>}
          {mensaje.envio && <Insignia veredicto={mensaje.envio.veredicto} />}
          <span>{mensaje.cuando}</span>
          <span className="push mono faint">#{mensaje.numero}</span>
        </div>

        <div className="post-content">
          {mensaje.cita && <Cita de={mensaje.cita.de} texto={mensaje.cita.texto} />}
          <p>{mensaje.cuerpo}</p>
          {mensaje.envio && <EnvioAdjunto envio={mensaje.envio} />}
        </div>

        <div className="post-foot">
          <a href="#">Citar</a>
          <a href="#">Responder</a>
        </div>
      </div>
    </article>
  );
}
