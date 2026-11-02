import Bloque, { CuerpoBloque } from "@/components/layout/Bloque";

export const REGLA_HILO =
  "Se puede pedir una pista y explicar en palabras. No se pega código de una solución completa antes de que cierre el plazo.";

export default function ReglasDelHilo() {
  return (
    <Bloque titulo="Reglas del hilo" apagado>
      <CuerpoBloque>
        <p className="dim regla-hilo">{REGLA_HILO}</p>
      </CuerpoBloque>
    </Bloque>
  );
}
