import { veredictoCorto, veredictoLargo } from "@/lib/rango";
import type { Veredicto } from "@/lib/tipos";

/** La insignia de veredicto. `corta` es la que cabe en una celda de tabla. */
export default function Insignia({
  veredicto,
  corta = false,
}: {
  veredicto: Veredicto;
  corta?: boolean;
}) {
  return (
    <span
      className={`badge badge--${veredicto}`}
      style={corta ? { fontSize: "10.5px" } : undefined}
    >
      {corta ? veredictoCorto[veredicto] : veredictoLargo[veredicto]}
    </span>
  );
}
