# Feature: Reading List Page

## Goal

A `/reading` page listing the books that have most shaped my thinking about
software, design, and learning. A small, curated list — not a complete
bibliography. Each entry includes a personal takeaway (2–3 sentences) explaining
how the book influenced me.

The page signals intellectual seriousness and self-awareness to recruiters and
colleagues without the maintenance burden of a blog.

## Non-goals

- No complete reading history — this is a curated selection, not a log
- No ratings, genres, or external links
- No auto-generated takeaways — every takeaway is written manually
- No external API or database — static data, like projects

## Data Model

```ts
// app/reading/reading-data.tsx

export interface Book {
  title: string;
  author: string;
  category: string;
  takeaways?: string;   // 2–3 personal sentences
}

export const books: Book[] = [
  // Array order = display order within each category
];
```

**Rules:**

- Books are displayed in the exact order they appear in the array — no
  alphabetical or date sorting. Reorder by moving entries in the file.
- `takeaways` is optional but expected for most entries. Longer format
  (2–3 sentences) reflecting personal impact, not book summaries.
- Categories are displayed in a fixed order defined on the page.
- Empty categories are hidden automatically.

## Page Design

Three category sections in fixed order: Software Engineering, Design & Product,
Thinking & Learning. Each section has a muted category heading. Books display as
title/author followed by the takeaway in body-copy size — the takeaway is the
main content, not a footnote.

A short intro sentence at the top frames the page: "These are the books that
have most shaped how I think about software, design, and learning."

## Files

| File | Action |
|---|---|
| `app/reading/reading-data.tsx` | Data model + curated book list |
| `app/reading/page.tsx` | Page component (RSC), groups by category, preserves manual order |
| `app/components/nav.tsx` | Nav link to `/reading` |
| `app/sitemap.ts` | Route in sitemap |
| `.agents/reading-list-feature.md` | This plan |

## Current State

16 books across 3 categories. Takeaways partially populated.
