export interface Book {
  title: string;
  author: string;
  category: string;
  takeaways?: string;
}

export const books: Book[] = [
  {
    title: "Philosophy of Software Design",
    author: "John Ousterhout",
    category: "Software Engineering",
    takeaways: ""
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    category: "Software Engineering",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Software Engineering",
    takeaways: ""
  },
  {
    title: "Clean Architecture",
    author: "Robert C. Martin",
    category: "Software Engineering",
  },
  {
    title: "Modern Software Engineering",
    author: "David Farley",
    category: "Software Engineering",
  },
  {
    title: "Design of Everyday Things",
    author: "Don Norman",
    category: "Design & Product",
  },
  {
    title: "Thinking Fast and Slow",
    author: "Daniel Kahneman",
    category: "Design & Product",
  },
  {
    title: "Build",
    author: "Tony Fadell",
    category: "Design & Product",
  },
  {
    title: "Filterworld",
    author: "Kyle Chayka",
    category: "Design & Product",
  },
  {
    title: "The Making of a Manager",
    author: "Julie Zhuo",
    category: "Design & Product",
  },
  {
    title: "Range",
    author: "David Epstein",
    category: "Thinking & Learning",
  },
  {
    title: "The 5 Elements of Effective Thinking",
    author: "Edward Burger, Michael Starbird",
    category: "Thinking & Learning",
  },
  {
    title: "Fooled by Randomness",
    author: "Nassim Taleb",
    category: "Thinking & Learning",
  },
  {
    title: "Antifragile",
    author: "Nassim Taleb",
    category: "Thinking & Learning",
  },
  {
    title: "Algorithms to Live By",
    author: "Brian Christian, Tom Griffiths",
    category: "Thinking & Learning",
  },
];
