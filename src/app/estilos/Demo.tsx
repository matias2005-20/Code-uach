import Link from "next/link";
import { rango } from "@/lib/rango";
import { casos, problemas, ranking } from "./datos-demo";

const etiquetaEstado = {
  resuelto: "resuelto",
  intentado: "intentado",
  nuevo: "sin intentar",
} as const;

/**
 * Una misma pantalla de CodeUACh renderizada con el mismo marcado en las tres
 * variantes. Lo único que cambia es `data-v`, que selecciona el tema en estilos.css.
 */
export default function Demo({ v }: { v: "a" | "b" | "c" }) {
  return (
    <div className="sr" data-v={v}>
      <header className="mast">
        <div className="wrapx mast-in">
          <Link href="/estilos" className="brand">
            <span className="brand-mark">UACh</span>
            <span className="brand-name">CodeUACh</span>
          </Link>
          <nav className="mainnav">
            <a className="is-active" href="#">Problemas</a>
            <a href="#">Envíos</a>
            <a href="#">Ranking</a>
            <a href="#">Ramos</a>
            <a href="#">Ayuda</a>
          </nav>
          <div className="account">
            <span className={`user ${rango(980).clase}`}>jurjur45</span>
            <a className="quiet" href="#">salir</a>
          </div>
        </div>
      </header>

      <div className="subbar">
        <div className="wrapx subbar-in">
          <span className="crumb">INFO134 · Programación</span>
          <span className="crumb-sep">/</span>
          <span className="crumb crumb-now">Lista de problemas</span>
          <span className="spacer" />
          <span className="term">Semestre 2026-2</span>
        </div>
      </div>

      <div className="wrapx layout">
        <main className="col-main">
          <section className="card">
            <div className="card-head">
              <h2>Problemas</h2>
              <div className="filters">
                <button className="chip chip--on" type="button">todos</button>
                <button className="chip" type="button">sin resolver</button>
                <button className="chip" type="button">por tema</button>
              </div>
            </div>
            <table className="grid-table">
              <thead>
                <tr>
                  <th className="w-id">#</th>
                  <th>Nombre</th>
                  <th className="w-tema">Tema</th>
                  <th className="w-num num">Dificultad</th>
                  <th className="w-num num">Resueltos</th>
                  <th className="w-est">Estado</th>
                </tr>
              </thead>
              <tbody>
                {problemas.map((p) => {
                  const r = rango(p.rating);
                  return (
                    <tr key={p.id} className={`row-${p.estado}`}>
                      <td className="w-id mono">{p.id}</td>
                      <td>
                        <a className="plink" href="#">{p.nombre}</a>
                      </td>
                      <td className="w-tema dim">{p.tema}</td>
                      <td className={`w-num num mono ${r.clase}`}>{p.rating}</td>
                      <td className="w-num num mono dim">{p.resueltos}</td>
                      <td className="w-est">
                        <span className={`state state--${p.estado}`}>
                          {etiquetaEstado[p.estado]}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <section className="card">
            <div className="card-head">
              <h2>Último envío</h2>
              <span className="meta">#1042 · hace 3 minutos</span>
            </div>
            <div className="card-body">
              <div className="verdict-top">
                <span className="badge badge--ac">Aceptado</span>
                <span className="verdict-meta">
                  <b>B. Cuenta de vocales</b> · Python 3.12 · 4/4 casos · 0,057 s · 11 MB
                </span>
              </div>
              <pre className="code">
                <code>{`palabra = input().lower()
print(sum(1 for c in palabra if c in "aeiou"))`}</code>
              </pre>
              <ul className="cases">
                {casos.map((c) => (
                  <li key={c.n}>
                    <span className="tick">✓</span>
                    <span className="case-n mono">caso {c.n}</span>
                    <span className="case-d dim">{c.desc}</span>
                    <span className="case-ms mono dim">{c.ms} ms</span>
                  </li>
                ))}
              </ul>
              <div className="verdict-foot">
                <span className="badge badge--wa">Incorrecto</span>
                <span className="badge badge--tle">Tiempo excedido</span>
                <span className="badge badge--ce">Error de compilación</span>
                <span className="badge badge--re">Error en ejecución</span>
                <span className="meta">— los otros veredictos posibles</span>
              </div>
            </div>
          </section>
        </main>

        <aside className="col-side">
          <section className="card">
            <div className="card-head">
              <h2>Ranking del ramo</h2>
              <a className="quiet" href="#">ver todo</a>
            </div>
            <table className="grid-table compact">
              <tbody>
                {ranking.map((p) => {
                  const r = rango(p.rating);
                  return (
                    <tr key={p.usuario} className={p.usuario === "jurjur45" ? "row-me" : undefined}>
                      <td className="w-id mono dim">{p.puesto}</td>
                      <td>
                        <a className={`user ${r.clase}`} href="#">{p.usuario}</a>
                        <span className="carrera">{p.carrera}</span>
                      </td>
                      <td className="num mono">{p.puntaje}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <section className="card">
            <div className="card-head">
              <h2>Tu progreso</h2>
            </div>
            <div className="card-body">
              <div className="stat">
                <span className="stat-n">8</span>
                <span className="stat-l">problemas resueltos</span>
              </div>
              <div className="bars">
                <div className="bar">
                  <span className="bar-l">implementación</span>
                  <span className="bar-t"><i style={{ width: "86%" }} /></span>
                  <span className="bar-v mono">86%</span>
                </div>
                <div className="bar">
                  <span className="bar-l">strings</span>
                  <span className="bar-t"><i style={{ width: "64%" }} /></span>
                  <span className="bar-v mono">64%</span>
                </div>
                <div className="bar">
                  <span className="bar-l">grafos</span>
                  <span className="bar-t"><i className="low" style={{ width: "21%" }} /></span>
                  <span className="bar-v mono">21%</span>
                </div>
              </div>
            </div>
          </section>

          <section className="card card--note">
            <div className="card-body">
              <p>
                <b>Entrega 3</b> cierra el viernes 25 a las 23:59. Faltan 4 problemas
                del set obligatorio.
              </p>
            </div>
          </section>
        </aside>
      </div>

      <footer className="foot">
        <div className="wrapx foot-in">
          <span>Proyecto académico · Taller de Ingeniería · Universidad Austral de Chile</span>
          <span className="dim">No es un sitio oficial de la UACh · Valdivia, 2026</span>
        </div>
      </footer>
    </div>
  );
}
