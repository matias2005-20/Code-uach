import Bloque, { CuerpoBloque } from "@/components/layout/Bloque";
import Vacio from "@/components/ui/Vacio";
import type { Aviso } from "@/lib/tipos";

export default function PanelAviso({ aviso }: { aviso: Aviso | null }) {
  return (
    <Bloque titulo="Aviso" apagado>
      {aviso ? (
        <CuerpoBloque>
          <p className="aviso-cuerpo">{aviso.cuerpo}</p>
        </CuerpoBloque>
      ) : (
        <Vacio compacto>No hay avisos publicados.</Vacio>
      )}
    </Bloque>
  );
}
