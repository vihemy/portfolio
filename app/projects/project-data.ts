export interface Project {
  title: string;
  year: number;
  client: string;
  clientType: string;
  role: string;
  engagementType: string;
  summary: string;
  tags: string[];
  stack: string[];
  hardware?: string;
  integrations?: string[];
  privacyApproach?: string;
  outcomes: string[];
  heroImage: string;
  featured?: boolean;
}

export interface ProjectPost {
  metadata: Project;
  slug: string;
  content: string;
}