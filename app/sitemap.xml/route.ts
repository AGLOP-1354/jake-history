import { NextResponse } from "next/server";
import { getHistories } from "@/src/lib/utils/queries/historyQueries"; // Prisma 클라이언트 import

export async function GET() {
  const baseUrl = "https://jake-history.vercel.app";

  const histories = await getHistories();

  const staticUrls = [
    { loc: `${baseUrl}/`, lastmod: "2024-11-16", changefreq: "daily", priority: "1.0" },
    { loc: `${baseUrl}/analytics`, lastmod: "2024-11-16", changefreq: "weekly", priority: "0.8" },
  ];

  const historyUrls = histories?.data?.map((history) => ({
    loc: `${baseUrl}/history/${history.id}`,
    lastmod: history.updatedAt.toISOString().split("T")[0],
    changefreq: "weekly",
    priority: "0.7",
  }));
  console.log("historyUrls", historyUrls);

  const urls = [...staticUrls, ...(historyUrls || [])];

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
