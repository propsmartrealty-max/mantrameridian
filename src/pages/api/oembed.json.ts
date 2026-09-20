import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const queryUrl = url.searchParams.get('url') || 'https://mantrameridianriverside.com/';

  const oembedPayload = {
    version: '1.0',
    type: 'rich',
    url: queryUrl,
    title: 'Mantra Meridian Riverside Balewadi | Luxury Riverfront Residences & Sky Duplexes',
    author_name: 'Mantra Properties',
    author_url: 'https://mantrameridianriverside.com/',
    provider_name: 'Mantra Meridian Riverside',
    provider_url: 'https://mantrameridianriverside.com/',
    cache_age: 86400,
    thumbnail_url: 'https://mantrameridianriverside.com/assets/mantra-meridian-hero.webp',
    thumbnail_width: 1200,
    thumbnail_height: 630,
    width: 640,
    height: 360,
    html: '<iframe width="640" height="360" src="https://www.youtube.com/embed/6hsoYHelVXg?rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Mantra Meridian Riverside Balewadi 3D Walkthrough"></iframe>'
  };

  return new Response(JSON.stringify(oembedPayload, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json+oembed; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800'
    }
  });
};
