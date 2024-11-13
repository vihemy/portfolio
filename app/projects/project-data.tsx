export interface Project {
  title: string;
  year: number;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    title: "Idea Machine",
    year: 2024,
    description:
      "A fantastical sci-fi machine that transforms user ideas on how to improve the ocean environment into imaginative illustrations. Part of exhibition Dødvande (Dead Waters) at Danish aquarium Kattegatcentret.",
    url: "https://github.com/vihemy/dinide",
  },
  {
    title: "BrightSign Log Tools",
    year: 2023,
    description:
      "Python tools to download and process player logs from BrightSign mediaplayers configured on a local network using Local Diagnostic Web Server.",
    url: "https://github.com/vihemy/brightsign-log-tools",
  },
  {
    title: "Mød Mig I Mørket",
    year: 2021,
    description:
      "This interactive audiowalk guides users through a choose-your-own-adventure drama set in Aarhus' Botanical Garden. The story unfolds uniquely, shaped by the pathways the user decides to explore in the park.",
    url: "https://explore.echoes.xyz/collections/tuouST7zBLRMtaXS",
  },
];
