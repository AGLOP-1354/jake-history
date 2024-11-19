module.exports = {
  siteUrl: 'https://jake-history.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/server-sitemap.xml'],
  sitemapBaseFileName: 'sitemap',
  xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  transform: (config, url) => {
    return {
      loc: url,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }
  },
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://jake-history.vercel.app/sitemap.xml',
    ],
  },
}