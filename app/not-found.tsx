import type { Metadata } from "next";
import { BackLink, PageTitle } from "./components/section";

export const metadata: Metadata = {
  title: "404",
  description: "Error 404",
};

export default function NotFound() {
  return (
    <section>
      <PageTitle>404 - Page not found</PageTitle>
      <p className="text-[1.125rem] leading-relaxed text-ink-soft">
        Oops! The page you're looking for doesn't seem to exist.
      </p>
      <div className="mt-8">
        <BackLink href="/">Home</BackLink>
      </div>
    </section>
  );
}
