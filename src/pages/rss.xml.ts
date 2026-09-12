import type { APIRoute } from 'astro';
import { journalArticles } from '../data/journal';

export const prerender = true;

export const GET: APIRoute = async () => {
  const siteUrl = 'https://mantrameridianriverside.com';
  
  const itemsXml = journalArticles.map((article) => {
    const articleUrl = `${siteUrl}/mantra-meridian-riverside/journal/${article.slug}/`;
    const pubDate = new Date('2026-08-01T08:00:00+05:30').toUTCString();
    
    return `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description><![CDATA[${article.summary}]]></description>
      <category>${article.category}</category>
      <dc:creator><![CDATA[${article.author}]]></dc:creator>
      <pubDate>${pubDate}</pubDate>
      <enclosure url="${article.heroImage}" length="0" type="image/webp" />
    </item>`;
  }).join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:dc="http://purl.org/dc/elements/1.1/" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title><![CDATA[The Meridian Journal | Mantra Meridian Riverside Balewadi]]></title>
    <link>${siteUrl}/mantra-meridian-riverside/journal/</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <description><![CDATA[Architectural intelligence, Pune real estate market trends, micro-market analyses, and riparian luxury living guides from Mantra Meridian Riverside Balewadi.]]></description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>${siteUrl}/icon-512.png</url>
      <title>Mantra Meridian Riverside Balewadi</title>
      <link>${siteUrl}/</link>
    </image>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800'
    }
  });
};
