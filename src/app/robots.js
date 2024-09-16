/**
 * User-agent: *
Disallow: /

User-agent: Googlebot
User-agent: Googlebot-Image
User-agent: bingbot
User-agent: Yeti
User-agent: facebookexternalhit
User-agent: kakaotalk-scrap
User-agent: Daumoa
Allow: /
Disallow: /users

Sitemap: https://www.reviewniverse.net/sitemap/sitemap.xml
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'bingbot',
          'Yeti',
          'facebookexternalhit',
          'kakaotalk-scrap',
          'Daumoa',
        ],
        allow: '/',
        disallow: '/users',
      },
    ],
    sitemap: 'https://www.reviewniverse.net/sitemap/sitemap.xml',
  };
}
