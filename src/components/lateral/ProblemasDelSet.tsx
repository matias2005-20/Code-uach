import Bloque from "@/components/layout/Bloque";
import Insignia from "@/components/ui/Insignia";
import Vacio from "@/components/ui/Vacio";
import type { ProblemaDelSet } from "@/lib/tipos";

export default function ProblemasDelSet({ set }: { set: ProblemaDelSet[] }) {
  return (
    <Bloque titulo="Problemas del set" apagado>
      {set.length === 0 ? (
        <Vacio compacto>Este ramo todavía no tiene problemas publicados.</Vacio>
      ) : (
        <div>
          {set.map((p) => (
            <div className="setrow" key={p.letra}>
              <span className="mono faint setrow-letra">{p.letra}</span>
              <a href="#" className="setrow-nombre">
                {p.nombre}
              </a>
              {p.veredicto ? (
                <Insignia veredicto={p.veredicto} corta />
              ) : (
                <span className="faint setrow-sin">—</span>
              )}
            </div>
          ))}
        </div>
      )}
    </Bloque>
  );
}
