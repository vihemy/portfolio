import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getSortedProjectPosts } from "app/lib/posts";
import { Arrow, PageTitle } from "app/components/section";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies of work I have led or built end-to-end.",
};

export default function Projects() {
  const projects = getSortedProjectPosts();

  return (
    <section>
      <PageTitle>Projects</PageTitle>
      <div className="prose mb-12">
        <p>
          These are a selection of projects I've contributed to. If you're
          interested in knowing more about implementation or process, feel free
          to reach out.
        </p>
      </div>

      <ul className="flex flex-col gap-14">
        {projects.map(({ slug, metadata: m }, i) => (
          <li key={slug}>
            <Link href={`/projects/${slug}`} className="group block">
              <div
                className={`relative aspect-[16/9] w-full overflow-hidden rounded-lg ring-1 ring-inset ring-line ${
                  m.heroImageFit === "contain" ? "bg-black" : "bg-surface"
                }`}
                style={{ aspectRatio: m.heroImageAspectRatio }}
              >
                <Image
                  src={m.heroImage}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 640px"
                  className={`${
                    m.heroImageFit === "contain" ? "object-contain" : "object-cover"
                  } transition-transform duration-700 ease-out-soft group-hover:scale-[1.02] motion-reduce:transition-none`}
                  priority={i === 0}
                />
              </div>

              <div className="mt-4 grid grid-cols-[1fr_auto] items-baseline gap-x-4">
                <h2 className="text-[1.375rem] leading-snug font-medium tracking-[-0.01em] text-ink decoration-accent decoration-1 underline-offset-4 group-hover:underline">
                  {m.title}
                </h2>
                <span className="meta">{m.year}</span>
              </div>

              <p className="meta mt-1">
                {m.client}
                {m.clientType ? ` · ${m.clientType}` : ""}
              </p>

              <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
                {m.summary}
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <p className="meta min-w-0">{m.stack.join(" · ")}</p>
                <span className="meta shrink-0 text-ink transition-colors group-hover:text-accent">
                  Read case study <Arrow />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
