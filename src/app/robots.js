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
    headers: `#DaumWebMasterTool:351ed90f31e4297438403e9d5f122f8b252dd42af87e9cb17f870c79cc1d8113:kwy3jAYGmcb5p9Ypj8ZuLQ==`,
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
          'DuckDuckBot',
        ],
        allow: '/',
        disallow: '/users',
      },
    ],
    sitemap: 'https://www.reviewniverse.net/sitemap/sitemap.xml',
  };
}
