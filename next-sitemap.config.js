module.exports = {
  siteUrl: 'https://jake-history.vercel.app/',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://jake-history.vercel.app/sitemap.xml',
    ],
  },
}