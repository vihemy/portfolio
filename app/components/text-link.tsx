import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * Inline link that picks the right element for the destination:
 * - `/internal` → next/link
 * - `#anchor` / `mailto:` → plain anchor
 * - `https://…` → new tab, with a small ↗ marker
 *
 * Styling comes from `.link` (or `.prose a`) in global.css.
 */
export function TextLink({ href, children, className, ...rest }: Props) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...rest}
    >
      {children}
      <span className="ext-arrow" aria-hidden="true">
        ↗
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
