import type { Metadata } from "next";
import { books, type Book } from "./reading-data";
import { PageTitle } from "app/components/section";
import { TextLink } from "app/components/text-link";

export const metadata: Metadata = {
  title: "Reading",
  description: "Books that have most shaped how I think about software, design, and learning.",
};

const CATEGORY_ORDER = [
  "Software Engineering",
  "Design & Product",
  "Thinking & Learning",
];

/** Renders takeaways text, turning `[label](href)` into links. */
function renderTakeaways(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return (
    <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink-soft">
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (match) {
          const [, label, href] = match;
          return (
            <TextLink key={i} href={href} className="link">
              {label}
            </TextLink>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

function groupByCategory(list: Book[]) {
  const grouped = new Map<string, Book[]>();
  for (const book of list) {
    const group = grouped.get(book.category) || [];
    group.push(book);
    grouped.set(book.category, group);
  }
  return CATEGORY_ORDER.map((cat) => ({
    category: cat,
    books: grouped.get(cat) || [],
  })).filter((g) => g.books.length > 0);
}

export default function Reading() {
  const groups = groupByCategory(books);

  return (
    <section>
      <PageTitle>Reading</PageTitle>
      <div className="prose mb-12">
        <p>
          I aim to always be in the middle of a book. Be it technical, design-oriented or fiction, I find all books to strengthen the foundation of my thinking.

          These are some of the books that have done this the most.

          The ultra short list I recommend any one who'll listen: Philosophy of Software Design, Design of Everyday Things, The 5 Elements of Effective Thinking.
        </p>
      </div>

      {groups.map(({ category, books }) => (
        <section key={category} className="mb-14">
          <h2 className="meta mb-2 border-b border-line pb-2 text-ink">{category}</h2>
          <ul className="divide-y divide-line">
            {books.map((book) => (
              <li key={book.title} className="py-6">
                <h3 className="text-[1.1875rem] leading-snug font-medium text-ink">
                  {book.title}
                </h3>
                <p className="meta mt-0.5">{book.author}</p>
                {book.takeaways && renderTakeaways(book.takeaways.trim())}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}
