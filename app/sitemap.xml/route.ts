import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://jake-history.vercel.app";

  // URL 데이터 가져오기 (예: 데이터베이스에서 조회)
  const urls = [
    { loc: `${baseUrl}/`, lastmod: "2024-11-16" },
    { loc: `${baseUrl}/about`, lastmod: "2024-11-16" },
    { loc: `${baseUrl}/contact`, lastmod: "2024-11-15" },
  ];

  // Sitemap XML 생성
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (url) => `
      <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
      </url>
    `
      )
      .join("")}
  </urlset>`;

  // XML 반환
  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
