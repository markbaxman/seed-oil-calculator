import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import AdSlot from '@/components/AdSlot'
import CalculatorCTA from '@/components/CalculatorCTA'
import BlogCard from '@/components/BlogCard'
import SchemaMarkup from '@/components/SchemaMarkup'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: {
      canonical: `https://seedoilcalculator.com/blog/${params.slug}`,
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: 'article',
      publishedTime: post.meta.date,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const related = allPosts.filter((p) => p.slug !== params.slug).slice(0, 3)

  const formattedDate = new Date(post.meta.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: {
      '@type': 'Organization',
      name: 'Seed Oil Calculator',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Seed Oil Calculator',
      url: 'https://seedoilcalculator.com',
    },
    url: `https://seedoilcalculator.com/blog/${params.slug}`,
  }

  return (
    <>
      <SchemaMarkup schema={articleSchema} />
      <article
        className="max-w-content mx-auto px-4 py-8"
        style={{ maxWidth: '680px' }}
      >
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-xs font-medium px-2 py-0.5 rounded"
              style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}
            >
              {post.meta.category}
            </span>
            <span className="text-xs" style={{ color: '#a8a29e' }}>
              {formattedDate}
            </span>
          </div>
          <h1
            className="text-3xl font-bold mb-3 leading-tight"
            style={{ color: '#1c1917' }}
          >
            {post.meta.title}
          </h1>
          <p className="text-lg" style={{ color: '#57534e' }}>
            {post.meta.description}
          </p>
        </header>

        <div className="prose">
          <MDXRemote source={post.content} components={{ CalculatorCTA }} />
        </div>

        <div className="my-8">
          <AdSlot slot="4444444444" />
        </div>

        <CalculatorCTA />

        <div className="my-8">
          <AdSlot slot="5555555555" />
        </div>

        {related.length > 0 && (
          <section
            className="mt-12 pt-8 border-t"
            style={{ borderColor: '#e7e5e4' }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: '#1c1917' }}
            >
              Related Articles
            </h2>
            <div className="flex flex-col gap-4">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}
