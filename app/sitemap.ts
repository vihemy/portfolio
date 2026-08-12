import { MetadataRoute } from "next";
import { getBlogPosts, getProjectPosts } from "./lib/posts";
import { metaData } from "./config";

const BaseUrl = metaData.baseUrl.endsWith("/")
  ? metaData.baseUrl
  : `${metaData.baseUrl}/`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogs = getBlogPosts().map((post) => ({
    url: `${BaseUrl}blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let projects = getProjectPosts().map((post) => ({
    url: `${BaseUrl}projects/${post.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  let routes = ["", "projects", "blog", "reading"].map((route) => ({
    url: `${BaseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...projects];
}
