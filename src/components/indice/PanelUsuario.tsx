import Avatar from "@/components/ui/Avatar";
import { CORTES, insignia, rango, siguienteRango } from "@/lib/rango";
import type { PerfilUsuario } from "@/lib/tipos";

/** La evolución del rating en las últimas semanas, como línea mínima. */
function Evolucion({ puntos }: { puntos: number[] }) {
  const w = 220;
  const h = 64;
  const pad = 6;
  const min = Math.min(...puntos);
  const max = Math.max(...puntos);
  const x = (i: number) => pad + (i * (w - 2 * pad)) / (puntos.length - 1);
  const y = (v: number) => h - pad - ((v - min) / (max - min || 1)) * (h - 2 * pad);
  const linea = puntos.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");

  return (
    <svg className="evolucion" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Rating de las últimas semanas">
      <path d={`${linea} L${x(puntos.length - 1)},${h} L${x(0)},${h} Z`} className="evolucion-area" />
      <path d={linea} className="evolucion-linea" />
      {puntos.map((v, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(v)} r={10} className="evolucion-hit">
            <title>{`Semana ${i + 1 - puntos.length || "actual"}: ${v}`}</title>
          </circle>
          {i === puntos.length - 1 && <circle cx={x(i)} cy={y(v)} r={4} className="evolucion-punto" />}
        </g>
      ))}
    </svg>
  );
}

/** Lo primero que ve el usuario al entrar: quién es, cómo va y cuánto le falta. */
export default function PanelUsuario({ perfil }: { perfil: PerfilUsuario }) {
  const r = rango(perfil.rating);
  const sig = siguienteRango(perfil.rating);
  const distanciaRival = perfil.rival ? Math.abs(perfil.rival.rating - perfil.rating) : 0;
  const progreso = sig ? sig.progreso : 1;

  const cifras = [
    { k: "Resueltos", v: perfil.resueltos },
    { k: "Ranking", v: `#${perfil.puesto}`, nota: `de ${perfil.totalUsuarios}` },
    { k: "Envíos", v: perfil.envios },
    { k: "Aceptación", v: `${perfil.aceptacion}%` },
    { k: "Racha", v: perfil.racha, nota: "días" },
  ];

  return (
    <section className="block heroe">
      <div className="heroe-top">
        <div className="heroe-quien">
          <Avatar handle={perfil.handle} />
          <div>
            <p className="heroe-saludo">¡Hola de nuevo!</p>
            <h2 className="heroe-nombre">{perfil.handle}</h2>
            <p className="heroe-sub">{perfil.carrera}</p>
            <p className="heroe-rango">
              <img src={insignia(r.nombre)} alt="" className="rango-img" />
              <span>{r.nombre}</span>
            </p>
          </div>
        </div>

        <div className="heroe-rating">
          <span className="heroe-rating-num">{perfil.rating}</span>
          <span className="heroe-rating-k">rating</span>
          {perfil.deltaSemana !== 0 && (
            <span className="heroe-delta">
              {perfil.deltaSemana > 0 ? "▲ +" : "▼ "}
              {perfil.deltaSemana} esta semana
            </span>
          )}
        </div>

        <Evolucion puntos={perfil.historial} />
      </div>

      <div className="heroe-meta">
        <div className="heroe-meta-texto">
          <img src={insignia(r.nombre)} alt={r.nombre} className="rango-img rango-img--chica" />
          {sig ? (
            <span>
              ¡Te faltan <strong>{sig.faltan} puntos</strong> para ser{" "}
              <strong className="heroe-sig">{sig.nombre}</strong>!
            </span>
          ) : (
            <span>
              ¡Alcanzaste el rango máximo: <strong className="heroe-sig">{r.nombre}</strong>!
            </span>
          )}
          <span className="heroe-meta-pct">{Math.round(progreso * 100)}%</span>
          {sig && <img src={insignia(sig.nombre)} alt={sig.nombre} className="rango-img rango-img--chica" />}
        </div>
        <div
          className={sig ? "barra barra--grande" : "barra barra--grande barra--completa"}
          role="progressbar"
          aria-valuenow={Math.round(progreso * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span style={{ width: `${progreso * 100}%` }} />
        </div>

        <ol className="escalera" aria-label="Rangos">
          {CORTES.map((c) => (
            <li
              key={c.nombre}
              className={
                c.nombre === r.nombre
                  ? "escalon escalon--actual"
                  : c.desde > perfil.rating
                    ? "escalon escalon--bloqueado"
                    : "escalon"
              }
            >
              <img src={insignia(c.nombre)} alt="" className="rango-img" />
              <span className="escalon-nombre">{c.nombre}</span>
              <span className="escalon-desde">{c.desde}+</span>
            </li>
          ))}
        </ol>
      </div>

      <dl className="perfil-cifras">
        {cifras.map((c) => (
          <div key={c.k} className="perfil-cifra">
            <dd>{c.v}</dd>
            <dt>
              {c.k}
              {c.nota && <span className="faint"> {c.nota}</span>}
            </dt>
          </div>
        ))}
      </dl>

      {perfil.rival && (
        <div className="rival">
          {perfil.puesto === 1 ? (
            <span>
              Eres el <strong>#1 del ranking</strong>.{" "}
              <a className={`u ${rango(perfil.rival.rating).clase}`} href="#">
                {perfil.rival.handle}
              </a>{" "}
              te sigue a <strong>{distanciaRival} puntos</strong>: defiende tu puesto.
            </span>
          ) : (
            <span>
              Estás a <strong>{distanciaRival} puntos</strong> de superar a{" "}
              <a className={`u ${rango(perfil.rival.rating).clase}`} href="#">
                {perfil.rival.handle}
              </a>{" "}
              y quedarte con el puesto <strong>#{perfil.rival.puesto}</strong>.
            </span>
          )}
        </div>
      )}
    </section>
  );
}
