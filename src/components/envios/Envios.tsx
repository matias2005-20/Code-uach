
"use client";

import { useState, type FormEvent } from "react";
import Bloque, { CuerpoBloque } from "@/components/layout/Bloque";
import Handle from "@/components/ui/Handle";
import { numero } from "@/lib/formato";
import { veredictoLargo } from "@/lib/rango";
import type { EnvioFila, ProblemaDelSet } from "@/lib/tipos";

// Lenguajes que actualmente admite nuestro juez.
const LENGUAJES = [
  { nombre: "C++17", valor: "cpp" },
  { nombre: "Python 3", valor: "python" },
] as const;

// Estructura de la respuesta de nuestra API.
type ResultadoJuez = {
  veredicto: "ac" | "wa" | "ce" | "re";
  detalle: string;
  resultados: {
    caso: number;
    entrada: string;
    esperado: string;
    obtenido: string;
    correcto: boolean;
  }[];
};

// Ampliamos el tipo de envío para guardar los resultados de ejecución.
type Fila = EnvioFila & {
  detalle?: string;
  casos?: ResultadoJuez["resultados"];
};

export default function Envios({
  iniciales,
  problemas,
  usuario,
  rating,
}: {
  iniciales: EnvioFila[];
  problemas: ProblemaDelSet[];
  usuario: string;
  rating: number;
}) {
// Habilitamos los problemas A y B.
const problemasDisponibles = problemas.filter(
  (p) => p.letra === "A" || p.letra === "B"
);
  const [filas, setFilas] = useState<Fila[]>(iniciales);
  const [soloMios, setSoloMios] = useState(false);

  const [problema, setProblema] = useState(
    problemasDisponibles[0]
      ? `${problemasDisponibles[0].letra} · ${problemasDisponibles[0].nombre}`
      : ""
  );

  const [lenguaje, setLenguaje] = useState<"cpp" | "python">("python");
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [nuevo, setNuevo] = useState<number | null>(null);
  const [resultado, setResultado] = useState<ResultadoJuez | null>(null);

  // Envía el código a nuestra API para ejecutarlo con Wandbox.
  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (cargando) return;

    setMensaje("");
    setResultado(null);
    setNuevo(null);

    if (!problema) {
      setMensaje("No hay un problema disponible para enviar.");
      return;
    }

    if (!codigo.trim()) {
      setMensaje("Escribe tu código antes de enviarlo.");
      return;
    }

    setCargando(true);

    try {
      const respuesta = await fetch("/api/juez/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // El problema B corresponde al identificador 2.
          problem_id: problema.startsWith("A ·") ? 1 : 2,
          language: lenguaje,
          code: codigo,
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.error ?? "No se pudo ejecutar el código."
        );
      }

      const evaluacion = datos as ResultadoJuez;

      // Comprobamos que la API devolvió un veredicto válido.
      if (
        !["ac", "wa", "ce", "re"].includes(evaluacion.veredicto)
      ) {
        throw new Error("El juez devolvió una respuesta inválida.");
      }

      setResultado(evaluacion);

      // Identificador local: todavía no existe persistencia en BD.
      const id = Date.now();

      const nuevaFila: Fila = {
        id,
        cuando: "ahora",
        usuario,
        rating,
        problema,
        lenguaje:
          LENGUAJES.find((l) => l.valor === lenguaje)?.nombre ??
          lenguaje,
        veredicto: evaluacion.veredicto,
        tiempoMs: 0,
        memoriaKb: 0,
        detalle: evaluacion.detalle,
        casos: evaluacion.resultados ?? [],
      };

      setFilas((anteriores) => [nuevaFila, ...anteriores]);
      setNuevo(id);

      setMensaje(
        `Envío #${id}: ${veredictoLargo[evaluacion.veredicto]}.`
      );
    } catch (error) {
      setMensaje(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al ejecutar el código."
      );
    } finally {
      setCargando(false);
    }
  }

  // Aplicamos el filtro de envíos del usuario.
  const visibles = soloMios
    ? filas.filter((f) => f.usuario === usuario)
    : filas;

  return (
    <>
      <Bloque titulo="Enviar solución">
        <CuerpoBloque>
          <form className="enviar" onSubmit={enviar}>
            <div className="enviar-fila">
              <label>
                Problema

                <select
                  value={problema}
                  onChange={(e) => setProblema(e.target.value)}
                  required
                  disabled={problemasDisponibles.length === 0}
                >
                  {problemasDisponibles.map((p) => (
                    <option
                      key={p.letra}
                      value={`${p.letra} · ${p.nombre}`}
                    >
                      {p.letra} · {p.nombre}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Lenguaje

                <select
                  value={lenguaje}
                  onChange={(e) =>
                    setLenguaje(e.target.value as "cpp" | "python")
                  }
                >
                  {LENGUAJES.map((l) => (
                    <option key={l.valor} value={l.valor}>
                      {l.nombre}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              Código fuente

              <textarea
                className="enviar-codigo"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                spellCheck={false}
                required
                placeholder={
                  lenguaje === "cpp"
                    ? "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Tu solución\n}"
                    : "palabra = input().strip()\nprint(sum(1 for c in palabra if c in 'aeiou'))"
                }
              />
            </label>

            <div className="enviar-pie">
              <span className="dim">
                Juez virtual · Wandbox
              </span>

              <button
                className="btn enviar-btn"
                type="submit"
                disabled={cargando || !problema}
              >
                {cargando ? "Ejecutando..." : "Enviar"}
              </button>
            </div>

            {mensaje && (
              <p role="status" aria-live="polite">
                {mensaje}
              </p>
            )}

            {resultado && (
              <div className="resultado-juez">
                <h3>
                  Resultado: {veredictoLargo[resultado.veredicto]}
                </h3>

                <p>{resultado.detalle}</p>

                <p>
                  Casos superados:{" "}
                  {resultado.resultados.filter((c) => c.correcto).length}
                  {" / "}
                  {resultado.resultados.length}
                </p>

                {resultado.resultados.map((caso) => (
                  <div key={caso.caso}>
                    <strong>
                      Caso {caso.caso}:{" "}
                      {caso.correcto ? "Correcto" : "Incorrecto"}
                    </strong>

                    <p>Entrada: {caso.entrada}</p>
                    <p>Esperado: {caso.esperado}</p>
                    <p>Obtenido: {caso.obtenido || "(vacío)"}</p>
                  </div>
                ))}
              </div>
            )}
          </form>
        </CuerpoBloque>
      </Bloque>

      <Bloque
        titulo="Envíos recientes"
        accion={
          <span className="filtro">
            <button
              type="button"
              className={soloMios ? undefined : "on"}
              onClick={() => setSoloMios(false)}
            >
              Todos
            </button>

            <button
              type="button"
              className={soloMios ? "on" : undefined}
              onClick={() => setSoloMios(true)}
            >
              Mis envíos
            </button>
          </span>
        }
      >
        <div className="envios-scroll">
          <table className="envios">
            <thead>
              <tr>
                <th>#</th>
                <th>Cuándo</th>
                <th>Quién</th>
                <th>Problema</th>
                <th>Lenguaje</th>
                <th>Veredicto</th>
                <th className="num">Tiempo</th>
                <th className="num">Memoria</th>
              </tr>
            </thead>

            <tbody>
              {visibles.map((f) => (
                <tr
                  key={f.id}
                  className={
                    f.id === nuevo ? "envio-nuevo" : undefined
                  }
                >
                  <td className="mono faint">{f.id}</td>

                  <td className="dim nowrap">{f.cuando}</td>

                  <td>
                    <Handle
                      usuario={f.usuario}
                      rating={f.rating}
                    />
                  </td>

                  <td>
                    <a href="/hilo">{f.problema}</a>
                  </td>

                  <td className="dim nowrap">{f.lenguaje}</td>

                  <td>
                    <span
                      className={`veredicto veredicto--${f.veredicto}`}
                    >
                      {veredictoLargo[f.veredicto]}
                    </span>
                  </td>

                  <td className="num">
                    {f.tiempoMs > 0 ? `${f.tiempoMs} ms` : "—"}
                  </td>

                  <td className="num">
                    {f.memoriaKb > 0
                      ? `${numero(f.memoriaKb)} KB`
                      : "—"}
                  </td>
                </tr>
              ))}

              {visibles.length === 0 && (
                <tr>
                  <td colSpan={8}>
                    No hay envíos para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Bloque>
    </>
  );
}
