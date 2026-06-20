import type { MetadataRoute } from "next";
import { ALL_STEPS } from "@/lib/steps";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/safety", "/glossary"];
  const stepPaths = ALL_STEPS.map((s) => s.href);
  const now = new Date();

  return [...staticPaths, ...stepPaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
