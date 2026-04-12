import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'
import AdSlot from '@/components/AdSlot'

export const metadata: Metadata = {
  title: 'Blog — Seed Oil Research & Guides',
  description:
    'Research and practical guides on seed oils, omega-6:omega-3 ratio, cooking oils, and reducing inflammation.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const midpoint = Math.floor(posts.length / 2)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#1c1917' }}>
          The Seed Oil Blog
        </h1>
        <p style={{ color: '#57534e' }}>
          Research, guides, and practical advice on seed oils, omega-6:omega-3
          ratio, and reducing dietary inflammation.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {posts.slice(0, midpoint).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}

        <div className="py-4">
          <AdSlot slot="3333333333" />
        </div>

        {posts.slice(midpoint).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
