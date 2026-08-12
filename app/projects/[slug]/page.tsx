import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { getProjectPosts } from "app/lib/posts";
import { metaData } from "app/config";
import type { Project } from "../project-data";

export async function generateStaticParams() {
  let posts = getProjectPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = getProjectPosts().find((p) => p.slug === slug);
  if (!post) return;

  const m = post.metadata;
  const title = m.title;
  const description = m.summary;
  const ogImage = `${metaData.baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${metaData.baseUrl}/projects/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 py-2 border-t border-neutral-200 dark:border-neutral-800">
      <dt className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        {label}
      </dt>
      <dd className="text-sm text-neutral-800 dark:text-neutral-200">{children}</dd>
    </div>
  );
}

function ChipList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 px-2.5 py-0.5 text-xs text-neutral-700 dark:text-neutral-300"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getProjectPosts().find((p) => p.slug === slug);
  if (!post) notFound();

  const m: Project = post.metadata;

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: m.title,
            description: m.summary,
            image: m.heroImage,
            url: `${metaData.baseUrl}/projects/${post.slug}`,
            author: {
              "@type": "Person",
              name: metaData.name,
            },
          }),
        }}
      />

      <Link
        href="/projects"
        className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      >
        &larr; Projects
      </Link>

      <h1 className="title mb-3 mt-6 font-medium text-2xl tracking-tight">
        {m.title}
      </h1>

      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
        <span className="tabular-nums">{m.year}</span>
        {m.client ? ` · ${m.client}` : ""}
        {m.clientType ? ` · ${m.clientType}` : ""}
      </p>

      <p className="prose prose-neutral dark:prose-invert mb-8">{m.summary}</p>

      <div className="relative w-full aspect-[16/9] bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden mb-8">
        <Image
          src={m.heroImage}
          alt={m.title}
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-cover"
          priority
        />
      </div>

      <dl className="mb-8 max-w-xl">
        <MetaRow label="Role">{m.role}</MetaRow>
        <MetaRow label="Engagement">{m.engagementType}</MetaRow>
        {m.hardware && <MetaRow label="Hardware">{m.hardware}</MetaRow>}
        <MetaRow label="Stack">
          <ChipList items={m.stack} />
        </MetaRow>
        {m.integrations && m.integrations.length > 0 && (
          <MetaRow label="Integrations">
            <ChipList items={m.integrations} />
          </MetaRow>
        )}
        {m.privacyApproach && (
          <MetaRow label="Privacy approach">{m.privacyApproach}</MetaRow>
        )}
      </dl>

      {m.outcomes && m.outcomes.length > 0 && (
        <div className="mb-12 rounded-lg bg-[#F7F7F7] dark:bg-[#181818] p-5 border border-neutral-200 dark:border-neutral-800">
          <h2 className="text-base font-medium tracking-tight mb-3">Outcomes</h2>
          <ul className="space-y-2 text-sm text-neutral-800 dark:text-neutral-200">
            {m.outcomes.map((o) => (
              <li key={o} className="flex gap-2">
                <span aria-hidden className="text-neutral-500 dark:text-neutral-400">&ndash;</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}