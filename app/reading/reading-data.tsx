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
    takeaways: " Ideas that stuck: Programming is managing cognitive load. Deep modules have rich functionality and simple interfaces. Defining errors out of existence beats minute exception handling. Even good code does not communicate why a given design was chosen, but comments can."
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    category: "Software Engineering",
    takeaways: "This classic taught me about DRY, orthogonality, but the concept that most stuck with me was: Code is about malleability - design it to be easy to change, when requirements do."
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Software Engineering",
    takeaways: "A good introduction to programming principles, but one I find less relevant as a more experienced developer. Martin's preference for small functions, test-driven development and aversion to comments simply does not feel efficient or clear to me today. His goal of improving readability still resonates, though."
  },
  // {
  //   title: "Modern Software Engineering",
  //   author: "David Farley",
  //   category: "Software Engineering",
  //   takeaways: "What stuck with me the most from this one is the scientific mindset"
  // },
  {
    title: "Design of Everyday Things",
    author: "Don Norman",
    category: "Design & Product",
    takeaways: "This is the first proper design book I read and has shaped my foundational thinking about creating usable software. I even directed a company book club reading this classic. It provides extremely useful vernacular such as affordances, signifiers and 'knowledge in the head' vs 'knowledge in the world' when analyzing the interfacing between users and computers. But most importantly it teaches, that the user is never responsible for misunderstanding how to use your system, the creators are."
  },
  {
    title: "Thinking Fast and Slow",
    author: "Daniel Kahneman",
    category: "Design & Product",
    takeaways: "There are a ton of takeaways from this tome of knowledge of cognitive biases. To me, the most important part: All people are influenced by way more cognitive biases than we can ever be consciously aware of. These should be taken into account when designing digital products and services."
  },
  {
    title: "Build",
    author: "Tony Fadell",
    category: "Design & Product",
    takeaways: "This is a great view into a product persons mindset - it's about finding and solving pain points, treating the entire experience as the product - from packaging to customer support. But what stuck with me the most is Fadell's highlighting of the skill of storytelling: How do you make colleagues and customers understand and care for the product?"
  },
  // {
  //   title: "Filterworld",
  //   author: "Kyle Chayka",
  //   category: "Design & Product",
  // },
  // {
  //   title: "The Making of a Manager",
  //   author: "Julie Zhuo",
  //   category: "Design & Product",
  //   takeaways: "I read this to better understand what makes a leader valuable — and left with a picture of someone with a positive multiplying effect on the team: enabling them, helping them grow and keeping their eye on the bigger picture. The framework that stuck with me: purpose, process, people."
  // },
  {
    title: "Range",
    author: "David Epstein",
    category: "Thinking & Learning",
    takeaways: "As a developer with professional interests spanning technical, design and product domains, I find this book extremely useful to articulate my strengths as a generalist: Broad experiences provide fertile ground for creative problem solving - simply by borrowing tactics or perspectives from other domains. But mainly Epstein distinguishes between kind and wicked learning environments - The kind one has clear rules and deliberate patterns. But since most of modern professional life is about navigating the opposite, wicked environments, generalists thrive by connecting seemingly unrelated ideas."
  },
  {
    title: "The 5 Elements of Effective Thinking",
    author: "Edward Burger, Michael Starbird",
    category: "Thinking & Learning",
    takeaways: "This one is by far the lesser-known book mentioned here - however I found it so useful, I read it three times in a row (which was an experiment, you can read more about it in my [blog post on iterative reading](/blog/reading-is-rereading)). It breaks thinking down into understanding (and returning to) fundamentals, learning from mistakes, asking the right questions and connecting ideas across time."
  },
  // {
  //   title: "Fooled by Randomness",
  //   author: "Nassim Taleb",
  //   category: "Thinking & Learning",
  // },
  {
    title: "Antifragile",
    author: "Nassim Taleb",
    category: "Thinking & Learning",
    takeaways: "Antifragile is a great (and a bit polemic) book about designing systems, that not only withstand stress, but benefit from it. Even though Taleb has a background in trading, this has great applications in software. His notions of Via Negativa (Improvement through subtraction), redundancy and optionality (delaying decisions until needed and keeping options open) are classic system architecture strategies."
  },
  // {
  //   title: "Algorithms to Live By",
  //   author: "Brian Christian, Tom Griffiths",
  //   category: "Thinking & Learning",
  // },
];
