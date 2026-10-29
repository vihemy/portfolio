import Link from "next/link";

/** Arrow that nudges right when its parent `.group` is hovered/focused. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block transition-transform duration-300 ease-out-soft group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none ${className}`}
    >
      →
    </span>
  );
}

/** "← Section" link shown above detail pages. */
export function BackLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group meta inline-flex items-center gap-1.5 transition-colors hover:text-ink"
    >
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 ease-out-soft group-hover:-translate-x-1 motion-reduce:transition-none"
      >
        ←
      </span>
      {children}
    </Link>
  );
}

/** Large title used at the top of detail pages. */
export function DetailTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="title mt-6 mb-4 text-[2rem] leading-[1.15] font-medium tracking-[-0.015em] text-ink sm:text-[2.25rem]">
      {children}
    </h1>
  );
}

/** Page-level heading used on index pages. */
export function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="title mb-6 text-[2rem] leading-tight font-medium tracking-[-0.015em] text-ink">
      {children}
    </h1>
  );
}
