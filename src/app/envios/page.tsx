import Envios from "@/components/envios/Envios";
import Bloque, { CuerpoBloque } from "@/components/layout/Bloque";
import Pagina from "@/components/layout/Pagina";
import { numero } from "@/lib/formato";
import { veredictoLargo } from "@/lib/rango";

import type {
  EnvioFila,
  ProblemaDelSet,
  PerfilUsuario,
  ResumenVeredictos,
  Veredicto,
} from "@/lib/tipos";

// Dirección base de la aplicación.
// En producción se utiliza la URL configurada en Vercel.
// En desarrollo se utiliza localhost.
const BASE_URL =
  process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

// Consulta una API y convierte su respuesta JSON al tipo esperado.
async function obtenerJSON<T>(ruta: string): Promise<T> {
  const respuesta = await fetch(`${BASE_URL}${ruta}`, {
    cache: "no-store",
  });

  if (!respuesta.ok) {
    throw new Error(
      `Error al consultar ${ruta}: ${respuesta.status}. URL: ${respuesta.url}`
    );
  }

  return respuesta.json();
}

export default async function EnviosPage() {
  // Obtenemos los datos necesarios para construir la página.
  const [envios, problemas, perfil, resumen] = await Promise.all([
    obtenerJSON<EnvioFila[]>("/api/envios"),

    obtenerJSON<{ problemas: ProblemaDelSet[] }>(
      "/api/asignaciones/1/problemas"
    ).then((datos) => datos.problemas),

    obtenerJSON<PerfilUsuario>("/api/perfil"),

    obtenerJSON<ResumenVeredictos>("/api/envios/resumen"),
  ]);

  // Calculamos la cantidad total de envíos del resumen.
  const total = Object.values(resumen).reduce<number>(
    (a, b) => a + b,
    0
  );

  return (
    <Pagina
      activo="Envíos"
      migas={[
        { texto: "Índice", href: "/" },
        { texto: "Envíos" },
      ]}
      lateral={
        <>
          <Bloque
            titulo="Tus veredictos"
            apagado
            nota={`${numero(total)} envíos`}
          >
            <CuerpoBloque>
              <ul className="resumen-veredictos">
                {(Object.keys(resumen) as Veredicto[]).map((v) => (
                  <li key={v}>
                    <span className={`veredicto veredicto--${v}`}>
                      {veredictoLargo[v]}
                    </span>

                    <span className="resumen-barra">
                      <span
                        className={`resumen-relleno resumen-relleno--${v}`}
                        style={{
                          width: `${
                            total > 0 ? (resumen[v] / total) * 100 : 0
                          }%`,
                        }}
                      />
                    </span>

                    <span className="mono">{resumen[v]}</span>
                  </li>
                ))}
              </ul>
            </CuerpoBloque>
          </Bloque>

          <Bloque titulo="Cómo se juzga" apagado>
            <CuerpoBloque>
              <p className="dim regla-hilo">
                Cada envío se compila y se ejecuta contra todos los casos
                del problema. El veredicto es el del primer caso que falla;
                si pasa todos, es Aceptado.
              </p>
            </CuerpoBloque>
          </Bloque>
        </>
      }
    >
      <Envios
        iniciales={envios}
        problemas={problemas}
        usuario={perfil.handle}
        rating={perfil.rating}
      />
    </Pagina>
  );
}
