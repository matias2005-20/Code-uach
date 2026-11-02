import Link from "next/link";
import Bloque, { CuerpoBloque } from "@/components/layout/Bloque";
import Pagina from "@/components/layout/Pagina";
import EnvioAdjunto from "@/components/hilo/EnvioAdjunto";
import ProblemasDelSet from "@/components/lateral/ProblemasDelSet";
import TuEstado from "@/components/lateral/TuEstado";
import Insignia from "@/components/ui/Insignia";
import Vacio from "@/components/ui/Vacio";
import {
  obtenerEstadoEnProblema,
  obtenerHilo,
  obtenerProblemasDelSet,
} from "@/lib/datos";
import type { Miga } from "@/components/layout/Migas";

// El chat del hilo (respuestas, citas y caja de respuesta) queda fuera por
// ahora: la página muestra sólo el enunciado y el último envío del usuario.
export default async function HiloPage() {
  const [hilo, estado, set] = await Promise.all([
    obtenerHilo(),
    obtenerEstadoEnProblema(),
    obtenerProblemasDelSet(),
  ]);

  const migas: Miga[] = hilo?.ramo
    ? [
        { texto: "Índice", href: "/" },
        { texto: `${hilo.ramo.codigo} · ${hilo.ramo.nombre}`, href: "/" },
        { texto: hilo.titulo },
      ]
    : [{ texto: "Índice", href: "/" }, { texto: "Problema" }];

  const enunciado = hilo?.mensajes.find((m) => m.fijado);
  const envio = hilo?.mensajes.find((m) => m.envio)?.envio;

  return (
    <Pagina
      activo="Problemas"
      migas={migas}
      lateral={
        <>
          <TuEstado estado={estado} />
          <ProblemasDelSet set={set} />
        </>
      }
    >
      <Bloque
        titulo={hilo ? hilo.titulo : "Problema"}
        nota={hilo?.limites}
        accion={<Link href="/envios">Enviar solución</Link>}
      >
        {enunciado ? (
          <CuerpoBloque>
            <p className="enunciado">{enunciado.cuerpo}</p>
          </CuerpoBloque>
        ) : (
          <Vacio>El enunciado aparece aquí en cuanto el docente lo publica.</Vacio>
        )}
      </Bloque>

      {envio && (
        <Bloque titulo="Tu último envío" apagado accion={<Insignia veredicto={envio.veredicto} />}>
          <CuerpoBloque>
            <EnvioAdjunto envio={envio} />
          </CuerpoBloque>
        </Bloque>
      )}
    </Pagina>
  );
}
