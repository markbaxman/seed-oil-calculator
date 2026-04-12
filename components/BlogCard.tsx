import Link from 'next/link'
import type { PostMeta } from '@/lib/types'

interface BlogCardProps {
  post: PostMeta
}

const CATEGORY_COLORS: Record<string, string> = {
  Research: '#fff7ed',
  'How To': '#f0fdf4',
  Guide: '#eff6ff',
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const bgColor = CATEGORY_COLORS[post.category] ?? '#fff7ed'

  return (
    <article
      className="rounded-xl p-5 border transition-shadow hover:shadow-sm"
      style={{ backgroundColor: '#ffffff', borderColor: '#e7e5e4' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-xs font-medium px-2 py-0.5 rounded"
          style={{ backgroundColor: bgColor, color: '#57534e' }}
        >
          {post.category}
        </span>
        <span className="text-xs" style={{ color: '#a8a29e' }}>
          {formattedDate}
        </span>
      </div>

      <h2 className="text-lg font-semibold mb-2 leading-snug">
        <Link
          href={`/blog/${post.slug}`}
          style={{ color: '#1c1917', textDecoration: 'none' }}
          className="hover:text-orange-600 transition-colors"
        >
          {post.title}
        </Link>
      </h2>

      <p className="text-sm mb-4 line-clamp-3" style={{ color: '#57534e' }}>
        {post.description}
      </p>

      <Link
        href={`/blog/${post.slug}`}
        className="text-sm font-medium"
        style={{ color: '#ea580c', textDecoration: 'none' }}
      >
        Read more →
      </Link>
    </article>
  )
}
