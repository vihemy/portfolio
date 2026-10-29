import { metaData, socialLinks } from "app/config";
import { FaGithub, FaLinkedinIn, FaRss } from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";

const YEAR = new Date().getFullYear();

const links = [
  { label: "GitHub", href: socialLinks.github, icon: FaGithub, external: true },
  {
    label: "LinkedIn",
    href: socialLinks.linkedin,
    icon: FaLinkedinIn,
    external: true,
  },
  {
    label: "Email",
    href: socialLinks.email,
    icon: TbMailFilled,
    external: true,
  },
  { label: "RSS", href: "/rss.xml", icon: FaRss, external: false },
];

export default function Footer() {
  return (
    <footer className="meta mt-24 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-baseline sm:justify-between lg:mt-32">
      <p>
        © <time dateTime={String(YEAR)}>{YEAR}</time> {metaData.title}
      </p>
      <ul className="flex items-center gap-2">
        {links.map(({ label, href, icon: Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              title={label}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:text-ink motion-reduce:transition-none"
            >
              <Icon
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
