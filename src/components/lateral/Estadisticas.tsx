import Bloque, { CuerpoBloque } from "@/components/layout/Bloque";
import { oRaya } from "@/lib/formato";
import type { Estadisticas as Datos } from "@/lib/tipos";

export default function Estadisticas({ datos }: { datos: Datos }) {
  const filas = [
    { k: "Envíos totales", v: datos.enviosTotales },
    { k: "Problemas publicados", v: datos.problemasPublicados },
    { k: "Miembros", v: datos.miembros },
    { k: "Conectados ahora", v: datos.conectados },
  ];

  return (
    <Bloque titulo="Estadísticas" apagado>
      <CuerpoBloque>
        <dl className="statlist">
          {filas.map((f) => (
            <div key={f.k} style={{ display: "contents" }}>
              <dt>{f.k}</dt>
              <dd className={f.v ? undefined : "sinvalor"}>{oRaya(f.v)}</dd>
            </div>
          ))}
        </dl>
        {datos.miembroMasReciente && (
          <p className="faint nota-sesion">
            El miembro más reciente es{" "}
            <a className="u r1" href="#">
              {datos.miembroMasReciente}
            </a>
            .
          </p>
        )}
      </CuerpoBloque>
    </Bloque>
  );
}
