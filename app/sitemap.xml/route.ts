import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://jake-history.vercel.app";

  const urls = [
    { loc: `${baseUrl}/`, lastmod: "2024-11-16", changefreq: "daily", priority: "1.0" },
    { loc: `${baseUrl}/about`, lastmod: "2024-11-16", changefreq: "weekly", priority: "0.8" },
    { loc: `${baseUrl}/contact`, lastmod: "2024-11-15", changefreq: "weekly", priority: "0.8" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${urls
      .map(
        (url) => `
      <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
