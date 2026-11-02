import { veredictoCorto } from "@/lib/rango";
import type { Mensaje } from "@/lib/tipos";

type Envio = NonNullable<Mensaje["envio"]>;

/** El envío que acompaña a un mensaje: código y resultado por caso. */
export default function EnvioAdjunto({ envio }: { envio: Envio }) {
  return (
    <>
      <div className="code-bar">
        <span>{envio.archivo}</span>
        <span className="code-bar-lang">{envio.lenguaje}</span>
      </div>
      <pre className="code">
        <code>{envio.codigo}</code>
      </pre>

      {envio.casos.length > 0 && (
        <table className="cases">
          <thead>
            <tr>
              <th>Caso</th>
              <th>Descripción</th>
              <th className="num">Tiempo</th>
              <th className="num">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {envio.casos.map((c) => (
              <tr key={c.n}>
                <td className="mono">#{c.n}</td>
                <td className="dim">{c.desc}</td>
                <td className="num mono">{c.ms} ms</td>
                <td className="num caso-resultado">{veredictoCorto[c.veredicto]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="dim envio-resumen">{envio.resumen}</p>
    </>
  );
}
