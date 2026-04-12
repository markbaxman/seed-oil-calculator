'use client'

import { useState, useEffect, useRef } from 'react'
import type { CalculationResult, UserInputs } from '@/lib/types'
import ShareButton from './ShareButton'

interface ResultsProps {
  result: CalculationResult
  onReset: () => void
  inputs: UserInputs
}

const OMEGA3_URL = process.env.NEXT_PUBLIC_AMAZON_OMEGA3_URL ?? '#'
const OLIVE_URL = process.env.NEXT_PUBLIC_AMAZON_OLIVE_OIL_URL ?? '#'
const WALNUTS_URL = process.env.NEXT_PUBLIC_AMAZON_WALNUTS_URL ?? '#'

const TIER_COLORS: Record<CalculationResult['tier'], string> = {
  OPTIMAL: '#16a34a',
  MODERATE: '#ca8a04',
  HIGH: '#ea580c',
  'VERY HIGH': '#dc2626',
}

const TIER_BG: Record<CalculationResult['tier'], string> = {
  OPTIMAL: '#f0fdf4',
  MODERATE: '#fefce8',
  HIGH: '#fff7ed',
  'VERY HIGH': '#fef2f2',
}

function useCountUp(target: number, durationMs: number) {
  const [count, setCount] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()

    function step(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / durationMs, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [target, durationMs])

  return count
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        backgroundColor: '#fff7ed',
        borderRadius: '10px',
        padding: '16px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#ea580c',
          marginBottom: '4px',
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: '13px', color: '#78716c', lineHeight: 1.3 }}>
        {label}
      </div>
    </div>
  )
}

function AffiliateCard({
  href,
  emoji,
  title,
  description,
}: {
  href: string
  emoji: string
  title: string
  description: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '14px 16px',
        borderRadius: '10px',
        border: '1px solid #e7e5e4',
        backgroundColor: '#ffffff',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'border-color 0.15s',
      }}
    >
      <span style={{ fontSize: '24px', lineHeight: 1 }}>{emoji}</span>
      <div>
        <div style={{ fontWeight: 600, fontSize: '14px', color: '#1c1917', marginBottom: '2px' }}>
          {title}
        </div>
        <div style={{ fontSize: '13px', color: '#78716c', lineHeight: 1.4 }}>
          {description}
        </div>
        <div
          style={{
            display: 'inline-block',
            marginTop: '6px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#ea580c',
          }}
        >
          View on Amazon →
        </div>
      </div>
    </a>
  )
}

export default function Results({ result, onReset, inputs }: ResultsProps) {
  const tierColor = TIER_COLORS[result.tier]
  const tierBg = TIER_BG[result.tier]
  const displayedRatio = useCountUp(Math.round(Math.min(result.ratio, 50)), 1500)

  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  const showAffiliates =
    result.tier === 'HIGH' ||
    result.tier === 'VERY HIGH' ||
    inputs.omega3Supplement === 'none' ||
    inputs.oilyFish === 'rarely_never'

  const omega3Needed = parseFloat(result.omega3Needed)
  const capsules = Math.round(omega3Needed / 1)
  const salmonServings = Math.round(omega3Needed / 0.6)

  const tierContextLines: Record<CalculationResult['tier'], string> = {
    OPTIMAL:
      'Your omega-6 to omega-3 balance is within the healthy range. Keep it up by maintaining your current diet and continuing to prioritise omega-3-rich foods.',
    MODERATE:
      'Your ratio is above the ideal 4:1 target but not yet in the danger zone. Small, consistent changes to your diet can bring this into the optimal range relatively quickly.',
    HIGH: `Your ratio is approximately ${Math.round(result.ratio / 4)}× higher than the healthy target of 4:1. At this level, chronic low-grade inflammation may be a concern.`,
    'VERY HIGH': `Your ratio is approximately ${Math.round(result.ratio / 4)}× higher than the healthy target of 4:1. This level of imbalance is associated with significant inflammatory risk and warrants meaningful dietary changes.`,
  }

  const tierHealthText: Record<CalculationResult['tier'], { p1: string; p2: string }> = {
    OPTIMAL: {
      p1: 'A ratio at or below 4:1 is associated with significantly reduced risk of chronic inflammatory conditions, including cardiovascular disease, metabolic syndrome, and certain cancers. Ancient hunter-gatherer diets maintained a ratio close to 1:1, and modern longevity research consistently links lower ratios with better health outcomes.',
      p2: 'Your diet appears well-balanced in terms of fatty acid ratios. To maintain this, continue prioritising omega-3-rich foods like oily fish, minimise ultra-processed food consumption, and be mindful of cooking oil choices when eating out.',
    },
    MODERATE: {
      p1: 'A ratio in the 4–10:1 range is common in health-conscious Western diets and represents a meaningful improvement over the average, but still leaves room for optimisation. Research suggests that bringing the ratio below 4:1 has measurable benefits for inflammatory markers and long-term cardiovascular health.',
      p2: 'The most impactful changes at this level are typically increasing omega-3 intake — through oily fish or supplementation — rather than making dramatic cuts to omega-6. Even adding one or two additional servings of salmon per week can shift the balance noticeably.',
    },
    HIGH: {
      p1: 'Research by Simopoulos (2002) identified that Western diets with omega-6:omega-3 ratios of 15–17:1 are associated with increased risk of cardiovascular disease, inflammatory conditions, and certain cancers. A ratio in the 10–20:1 range puts you within this high-risk territory.',
      p2: 'At this level, both reducing omega-6 sources and boosting omega-3 intake matter. Switching cooking oils, reducing processed food, and adding oily fish or a quality omega-3 supplement are the three highest-impact interventions you can make. These changes are cumulative — even partial improvements help.',
    },
    'VERY HIGH': {
      p1: 'A ratio above 20:1 is associated with the highest levels of systemic inflammation in dietary research. Simopoulos (2002) and subsequent meta-analyses identify this range as a significant independent risk factor for cardiovascular disease, depression, and accelerated cellular ageing.',
      p2: 'The good news is that the ratio is highly modifiable through diet. People who switch from seed oils to olive oil and add omega-3-rich foods or supplements can see meaningful ratio improvements within weeks. The actions listed below are prioritised specifically for your dietary pattern — start with the first one.',
    },
  }

  return (
    <div
      style={{
        maxWidth: '680px',
        margin: '0 auto',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {/* SECTION 1 — Tier Badge */}
      <div
        style={{
          backgroundColor: tierBg,
          border: `2px solid ${tierColor}`,
          borderRadius: '12px',
          padding: '20px 24px',
          textAlign: 'center',
          marginBottom: '28px',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            backgroundColor: tierColor,
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.08em',
            padding: '4px 12px',
            borderRadius: '999px',
            marginBottom: '10px',
          }}
        >
          {result.tier} RISK
        </div>
        <div style={{ fontSize: '15px', color: '#57534e', fontWeight: 500 }}>
          {tierContextLines[result.tier]}
        </div>
      </div>

      {/* SECTION 2 — Count-up ratio */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '28px',
          padding: '28px 24px',
          backgroundColor: '#fff7ed',
          borderRadius: '12px',
        }}
      >
        <p style={{ fontSize: '15px', color: '#78716c', marginBottom: '8px' }}>
          Your estimated omega-6:omega-3 ratio is
        </p>
        <div
          style={{
            fontSize: '64px',
            fontWeight: 800,
            color: '#ea580c',
            lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {displayedRatio}:1
        </div>
        <p style={{ fontSize: '14px', color: '#a8a29e', marginTop: '10px' }}>
          The healthy target is 4:1 or below
        </p>
        {result.vsWesternAverage !== 0 && (
          <p style={{ fontSize: '14px', color: '#78716c', marginTop: '6px' }}>
            {result.vsWesternAverage > 0
              ? `${result.vsWesternAverage}% above the Western average (16:1)`
              : `${Math.abs(result.vsWesternAverage)}% below the Western average (16:1)`}
          </p>
        )}
      </div>

      {/* SECTION 4 — Two stat cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff7ed',
            borderRadius: '10px',
            padding: '16px',
            gridColumn: '1 / -1',
          }}
        >
          <div style={{ fontSize: '14px', color: '#78716c', marginBottom: '6px' }}>
            Daily omega-6 equivalent
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#ea580c' }}>
            {result.teaspoonsEquivalent} teaspoons of vegetable oil
          </div>
          <div style={{ fontSize: '13px', color: '#a8a29e', marginTop: '4px' }}>
            This is your estimated daily omega-6 intake expressed as cooking oil
          </div>
        </div>

        {omega3Needed > 0 && (
          <div
            style={{
              backgroundColor: '#f0fdf4',
              borderRadius: '10px',
              padding: '16px',
              gridColumn: '1 / -1',
            }}
          >
            <div style={{ fontSize: '14px', color: '#78716c', marginBottom: '6px' }}>
              Extra omega-3 needed to reach 4:1
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#16a34a' }}>
              +{result.omega3Needed}g per day
            </div>
            <div style={{ fontSize: '13px', color: '#a8a29e', marginTop: '4px' }}>
              Approx. {capsules} omega-3 capsule{capsules !== 1 ? 's' : ''}, or{' '}
              {salmonServings} serving{salmonServings !== 1 ? 's' : ''} of salmon per week
            </div>
          </div>
        )}
      </div>

      {/* SECTION 5 — 2×2 stat grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          marginBottom: '28px',
        }}
      >
        <StatCard
          label="Daily omega-6"
          value={`${result.totalOmega6PerDay.toFixed(1)}g`}
        />
        <StatCard
          label="Daily omega-3"
          value={`${result.totalOmega3PerDay.toFixed(2)}g`}
        />
        <StatCard
          label="Your ratio"
          value={result.ratioDisplay}
        />
        <StatCard
          label="Healthy target"
          value="4:1"
        />
      </div>

      {/* SECTION 6 — Health explanation */}
      <div
        style={{
          backgroundColor: '#f5f5f4',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '28px',
        }}
      >
        <h3
          style={{
            fontSize: '17px',
            fontWeight: 700,
            color: '#1c1917',
            marginBottom: '12px',
          }}
        >
          What Does This Mean for Your Health?
        </h3>
        <p style={{ fontSize: '14px', color: '#57534e', lineHeight: 1.7, marginBottom: '12px' }}>
          {tierHealthText[result.tier].p1}
        </p>
        <p style={{ fontSize: '14px', color: '#57534e', lineHeight: 1.7 }}>
          {tierHealthText[result.tier].p2}
        </p>
      </div>

      {/* SECTION 7 — Top 3 personal actions */}
      {result.topReductions.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h3
            style={{
              fontSize: '17px',
              fontWeight: 700,
              color: '#1c1917',
              marginBottom: '14px',
            }}
          >
            Your Top {result.topReductions.length} Personal Actions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {result.topReductions.map((action, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: '1px solid #e7e5e4',
                  backgroundColor: '#ffffff',
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#ea580c',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '13px',
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1c1917', marginBottom: '4px' }}>
                    {action.action}
                  </div>
                  {action.estimatedSaving > 0 ? (
                    <div style={{ fontSize: '13px', color: '#78716c' }}>
                      Could reduce your ratio by ~{action.estimatedSaving.toFixed(1)}g omega-6/day
                      {' '}— bringing your ratio to approximately{' '}
                      <span style={{ fontWeight: 600, color: '#ea580c' }}>
                        {action.newRatioIfChanged}:1
                      </span>
                    </div>
                  ) : (
                    <div style={{ fontSize: '13px', color: '#78716c' }}>
                      Would bring your ratio to approximately{' '}
                      <span style={{ fontWeight: 600, color: '#16a34a' }}>
                        {action.newRatioIfChanged}:1
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 8 — Affiliate recommendations */}
      {showAffiliates && (
        <div
          style={{
            marginBottom: '28px',
            padding: '20px 24px',
            borderRadius: '12px',
            border: '1px solid #e7e5e4',
            backgroundColor: '#fafaf9',
          }}
        >
          <h3
            style={{
              fontSize: '17px',
              fontWeight: 700,
              color: '#1c1917',
              marginBottom: '4px',
            }}
          >
            Recommended Products
          </h3>
          <p style={{ fontSize: '13px', color: '#a8a29e', marginBottom: '14px' }}>
            Based on your results, these are the highest-impact dietary additions.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(inputs.omega3Supplement === 'none' || result.tier === 'HIGH' || result.tier === 'VERY HIGH') && (
              <AffiliateCard
                href={OMEGA3_URL}
                emoji="🐟"
                title="High-Strength Omega-3 Fish Oil (1000mg+ EPA/DHA)"
                description="The most direct way to improve your ratio. Look for triglyceride-form omega-3 for best absorption."
              />
            )}
            {(result.tier === 'HIGH' || result.tier === 'VERY HIGH') && (
              <AffiliateCard
                href={OLIVE_URL}
                emoji="🫒"
                title="Extra Virgin Olive Oil"
                description="Replacing vegetable oil with EVOO is the single biggest dietary switch you can make for your omega ratio."
              />
            )}
            {(inputs.oilyFish === 'rarely_never' || result.tier === 'VERY HIGH') && (
              <AffiliateCard
                href={WALNUTS_URL}
                emoji="🌰"
                title="Raw Walnuts (ALA omega-3 source)"
                description="A convenient plant-based omega-3 source. ALA converts to EPA/DHA at low rates but still contributes to your omega-3 total."
              />
            )}
          </div>
          <p
            style={{
              fontSize: '12px',
              color: '#a8a29e',
              marginTop: '12px',
              lineHeight: 1.5,
            }}
          >
            Affiliate disclosure: Links above may be affiliate links. If you purchase through
            them, we may earn a small commission at no extra cost to you. This helps support
            the free calculator.
          </p>
        </div>
      )}

      {/* SECTION 9 — Share */}
      <div
        style={{
          marginBottom: '28px',
          padding: '20px 24px',
          borderRadius: '12px',
          border: '1px solid #e7e5e4',
          backgroundColor: '#ffffff',
        }}
      >
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#1c1917',
            marginBottom: '4px',
          }}
        >
          Share Your Result
        </h3>
        <p style={{ fontSize: '13px', color: '#78716c', marginBottom: '14px' }}>
          Help others find out about their omega ratio.
        </p>
        <ShareButton
          ratioDisplay={result.ratioDisplay}
          tier={result.tier}
          multiplier={result.tier === 'HIGH' || result.tier === 'VERY HIGH'
            ? Math.round(result.ratio / 4)
            : undefined}
        />
      </div>

      {/* SECTION 10 — Recalculate */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <button
          type="button"
          onClick={onReset}
          style={{
            padding: '12px 28px',
            borderRadius: '8px',
            border: '2px solid #e7e5e4',
            backgroundColor: '#ffffff',
            color: '#57534e',
            fontWeight: 600,
            fontSize: '15px',
            cursor: 'pointer',
            transition: 'border-color 0.15s',
          }}
        >
          Recalculate with Different Answers
        </button>
      </div>

      {/* DISCLAIMER */}
      <div
        style={{
          padding: '16px',
          borderRadius: '8px',
          backgroundColor: '#f5f5f4',
          borderLeft: '3px solid #d6d3d1',
        }}
      >
        <p style={{ fontSize: '12px', color: '#a8a29e', lineHeight: 1.6, margin: 0 }}>
          <strong style={{ color: '#78716c' }}>Disclaimer:</strong> This calculator provides
          an estimated omega-6:omega-3 ratio based on population-level dietary data (USDA
          FoodData Central) and self-reported intake. It is intended for educational purposes
          only and does not constitute medical advice. Individual metabolism, food preparation
          methods, and portion sizes vary significantly. Consult a registered dietitian or
          healthcare provider before making significant dietary changes, especially if you
          have a diagnosed health condition.
        </p>
      </div>
    </div>
  )
}
