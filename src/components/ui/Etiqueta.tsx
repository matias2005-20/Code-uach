/** Las etiquetas de un ramo: lenguaje, obligatorio o electivo. */
export default function Etiqueta({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>;
}
