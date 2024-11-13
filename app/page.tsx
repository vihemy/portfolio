import Image from "next/image";
import { socialLinks } from "./config";

export default function Page() {
  return (
    <section>
      <a href={socialLinks.linkedin} target="_blank">
        <Image
          src="/kc_profil.jpg"
          alt="Profile photo"
          className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
          unoptimized
          width={160}
          height={160}
          priority
        />
      </a>

      <h1 className="mb-8 text-2xl font-medium tracking-tight">
        Victor Hempel-Mydtskov
      </h1>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          As a developer and interaction designer I work in the space between
          logical systems and fallible humans.
        </p>
        <p>
          I am passionate about creating digital experiences that are both
          intuitive and delightful.
        </p>
        <p>
          This is my portfolio/blog where I share projects and
          thoughts about creating and learning.
        </p>
        <p>
          Check out my{" "}
          <a target="_blank" href={socialLinks.linkedin}>
            LinkedIn
          </a>{" "}
          for my professional and educational background or visit my{" "}
          <a target="_blank" href={socialLinks.github}>
            GitHub
          </a>{" "}
          to browse my code.
        </p>
      </div>
    </section>
  );
}
