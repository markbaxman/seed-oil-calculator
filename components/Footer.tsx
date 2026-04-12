import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-16 border-t py-10" style={{ borderColor: '#e7e5e4', backgroundColor: '#fafaf9' }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mb-6 text-sm">
          {[
            { href: '/about', label: 'About' },
            { href: '/blog', label: 'Blog' },
            { href: '/reduce', label: 'Reduce Seed Oils' },
            { href: '/privacy', label: 'Privacy' },
            { href: '/terms', label: 'Terms' },
            { href: '/contact', label: 'Contact' },
            { href: '/feed.xml', label: 'RSS' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ color: '#57534e', textDecoration: 'none' }}
              className="hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="text-center text-sm mb-2" style={{ color: '#a8a29e' }}>
          &copy; 2026 Seed Oil Calculator. Educational tool based on published nutritional science.
        </p>
        <p className="text-center text-xs" style={{ color: '#a8a29e' }}>
          Data: Simopoulos (2002) · WHO/FAO (2008) · USDA FoodData Central
        </p>
      </div>
    </footer>
  )
}
