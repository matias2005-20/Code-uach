import Link from "next/link";

/** Los enlaces de la barra principal. Es configuración de la vista, no un dato. */
const NAV = [
  { texto: "Índice", href: "/" },
  { texto: "Problemas", href: "/hilo" },
  { texto: "Envíos", href: "/envios" },
  { texto: "Ranking", href: "/hilo" },
  { texto: "Editoriales", href: "/hilo" },
  { texto: "Miembros", href: "/hilo" },
] as const;

export type SeccionActiva = (typeof NAV)[number]["texto"];

export default function Cabecera({ activo }: { activo: SeccionActiva }) {
  return (
    <>
      <div className="strip">
        <div className="wrap strip-in">
          <span>Universidad Austral de Chile · Valdivia</span>
          <span className="push" />
          <a href="#">Ayuda</a>
          <a href="#">Reglas</a>
          <a href="#">jurjur45 · Salir</a>
        </div>
      </div>

      <header className="masthead">
        <div className="wrap masthead-in">
          <Link className="logo" href="/">
            <span className="logo-mark">UACh</span>
            <span className="logo-text">
              <h1>CodeUACh</h1>
              <p>Juez automático de programación · prototipo académico</p>
            </span>
          </Link>
          <form className="search" action="#" role="search">
            <input type="text" placeholder="Buscar problema o tema…" aria-label="Buscar" />
            <button type="submit">Buscar</button>
          </form>
        </div>
      </header>

      <nav className="navbar">
        <div className="wrap navbar-in">
          {NAV.map(({ texto, href }) => (
            <Link key={texto} className={texto === activo ? "on" : undefined} href={href}>
              {texto}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
