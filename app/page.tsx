import Image from "next/image";
import { socialLinks } from "./config";

export default function Page() {
  return (
    <section>
      <a
        href={socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
      >
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

      <div className="prose">
        <p>
          Hi, I'm Victor, a{" "}
          <strong>product-minded software developer</strong> based in
          Copenhagen. I care about how software works across the whole product:
          the code behind it, the people who use it, and the business it's created within.
        </p>
        <p>
          Over the past six years, I've worked across{" "}
          <strong>software, generative AI, and physical computing</strong>,
          building web applications, distributed systems, and interactive museum
          installations. My background in{" "}
          <strong>engineering, design, and communication</strong> helps me move
          from conversations with users and stakeholders to decisions about
          architecture and code.
        </p>
        <p>
          What ties it all together is a deep-seated curiosity about{" "}
          how <strong>people</strong> engage with{" "}
          <strong>digital systems</strong>: what draws them in, what gets in
          their way, and how thoughtful development can make those experiences
          more useful.
        </p>
        <p>
          You can find my professional background on{" "}
          <a target="_blank" href={socialLinks.linkedin} rel="noopener noreferrer">
            LinkedIn
          </a>
          , or{" "}
          <a target="_blank" href={socialLinks.email} rel="noopener noreferrer">
            send me an email
          </a>{" "}
          if you'd like to chat.
        </p>
      </div>
    </section>
  );
}
