import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-content mx-auto px-4 py-20 text-center" style={{ maxWidth: '680px' }}>
      <div className="text-6xl mb-4">🌿</div>
      <h1 className="text-3xl font-bold mb-3" style={{ color: '#1c1917' }}>
        Page Not Found
      </h1>
      <p className="mb-8" style={{ color: '#57534e' }}>
        This page doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white transition-colors"
          style={{ backgroundColor: '#ea580c' }}
        >
          Calculate My Risk
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border transition-colors"
          style={{ borderColor: '#e7e5e4', color: '#1c1917' }}
        >
          Read the Blog
        </Link>
      </div>
    </div>
  )
}
