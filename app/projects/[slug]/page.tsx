import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BackLink, DetailTitle } from "app/components/section";
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
  const ogImage = `${metaData.baseUrl}${m.heroImage}`;

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

function MetaRow({
  label,
  children,
  wide = false,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`grid grid-cols-[5.5rem_1fr] gap-x-4 sm:block ${wide ? "sm:col-span-2" : ""}`}>
      <dt className="meta">{label}</dt>
      <dd className="text-[0.975rem] leading-snug text-ink sm:mt-1">{children}</dd>
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

      <BackLink href="/projects">Projects</BackLink>
      <DetailTitle>{m.title}</DetailTitle>

      <p className="mb-10 text-[1.1875rem] leading-relaxed text-ink-soft">
        {m.summary}
      </p>

      <div className="breakout relative mb-10 aspect-[16/9] overflow-hidden rounded-lg bg-surface ring-1 ring-inset ring-line">
        <Image
          src={m.heroImage}
          alt=""
          fill
          sizes="(max-width: 1008px) calc(100vw - 3rem), 960px"
          className="object-cover"
          priority
        />
      </div>

      <section aria-labelledby="at-a-glance" className="mb-4 border-y border-line py-6">
        <h2 id="at-a-glance" className="meta mb-5 text-ink">At a glance</h2>
        <dl className="grid gap-y-4 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5">
          {m.client && (
            <MetaRow label="Client">
              {m.client}
              {m.clientType && (
                <span className="block text-ink-soft text-[0.9rem]">{m.clientType}</span>
              )}
            </MetaRow>
          )}
          <MetaRow label="Year">
            <span className="tabular-nums">{m.year}</span>
          </MetaRow>
          <MetaRow label="Role">{m.role}</MetaRow>
          <MetaRow label="Type">{m.projectType}</MetaRow>
          <MetaRow label="Stack" wide>
            <span className="font-mono text-[0.8125rem] leading-relaxed text-ink-soft">
              {m.stack.join(" · ")}
            </span>
          </MetaRow>
          {m.hardware && (
            <MetaRow label="Hardware" wide>
              {m.hardware}
            </MetaRow>
          )}
        </dl>
      </section>

      <article className="prose prose-quoteless">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
