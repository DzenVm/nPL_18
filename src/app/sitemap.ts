import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes: Array<{ path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }> = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/wyscig", priority: 0.9, changeFrequency: "weekly" },
  { path: "/warsztat", priority: 0.6, changeFrequency: "monthly" },
  { path: "/kontakt", priority: 0.3, changeFrequency: "monthly" },
  { path: "/regulamin", priority: 0.2, changeFrequency: "monthly" },
  { path: "/polityka-prywatnosci", priority: 0.2, changeFrequency: "monthly" },
  { path: "/cookies", priority: 0.2, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
