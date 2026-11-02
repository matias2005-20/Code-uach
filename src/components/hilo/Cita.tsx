/** El recurso más reconocible de un foro: citar a quien respondes. */
export default function Cita({ de, texto }: { de: string; texto: string }) {
  return (
    <div className="quote">
      <div className="quote-who">{de} escribió:</div>
      <div className="quote-what">{texto}</div>
    </div>
  );
}
