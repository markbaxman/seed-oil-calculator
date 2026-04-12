import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { PostMeta } from './types'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const filepath = path.join(POSTS_DIR, filename)
    const raw = fs.readFileSync(filepath, 'utf-8')
    const { data } = matter(raw)

    return {
      slug,
      title: data.title ?? '',
      description: data.description ?? '',
      date: data.date ?? '',
      category: data.category ?? 'Research',
      keyword: data.keyword ?? '',
    } as PostMeta
  })

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export async function getPostBySlug(
  slug: string
): Promise<{ meta: PostMeta; content: string } | null> {
  const filepath = path.join(POSTS_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)

  const meta: PostMeta = {
    slug,
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    category: data.category ?? 'Research',
    keyword: data.keyword ?? '',
  }

  return { meta, content }
}
