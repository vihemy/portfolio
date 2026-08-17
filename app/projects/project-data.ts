export interface Project {
  title: string;
  year: number;
  client: string;
  clientType: string;
  role: string;
  projectType: string;
  summary: string;
  tags: string[];
  stack: string[];
  hardware?: string;
  outcomes: string[];
  heroImage: string;
  featured?: boolean;
}

export interface ProjectPost {
  metadata: Project;
  slug: string;
  content: string;
}