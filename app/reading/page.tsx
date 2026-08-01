import React from "react";
import type { Metadata } from "next";
import { books } from "./reading-data";

export const metadata: Metadata = {
  title: "Reading",
  description: "Books that have most shaped how I think about software, design, and learning.",
};

const CATEGORY_ORDER = [
  "Software Engineering",
  "Design & Product",
  "Thinking & Learning",
];

function groupByCategory(books: typeof import("./reading-data").books) {
  const grouped = new Map<string, typeof books>();
  for (const book of books) {
    const list = grouped.get(book.category) || [];
    list.push(book);
    grouped.set(book.category, list);
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
      <h1 className="mb-4 text-2xl font-medium tracking-tight">Reading</h1>
      <p className="prose prose-neutral dark:prose-invert mb-10 text-neutral-600 dark:text-neutral-400">
        I'm a curious person — so I read. About software, about design, and about interesting ideas in general. These are some books that rewired my thinking permanently.
      </p>

      {groups.map(({ category, books }) => (
        <div key={category} className="mb-10">
          <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4 tracking-wide">
            {category}
          </h2>
          <div className="space-y-7">
            {books.map((book, i) => (
              <div key={i}>
                <span className="text-black dark:text-white font-medium">
                  {book.title}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">
                  {" — "}
                  {book.author}
                </span>
                {book.takeaways && (
                  <p className="text-base text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                    {book.takeaways}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
