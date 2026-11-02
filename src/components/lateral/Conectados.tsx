import Bloque, { CuerpoBloque } from "@/components/layout/Bloque";
import Handle from "@/components/ui/Handle";
import Vacio from "@/components/ui/Vacio";
import type { UsuarioEnLinea } from "@/lib/tipos";

export default function Conectados({
  usuarios,
  total,
}: {
  usuarios: UsuarioEnLinea[];
  total: number;
}) {
  return (
    <Bloque
      titulo="Quién está conectado"
      apagado
      nota={total > 0 ? `${total} en total` : undefined}
    >
      {usuarios.length === 0 ? (
        <Vacio compacto>No hay nadie conectado.</Vacio>
      ) : (
        <CuerpoBloque>
          <div className="online">
            {usuarios.map((u, i) => (
              <span key={u.usuario}>
                <Handle usuario={u.usuario} rating={u.rating} />
                {i < usuarios.length - 1 && <span className="faint">,</span>}
              </span>
            ))}
          </div>
        </CuerpoBloque>
      )}
    </Bloque>
  );
}
