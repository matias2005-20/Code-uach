import Pagina from "@/components/layout/Pagina";
import Leyenda from "@/components/indice/Leyenda";
import PanelUsuario from "@/components/indice/PanelUsuario";
import RankingGlobal from "@/components/indice/RankingGlobal";
import SeccionRamos from "@/components/indice/SeccionRamos";
import Estadisticas from "@/components/lateral/Estadisticas";
import PanelAviso from "@/components/lateral/PanelAviso";
import {
  obtenerAviso,
  obtenerCategorias,
  obtenerEstadisticas,
  obtenerPerfil,
  obtenerTopRating,
} from "@/lib/datos";

export default async function Indice() {
  const [perfil, categorias, top, stats, aviso] = await Promise.all([
    obtenerPerfil(),
    obtenerCategorias(),
    obtenerTopRating(),
    obtenerEstadisticas(),
    obtenerAviso(),
  ]);

  return (
    <Pagina
      activo="Índice"
      migas={[{ texto: "Índice", href: "/" }, { texto: "Tu panel" }]}
      lateral={
        <>
          <Estadisticas datos={stats} />
          <PanelAviso aviso={aviso} />
        </>
      }
    >
      <PanelUsuario perfil={perfil} />
      <RankingGlobal top={top} total={stats.miembros} />
      {categorias.map((c) => (
        <SeccionRamos key={c.id} categoria={c} />
      ))}
      <Leyenda />
    </Pagina>
  );
}
