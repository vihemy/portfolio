import React from "react";
import Image from "next/image";
import { TextLink } from "./text-link";
import { Compare } from "./compare";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import { TweetComponent } from "./tweet";
import { CaptionComponent } from "./caption";
import { YouTubeComponent } from "./youtube";
import { ImageGrid } from "./image-grid";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

function CustomLink(props) {
  return <TextLink {...props} />;
}

/**
 * MDX <Image>. Pass `wide` to let a figure (e.g. a diagram) break out of the
 * reading column on large screens; wide figures also link to the full-size
 * file so dense diagrams stay legible.
 */
function RoundedImage({ wide, className, ...props }: any) {
  const img = (
    <Image
      alt={props.alt}
      className={`rounded-lg ${className ?? ""}`}
      {...props}
      sizes={
        wide ? "(max-width: 1008px) calc(100vw - 3rem), 960px" : props.sizes
      }
    />
  );

  if (!wide) return img;

  return (
    <a
      href={props.src}
      target="_blank"
      rel="noopener noreferrer"
      className="breakout group relative my-8 block !no-underline"
      aria-label={`${props.alt} (open full size in a new tab)`}
    >
      {img}
      <span
        aria-hidden="true"
        className="meta absolute right-3 bottom-3 rounded-md bg-bg/90 px-2 py-1 text-ink opacity-0 ring-1 ring-line backdrop-blur transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        Full size ↗
      </span>
    </a>
  );
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));
  return (
    <table>
      <thead>
        <tr className="text-left">{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function Strikethrough(props) {
  return <del {...props} />;
}

/**
 * Callout block. If the first paragraph is only bold text (e.g.
 * "**Outcomes**"), it is lifted out and rendered as a small mono label.
 * The legacy `emoji` prop is accepted but intentionally not rendered.
 */
function Callout({ children }: { emoji?: string; children: React.ReactNode }) {
  const items = React.Children.toArray(children).filter(
    (c) => !(typeof c === "string" && c.trim() === "")
  );

  let label: React.ReactNode = null;
  const first = items[0];
  if (React.isValidElement<{ children?: React.ReactNode }>(first)) {
    const inner = first.props.children;
    if (
      React.isValidElement<{ children?: React.ReactNode }>(inner) &&
      inner.type === "strong"
    ) {
      label = inner.props.children;
      items.shift();
    }
  }

  return (
    <aside className="callout my-8 rounded-lg border border-line bg-surface/60 px-5 py-4 text-[1rem] leading-relaxed">
      {label && <p className="meta !mb-2 text-ink">{label}</p>}
      {items}
    </aside>
  );
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  ImageGrid,
  a: CustomLink,
  StaticTweet: TweetComponent,
  Caption: CaptionComponent,
  YouTube: YouTubeComponent,
  code: Code,
  Table,
  del: Strikethrough,
  Callout,
  Compare,
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        blockJS: false,
        mdxOptions: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      }}
    />
  );
}
