import Bloque, { CuerpoBloque } from "@/components/layout/Bloque";
import { REGLA_HILO } from "@/components/lateral/ReglasDelHilo";

export default function CajaRespuesta() {
  return (
    <Bloque titulo="Responder" apagado>
      <CuerpoBloque>
        <div className="responder">
          <textarea placeholder={REGLA_HILO} aria-label="Tu respuesta" />
          <div className="responder-pie">
            <button className="btn" type="button">
              Publicar respuesta
            </button>
            <button className="btn btn--ghost" type="button">
              Adjuntar un envío
            </button>
            <span className="nota">Se acepta Markdown</span>
          </div>
        </div>
      </CuerpoBloque>
    </Bloque>
  );
}
