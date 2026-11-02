import Bloque, { CuerpoBloque } from "@/components/layout/Bloque";
import Insignia from "@/components/ui/Insignia";
import Vacio from "@/components/ui/Vacio";
import type { EstadoEnProblema } from "@/lib/tipos";

export default function TuEstado({ estado }: { estado: EstadoEnProblema | null }) {
  return (
    <Bloque titulo="Tu estado aquí" apagado>
      {!estado ? (
        <Vacio compacto>Todavía no has enviado nada a este problema.</Vacio>
      ) : (
        <CuerpoBloque>
          <p className="estado-veredicto">
            {estado.veredicto ? (
              <Insignia veredicto={estado.veredicto} />
            ) : (
              <span className="faint">sin veredicto</span>
            )}
          </p>
          <dl className="statlist">
            <dt>Intentos</dt>
            <dd>{estado.intentos}</dd>
            <dt>Mejor tiempo</dt>
            <dd className={estado.mejorTiempoMs ? undefined : "sinvalor"}>
              {estado.mejorTiempoMs ? `${estado.mejorTiempoMs} ms` : "—"}
            </dd>
            <dt>Puntaje</dt>
            <dd>{estado.puntaje}</dd>
          </dl>
        </CuerpoBloque>
      )}
    </Bloque>
  );
}
