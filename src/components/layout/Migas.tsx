import Link from "next/link";

export type Miga = { texto: string; href?: string };

/** El rastro de navegación. El último tramo nunca es enlace. */
export default function Migas({ tramos }: { tramos: Miga[] }) {
  return (
    <div className="wrap">
      <div className="crumbs">
        {tramos.map((t, i) => (
          <span key={`${t.texto}-${i}`} style={{ display: "contents" }}>
            {i > 0 && <span className="sep">›</span>}
            {t.href && i < tramos.length - 1 ? (
              <Link href={t.href}>{t.texto}</Link>
            ) : (
              <span className={i === tramos.length - 1 ? "now" : undefined}>{t.texto}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
