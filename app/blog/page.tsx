import Link from "next/link";
import { formatDate, getSortedBlogPosts } from "app/lib/posts";
import { Arrow, PageTitle } from "app/components/section";

export const metadata = {
  title: "Blog",
  description: "Victor Hempel-Mydtskov's blog",
};

export default function BlogPosts() {
  const posts = getSortedBlogPosts();

  return (
    <section>
      <PageTitle>Blog</PageTitle>
      <ul className="mt-10 divide-y divide-line border-t border-line">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block py-6"
            >
              <time dateTime={post.metadata.publishedAt} className="meta">
                {formatDate(post.metadata.publishedAt)}
              </time>
              <h2 className="title mt-1.5 text-[1.25rem] leading-snug font-medium tracking-[-0.01em] text-ink decoration-accent decoration-1 underline-offset-4 group-hover:underline">
                {post.metadata.title}
              </h2>
              {post.metadata.summary && (
                <p className="mt-2 text-[1rem] leading-relaxed text-ink-soft">
                  {post.metadata.summary}
                </p>
              )}
              <span className="meta mt-3 inline-block text-ink transition-colors group-hover:text-accent">
                Read <Arrow />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
