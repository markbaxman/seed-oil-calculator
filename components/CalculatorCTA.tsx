import Link from 'next/link'

interface CalculatorCTAProps {
  heading?: string
  body?: string
}

export default function CalculatorCTA({
  heading = 'What Is Your Inflammation Risk?',
  body = 'Answer 6 quick questions to get your personal Inflammation Risk Score and a tailored plan for the 3 changes that will help most.',
}: CalculatorCTAProps) {
  return (
    <div
      className="rounded-xl p-6 my-8 border-l-4 text-center"
      style={{
        backgroundColor: '#fff7ed',
        borderLeftColor: '#ea580c',
        borderTop: '1px solid #fed7aa',
        borderRight: '1px solid #fed7aa',
        borderBottom: '1px solid #fed7aa',
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#ea580c' }}>
        Free Calculator
      </p>
      <h3 className="text-xl font-bold mb-2" style={{ color: '#1c1917' }}>
        {heading}
      </h3>
      <p className="text-sm mb-4" style={{ color: '#57534e' }}>
        {body}
      </p>
      <Link
        href="/#calculator"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#ea580c', color: '#ffffff' }}
      >
        Calculate My Inflammation Risk →
      </Link>
    </div>
  )
}
