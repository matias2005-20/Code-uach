import { rango } from "@/lib/rango";

/**
 * El nombre de un usuario, teñido por su rango. El color sale de la paleta
 * secundaria del manual UACh, que asigna un color por facultad.
 */
export default function Handle({
  usuario,
  rating,
  href = "#",
}: {
  usuario: string;
  rating: number;
  href?: string;
}) {
  return (
    <a className={`u ${rango(rating).clase}`} href={href}>
      {usuario}
    </a>
  );
}
