import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getProjectPosts } from "app/lib/posts";
import type { Project } from "./project-data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies of work I have led or built end-to-end.",
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 px-2.5 py-0.5 text-xs text-neutral-700 dark:text-neutral-300">
      {children}
    </span>
  );
}

function sortProjects(posts: { metadata: Project; slug: string }[]) {
  return [...posts].sort((a, b) => {
    const af = a.metadata.featured ? 1 : 0;
    const bf = b.metadata.featured ? 1 : 0;
    if (af !== bf) return bf - af;
    return (b.metadata.year ?? 0) - (a.metadata.year ?? 0);
  });
}

export default function Projects() {
  const posts = getProjectPosts();
  const ordered = sortProjects(posts);

  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium tracking-tight">Projects</h1>
      <div className="prose prose-neutral dark:prose-invert mb-12">
        <p>
          These are a selection of projects either for clients or for internal use, I've contributed to. If your're interested in knowing more about implementation or process, feel free to reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ordered.map((post) => {
          const m = post.metadata;
          const href = `/projects/${post.slug}`;
          return (
            <Link
              key={post.slug}
              href={href}
              className="group flex flex-col rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
            >
              <div className="relative w-full aspect-[16/10] bg-neutral-100 dark:bg-neutral-900">
                <Image
                  src={m.heroImage}
                  alt={m.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={Boolean(m.featured)}
                />
              </div>

              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-baseline justify-between">
                  <h2 className="text-lg font-medium tracking-tight leading-tight">
                    {m.title}
                  </h2>
                  <span className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm">
                    {m.year}
                  </span>
                </div>

                {m.client && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {m.client}
                  </p>
                )}

                <p className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
                  {m.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-1">
                  <Chip>{m.role}</Chip>
                  <Chip>{m.projectType}</Chip>
                  {m.tags.slice(0, 4).map((tag) => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}