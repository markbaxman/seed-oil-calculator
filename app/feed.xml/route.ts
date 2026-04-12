import { getAllPosts } from '@/lib/posts'

const BASE = 'https://seedoilcalculator.com'

export async function GET() {
  const posts = getAllPosts()

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE}/blog/${post.slug}</link>
      <guid>${BASE}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
    )
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Seed Oil Calculator Blog</title>
    <link>${BASE}</link>
    <description>Research and practical guides on seed oils, omega-6:omega-3 ratio, and inflammation.</description>
    <language>en</language>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
