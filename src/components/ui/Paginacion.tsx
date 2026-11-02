export default function Paginacion({
  pagina,
  totalPaginas,
  totalMensajes,
}: {
  pagina: number;
  totalPaginas: number;
  totalMensajes: number;
}) {
  if (totalPaginas <= 1) return null;

  return (
    <div className="pager">
      <span className="here">{pagina}</span>
      {pagina < totalPaginas && <a href="#">siguiente ›</a>}
      <span className="push">
        {totalMensajes} mensajes · página {pagina} de {totalPaginas}
      </span>
    </div>
  );
}
