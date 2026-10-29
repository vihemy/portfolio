import fs from "fs";
import path from "path";
import type { Project, ProjectPost } from "../projects/project-data";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  tags: string;
  image?: string;
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: { [key: string]: any } = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");
    metadata[key.trim()] = value;
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "content", "blog"));
}

const PROJECT_ARRAY_FIELDS = new Set([
  "tags",
  "stack",
]);

function parseArrayField(value: string): string[] {
  let inner = value.trim();
  if (inner.startsWith("[") && inner.endsWith("]")) {
    inner = inner.slice(1, -1);
  }
  // Quote-aware split: commas inside "..." or '...' do not act as separators,
  // so tags like ["AI, ML", "Unity"] survive intact.
  const re = /"((?:[^"\\]|\\.)*)"\s*|'((?:[^'\\]|\\.)*)'\s*|([^,"']+)/g;
  const out: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = re.exec(inner)) !== null) {
    const item = (match[1] ?? match[2] ?? match[3] ?? "").trim();
    if (item === "" && match[3] === undefined) continue;
    if (item) out.push(item);
  }
  return out;
}

function parseBooleanField(value: string): boolean {
  return value.trim().toLowerCase() === "true";
}

function parseProjectFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: { [key: string]: any } = {};

  frontMatterLines.forEach((line) => {
    if (!line.trim() || !line.includes(": ")) return;
    let [key, ...valueArr] = line.split(": ");
    let keyName = key.trim();
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");

    if (PROJECT_ARRAY_FIELDS.has(keyName)) {
      metadata[keyName] = parseArrayField(value);
    } else if (keyName === "year") {
      metadata[keyName] = Number(value);
    } else if (keyName === "featured") {
      metadata[keyName] = parseBooleanField(value);
    } else {
      metadata[keyName] = value;
    }
  });

  return { metadata: metadata as Project, content };
}

function getProjectMDXData(dir: string): ProjectPost[] {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let rawContent = fs.readFileSync(path.join(dir, file), "utf-8");
    let { metadata, content } = parseProjectFrontmatter(rawContent);
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getProjectPosts(): ProjectPost[] {
  return getProjectMDXData(
    path.join(process.cwd(), "content", "projects")
  );
}

/** Blog posts, newest first. */
export function getSortedBlogPosts() {
  return getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );
}

/** Projects, featured first, then newest first. */
export function getSortedProjectPosts(): ProjectPost[] {
  return getProjectPosts().sort((a, b) => {
    const af = a.metadata.featured ? 1 : 0;
    const bf = b.metadata.featured ? 1 : 0;
    if (af !== bf) return bf - af;
    return (b.metadata.year ?? 0) - (a.metadata.year ?? 0);
  });
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}