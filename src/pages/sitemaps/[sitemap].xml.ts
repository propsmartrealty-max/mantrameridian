import type { APIRoute } from 'astro';
import { getAllProgrammaticSlugs } from '../../data/programmatic-seo-matrix';

export const prerender = false;

const PAGE_SIZE = 1000;

export const GET: APIRoute = async ({ params }) => {
  const sitemapParam = params.sitemap || '';
  const match = sitemapParam.match(/^properties-(\d+)$/);

  if (!match) {
    return new Response('Sitemap Not Found', { status: 404 });
  }

  const pageNumber = parseInt(match[1], 10);
  if (pageNumber < 1 || pageNumber > 5) {
    return new Response('Sitemap Page Out of Bounds', { status: 404 });
  }

  const allSlugs = getAllProgrammaticSlugs();
  const startIndex = (pageNumber - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, allSlugs.length);
  const pageSlugs = allSlugs.slice(startIndex, endIndex);

  const lastMod = '2026-09-21';
  const siteUrl = 'https://mantrameridianriverside.com';

  const urlsXml = pageSlugs
    .map(
      (slug) => `  <url>
    <loc>${siteUrl}/properties/${slug}/</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>`
    )
    .join('\n');

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  return new Response(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      'X-Robots-Tag': 'noindex' // XML sitemaps should not be indexed as SERP pages themselves
    }
  });
};
