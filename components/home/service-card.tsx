import Image from "next/image";

/**
 * One quadrant of the winged-Icarus engraving sits directly on the folio page —
 * no blue field, no card fill. The four quadrants (`icarus-divide-1…4`) are
 * anchored toward the grid centre so the pale blueprint figure reassembles
 * unbroken across the seams and reads as one continuous plate. The plate holds a
 * flat 40% opacity so the pale engraving recedes evenly behind the ink copy
 * while staying airy — no base scrim.
 *
 * Hover lights the frame rather than zooming: the four sides and the blueprint
 * corner marks flare to cerulean — a light-emitting motif, not a depth
 * affordance. Pure CSS group-hover, so it degrades to an instant state change
 * under reduced motion.
 */
export function ServiceCardArt({
  image,
  alt,
  position,
  children,
}: {
  image: string;
  alt: string;
  /** object-position classes anchoring the quadrant toward the grid centre. */
  position: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative flex flex-1 flex-col">
      {/* this card's quadrant of the engraving (transparent plate on folio) */}
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 1152px) 560px, (min-width: 640px) 46vw, 92vw"
        className={`object-cover opacity-15 ${position}`}
      />

      {/* hover: the four sides light up */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 border border-transparent transition-[border-color,box-shadow] duration-500 ease-out group-hover:border-blueprint-deep/45 group-hover:shadow-[inset_0_0_40px_-12px_rgba(0,157,255,0.45)]"
      />
      {/* hover: the corner marks flare (blueprint registration marks) */}
      <CornerMarks />

      <div className="relative flex flex-1 flex-col p-7 sm:p-8">{children}</div>
    </div>
  );
}

const cornerBase =
  "pointer-events-none absolute size-5 border-ink/12 transition-all duration-500 ease-out group-hover:border-blueprint-deep group-hover:[filter:drop-shadow(0_0_6px_rgba(0,157,255,0.6))]";

function CornerMarks() {
  return (
    <div aria-hidden>
      <span className={`${cornerBase} left-3.5 top-3.5 border-l border-t`} />
      <span className={`${cornerBase} right-3.5 top-3.5 border-r border-t`} />
      <span className={`${cornerBase} bottom-3.5 left-3.5 border-b border-l`} />
      <span className={`${cornerBase} right-3.5 bottom-3.5 border-r border-b`} />
    </div>
  );
}
