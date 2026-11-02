import Link from "next/link";
import { notFound } from "next/navigation";
import Demo from "../Demo";

const validas = ["a", "b", "c"] as const;
type Variante = (typeof validas)[number];

export function generateStaticParams() {
  return validas.map((variante) => ({ variante }));
}

export default async function VariantePage({
  params,
}: {
  params: Promise<{ variante: string }>;
}) {
  const { variante } = await params;
  if (!validas.includes(variante as Variante)) notFound();

  return (
    <>
      <Demo v={variante as Variante} />
      <div className="pick" style={{ minHeight: 0, padding: "0 0 24px" }}>
        <div className="wrapx">
          <Link className="backlink" href="/estilos">
            ← volver a las tres variantes
          </Link>
        </div>
      </div>
    </>
  );
}
