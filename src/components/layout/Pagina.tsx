import Cabecera, { type SeccionActiva } from "./Cabecera";
import Migas, { type Miga } from "./Migas";
import Pie from "./Pie";

/**
 * El armazón de toda pantalla: cabecera, migas, dos columnas y pie. Evita que
 * cada página repita la misma estructura y que se desincronicen entre sí.
 */
export default function Pagina({
  activo,
  migas,
  lateral,
  children,
}: {
  activo: SeccionActiva;
  migas: Miga[];
  lateral: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="fx">
      <Cabecera activo={activo} />
      <Migas tramos={migas} />
      <div className="wrap cols">
        <main>{children}</main>
        <aside className="side">{lateral}</aside>
      </div>
      <Pie />
    </div>
  );
}
