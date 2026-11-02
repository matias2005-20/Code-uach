import Bloque from "@/components/layout/Bloque";
import Handle from "@/components/ui/Handle";
import { insignia, rango } from "@/lib/rango";
import type { TopUsuario } from "@/lib/tipos";

export default function RankingGlobal({ top, total }: { top: TopUsuario[]; total: number }) {
  return (
    <Bloque titulo="Ranking global" nota={`${total} participantes`} accion={<a href="#">ver completo</a>}>
      <div className="envios-scroll">
        <table className="ranking">
          <thead>
            <tr>
              <th className="num">#</th>
              <th>Usuario</th>
              <th>Rango</th>
              <th className="num">Resueltos</th>
              <th className="num">Rating</th>
              <th className="num">Semana</th>
            </tr>
          </thead>
          <tbody>
            {top.map((u) => {
              const r = rango(u.rating);
              return (
                <tr key={u.usuario} className={u.yo ? "ranking-yo" : undefined}>
                  <td className={`num ranking-pos ranking-pos--${u.puesto}`}>{u.puesto}</td>
                  <td>
                    <Handle usuario={u.usuario} rating={u.rating} />
                    <small className="ranking-carrera">{u.carrera}</small>
                  </td>
                  <td>
                    <span className="ranking-rango">
                      <img src={insignia(r.nombre)} alt="" className="rango-img" />
                      {r.nombre}
                    </span>
                  </td>
                  <td className="num">{u.resueltos}</td>
                  <td className={`num ranking-rating ${r.clase}`}>{u.rating}</td>
                  <td className={`num delta--${u.delta > 0 ? "up" : u.delta < 0 ? "down" : "flat"}`}>
                    {u.delta > 0 ? `+${u.delta}` : u.delta < 0 ? u.delta : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Bloque>
  );
}
