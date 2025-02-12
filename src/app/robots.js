export default function robots() {
  return {
    headers: {
      'Content-Type': 'text/plain',
    },
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Googlebot-News',
          'Googlebot-Video',
          'AdsBot-Google',
          'GoogleOther',
          'bingbot',
          'Adidxbot',
          'Naverbot',
          'Yeti',
          'Daumoa',
          'Y!J-WSC',
          'YJ-WSC',
          'Baiduspider',
          'Baiduspider-mobile',
          'Baiduspider-video',
          'Baiduspider-image',
          'YandexBot',
          'YandexMobileBot',
          'YandexVideo',
          'YandexWebmaster',
          'Applebot',
          'Twitterbot',
          'facebookexternalhit',
          'kakaotalk-scrap',
          'LinkedInBot',
          'Slackbot',
          'Discordbot',
          'DuckDuckBot',
        ],
        allow: '/',
        disallow: '/users',
      },
    ],
    sitemap: 'https://www.reviewniverse.net/sitemap/sitemap.xml',
  };
}
