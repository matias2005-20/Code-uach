/**
 * Avatar generado del handle: una inicial sobre un color estable. Evita tener
 * que subir, almacenar y servir imágenes de perfil.
 */
const paleta = ["#c20430", "#003a70", "#5f259f", "#00693e", "#007396", "#d4420a"];

function colorDe(handle: string) {
  let n = 0;
  for (const c of handle) n = (n + c.charCodeAt(0)) % paleta.length;
  return paleta[n];
}

export default function Avatar({ handle }: { handle: string }) {
  return (
    <div className="avatar" style={{ background: colorDe(handle) }} aria-hidden="true">
      {handle.replace(/^prof\./, "").slice(0, 1).toUpperCase()}
    </div>
  );
}
