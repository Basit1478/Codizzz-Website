import { MetadataRoute } from "next";
import {siteUrl} from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {path: "", changeFrequency: "monthly" as const, priority: 1},
    {path: "/services", changeFrequency: "monthly" as const, priority: 0.95},
    {path: "/work", changeFrequency: "monthly" as const, priority: 0.9},
    {path: "/product", changeFrequency: "monthly" as const, priority: 0.85},
    {path: "/team", changeFrequency: "monthly" as const, priority: 0.8},
    {path: "/careers", changeFrequency: "weekly" as const, priority: 0.75},
    {path: "/contact", changeFrequency: "yearly" as const, priority: 0.8},
  ];

  return routes.map((route) => ({url: `${siteUrl}${route.path}`, changeFrequency: route.changeFrequency, priority: route.priority}));
}
