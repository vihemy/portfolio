import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "app/components/section";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Work and education across product development, software engineering, interaction design, and digital experiences.",
};

const productRoles = [
  {
    title: "Developer",
    organization: "No Parking Production",
    period: "2025–Present",
    current: true,
    highlights: [
      {
        label: "Product delivery",
        detail:
          "Build user-facing digital exhibition systems across Scandinavia, designed for reliable, unattended operation in venues serving hundreds of thousands of yearly visitors.",
      },
      {
        label: "Technical ownership",
        detail:
          "Take projects from proposals and prototypes through launch and ongoing maintenance, working across web, distributed systems, physical computing, and generative AI.",
      },
    ],
    projects: [
      {
        label: "Nordiska Museet · AI portrait system",
        href: "/projects/diffusion-portrait-pipeline",
      },
      {
        label: "Trapholt · visitor experience platform",
        href: "/projects/physical-digital-art-tool",
      },
    ],
  },
  {
    title: "Developer & Interaction Designer",
    organization: "Kattegatcentret",
    period: "2021–2024",
    current: false,
    highlights: [
      {
        label: "Product leadership",
        detail:
          "Key contributer to design and sole developer of more than 30 visitor and staff facing applications, coordinating cross-disciplinary teams and stakeholders.",
      },
      {
        label: "Research & iteration",
        detail:
          "Led UX research and built visitor-data collection and reporting workflows with Python, the Epinion API, and Power BI to inform improvements and reduce manual reporting.",
      },
    ],
    projects: [
      {
        label: "Kattegatcentret · GenAI installation",
        href: "/projects/genai-idea-visualizer",
      },
    ],
  },
  {
    title: "Co-founder, UX Researcher & Audio Engineer",
    organization: "Aarhus Urban Legends",
    period: "2020–2021",
    current: false,
    highlights: [
      {
        label: "Product ownership",
        detail:
          "Co-founded a company producing interactive audio experiences and led UX research and technical delivery for the audio walk Mød Mig i Mørket.",
      },
      {
        label: "Launch",
        detail:
          "Launched at Aarhus Festuge, reaching more than 1,000 users in its opening week.",
      },
    ],
    projects: [],
  },
];

export default function Experience() {
  return (
    <section>
      <PageTitle>Experience</PageTitle>

      <p className="mb-8 text-[1.0625rem] leading-relaxed text-ink-soft">
      I’m a software developer who takes a key technical role from product discovery and prototyping through deployment and ongoing operation. I draw on my background in digital design and communication to build products that meet the needs of both users and stakeholders.
      </p>

      <section
        aria-labelledby="career-highlights"
        className="mb-12 border-y border-line"
      >
        <h2 id="career-highlights" className="sr-only">
          Career highlights
        </h2>
        <dl className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div className="py-4 sm:pr-5">
            <dt className="text-[2rem] leading-none font-medium tracking-tight text-ink sm:text-[2.25rem]">
              1M+
            </dt>
            <dd className="mt-2">
              <span className="block text-[0.975rem] font-medium text-ink">
                annual users reached
              </span>
              <span className="meta mt-1 block">
                Combined annual reach of user-facing systems I&apos;ve developed
                and deployed across museums in Scandinavia.
              </span>
            </dd>
          </div>
          <div className="py-4 sm:pl-5">
            <dt className="text-[2rem] leading-none font-medium tracking-tight text-ink sm:text-[2.25rem]">
              50+
            </dt>
            <dd className="mt-2">
              <span className="block text-[0.975rem] font-medium text-ink">
                applications &amp; installations developed
              </span>
              <span className="meta mt-1 block">
                Across product roles, from early concepts through production
                deployment.
              </span>
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="product-engineering" className="mb-14">
        <h2
          id="product-engineering"
          className="meta mb-6 border-b border-line pb-2 text-ink"
        >
          Product &amp; engineering
        </h2>

        <ol className="relative ml-1 border-l border-line">
          {productRoles.map((role) => (
            <li
              key={role.organization}
              className="relative pb-10 pl-6 last:pb-0"
            >
              <span
                aria-hidden="true"
                className={`absolute -left-[5px] top-2 h-2 w-2 rounded-full ring-4 ring-bg ${
                  role.current ? "bg-accent" : "bg-muted"
                }`}
              />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <h3 className="text-[1.1875rem] leading-snug font-medium text-ink">
                    {role.title}
                  </h3>
                  <span className="text-ink-soft">at {role.organization}</span>
                  {role.current && (
                    <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.6875rem] leading-none text-muted">
                      Current
                    </span>
                  )}
                </div>
                <p className="meta shrink-0 tabular-nums">{role.period}</p>
              </div>

              <ul className="mt-4 space-y-3 text-[0.975rem] leading-relaxed text-ink-soft">
                {role.highlights.map((highlight) => (
                  <li key={highlight.label}>
                    <strong className="font-medium text-ink">
                      {highlight.label}.
                    </strong>{" "}
                    {highlight.detail}
                  </li>
                ))}
              </ul>

              {role.projects.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {role.projects.map((project) => (
                    <li key={project.href}>
                      <Link
                        className="inline-flex rounded-full border border-line px-3 py-1.5 text-[0.8125rem] leading-snug text-ink transition-colors hover:border-accent hover:text-accent"
                        href={project.href}
                      >
                        {project.label} <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-14">
        <details className="group border-y border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 [&::-webkit-details-marker]:hidden">
            <h2 id="additional-experience" className="meta text-ink">
              Additional experience
            </h2>
            <span
              aria-hidden="true"
              className="meta text-lg transition-transform group-open:rotate-180 motion-reduce:transition-none"
            >
              ↓
            </span>
          </summary>
          <ul className="divide-y divide-line border-t border-line">
            <li className="py-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-[1rem] font-medium text-ink">
                  Guest Lecturer
                </h3>
                <p className="meta shrink-0 tabular-nums">2020–2022</p>
              </div>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                Lectured on interactive audio and physical-digital product
                development at Aarhus University, VIA University College, and
                the Academy for Talented Youth.
              </p>
            </li>
            <li className="py-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-[1rem] font-medium text-ink">
                  Freelance Radio Producer &amp; Sound Designer
                </h3>
                <p className="meta shrink-0 tabular-nums">2019–2021</p>
              </div>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                Produced radio, podcasts, audio walks, and sound installations
                for clients including DR, DSB, and Kontrafej.
              </p>
            </li>
          </ul>
        </details>
      </section>

      <section aria-labelledby="education" className="mb-14">
        <h2
          id="education"
          className="meta mb-4 border-b border-line pb-2 text-ink"
        >
          Education
        </h2>
        <ul className="divide-y divide-line border-y border-line">
          <li className="py-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="text-[1rem] font-medium text-ink">
                  <Link
                    className="link"
                    href="https://kandidat.au.dk/digitaldesign"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Digital Design
                  </Link>
                </h3>
                <p className="meta mt-1">Master of Science · Aarhus University</p>
              </div>
              <p className="meta shrink-0 tabular-nums">2019–2021</p>
            </div>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
              Focused on interactive digital technologies and their cultural,
              social, and aesthetic contexts. The programme connected critical
              analysis with practical design and development of digital
              products, services, and interactions. My thesis explored the
              design and production of interactive audio experiences.
            </p>
          </li>
          <li className="py-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="text-[1rem] font-medium text-ink">
                  <Link
                    className="link"
                    href="https://bachelor.au.dk/aestetik-og-kultur"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Aesthetics and Culture
                  </Link>
                </h3>
                <p className="meta mt-1">Bachelor of Arts · Aarhus University</p>
              </div>
              <p className="meta shrink-0 tabular-nums">2015–2018</p>
            </div>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
              Studied how aesthetic expression and cultural practices shape
              society, combining theory and analysis with research methods and
              practical inquiry. This built a foundation for understanding
              audience, meaning, and cultural context. <br></br>With supplementary
              studies at the University of Copenhagen in 2017–2018.
            </p>
          </li>
          <li className="py-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="text-[1rem] font-medium text-ink">
                  Full Stack Open
                </h3>
                <p className="meta mt-1">
                  Certificate · University of Helsinki
                </p>
              </div>
              <p className="meta shrink-0 tabular-nums">March 2025</p>
            </div>
            <Link
              className="link mt-2 inline-block text-[0.9375rem]"
              href="https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/509e0c6edb8a4b0f7cce48f246d4c64c"
              target="_blank"
              rel="noopener noreferrer"
            >
              View certificate
            </Link>
          </li>
        </ul>
      </section>
    </section>
  );
}
