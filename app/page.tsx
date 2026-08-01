import Image from "next/image";
import { socialLinks } from "./config";

export default function Page() {
  return (
    <section>
      <a href={socialLinks.linkedin} target="_blank">
        <Image
          src="/np_profil.jpg"
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
          Hi, I'm Victor. I'm a{" "}
          <strong>full-stack developer with a product mindset</strong>, based in
          Copenhagen. I care about how things work, from the code all the way to
          the person on the other end.
        </p>
        <p>
          My background spans{" "}
          <strong>engineering, design, and communication</strong>. Over the past
          six years, I've worked professionally across{" "}
          <strong>software, GenAI, and physical computing</strong>, building web
          applications, distributed systems, and interactive museum
          installations. I'm as comfortable talking to users and clients as I am
          digging into architecture and code.
        </p>
        <p>
          What ties it all together is a curiosity about{" "}
          <strong>
            how people engage with digital systems
          </strong>{" "}
          — what pulls them in, what pushes them away, and how to design for the
          messy space in between.
        </p>
        <p>
          On this site I share projects and thoughts on programming, design,
          learning, and whatever else catches my attention.
        </p>
        <p>
          You can find my professional background on{" "}
          <a target="_blank" href={socialLinks.linkedin}>
            LinkedIn
          </a>
          , or{" "}
          <a target="_blank" href={socialLinks.email}>
            send me an email
          </a>{" "}
          if you'd like to chat.
        </p>
      </div>
    </section>
  );
}
