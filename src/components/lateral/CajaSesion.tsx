import Bloque, { CuerpoBloque } from "@/components/layout/Bloque";

/** El inicio de sesión incrustado en la portada, como en los foros de antes. */
export default function CajaSesion() {
  return (
    <Bloque titulo="Tu sesión" apagado>
      <CuerpoBloque>
        <div className="login">
          <label htmlFor="correo">Correo institucional</label>
          <input id="correo" type="text" placeholder="nombre.apellido@alumnos.uach.cl" />

          <label htmlFor="clave">Contraseña</label>
          <input id="clave" type="password" placeholder="••••••••" />

          <div className="remember">
            <input id="rec" type="checkbox" />
            <label htmlFor="rec" style={{ margin: 0, fontWeight: 400 }}>
              Mantener la sesión abierta
            </label>
          </div>

          <button className="btn" type="button">
            Entrar
          </button>

          <p className="faint nota-sesion">
            Solo cuentas @uach.cl y @alumnos.uach.cl. El rol de docente lo asigna la
            dirección del ramo.
          </p>
        </div>
      </CuerpoBloque>
    </Bloque>
  );
}
