import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://mihirjaiswal-portfolio.vercel.app/sitemap.xml",
    host: "https://mihirjaiswal-portfolio.vercel.app",
  };
}