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
          Hi, I’m Victor—a creative developer... Or maybe I’m more of a
          technical interaction designer? Or perhaps a creative technologist?
        </p>
        <p>
          Either way, my interests and expertise are{" "}
          <strong>
            bridging the gap between logical computer systems and fallible
            humans
          </strong>
          . I always aim to give users a sense of agency and immersion, ideally
          also sparking a bit of learning along the way.
        </p>
        <p>
          My work includes designing and developing interactive, site-specific
          installations for exhibitions, audiowalks, and tools for collecting
          and analyzing user behavior data.
        </p>
        <p>
          On this site, I share my projects and thoughts on programming, design,
          learning and probably other stuff too.
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
