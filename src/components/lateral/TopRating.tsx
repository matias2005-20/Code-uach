import Bloque from "@/components/layout/Bloque";
import Handle from "@/components/ui/Handle";
import Vacio from "@/components/ui/Vacio";
import { rango } from "@/lib/rango";
import type { TopUsuario } from "@/lib/tipos";

function Delta({ valor }: { valor: number }) {
  const signo = valor > 0 ? "up" : valor < 0 ? "down" : "flat";
  return (
    <td className={`delta delta--${signo}`}>
      {valor > 0 ? `+${valor}` : valor < 0 ? valor : "—"}
    </td>
  );
}

export default function TopRating({ top }: { top: TopUsuario[] }) {
  return (
    <Bloque
      titulo="Top rating"
      apagado
      accion={top.length > 0 ? <a href="#">ver todos</a> : undefined}
    >
      {top.length === 0 ? (
        <Vacio compacto>Nadie tiene rating todavía.</Vacio>
      ) : (
        <table className="top">
          <tbody>
            {top.map((u) => (
              <tr key={u.usuario} className={u.yo ? "me" : undefined}>
                <td className="pos">{u.puesto}</td>
                <td className="who">
                  <Handle usuario={u.usuario} rating={u.rating} />
                  <small>{u.carrera}</small>
                </td>
                <td className={`pts ${rango(u.rating).clase}`}>{u.rating}</td>
                <Delta valor={u.delta} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Bloque>
  );
}
