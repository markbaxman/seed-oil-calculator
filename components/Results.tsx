'use client'

import { useState, useEffect, useRef } from 'react'
import type { CalculationResult, UserInputs } from '@/lib/types'
import ShareButton from './ShareButton'

interface ResultsProps {
  result: CalculationResult
  onReset: () => void
  inputs: UserInputs
}

// ─── Amazon UK affiliate product links (tag: seedoilcalculator-20) ─────────────
// Override via env vars with your specific product URLs.
// Defaults point to specific bestselling products on Amazon UK.
//
// OMEGA3_URL  — Vitabiotics Ultra Omega-3 1000mg (60 caps)
// OLIVE_URL   — Filippo Berio Extra Virgin Olive Oil 5L
// AVOCADO_URL — Chosen Foods 100% Pure Avocado Oil 1L
// KRILL_URL   — Sports Research Antarctic Krill Oil 1000mg
const OMEGA3_URL =
  process.env.NEXT_PUBLIC_AMAZON_OMEGA3_URL ??
  'https://www.amazon.co.uk/Vitabiotics-Ultra-Omega-3-Capsules/dp/B003C3R52G?tag=seedoilcalculator-20'
const OLIVE_URL =
  process.env.NEXT_PUBLIC_AMAZON_OLIVE_OIL_URL ??
  'https://www.amazon.co.uk/Filippo-Berio-Extra-Virgin-Olive-Oil/dp/B07FL3BVHH?tag=seedoilcalculator-20'
const AVOCADO_URL =
  process.env.NEXT_PUBLIC_AMAZON_AVOCADO_OIL_URL ??
  'https://www.amazon.co.uk/Chosen-Foods-Avocado-Oil-1000ml/dp/B0143LKGOU?tag=seedoilcalculator-20'
const KRILL_URL =
  process.env.NEXT_PUBLIC_AMAZON_KRILL_URL ??
  'https://www.amazon.co.uk/s?k=krill+oil+1000mg+UK&tag=seedoilcalculator-20'

const TIER_CONFIG: Record<
  CalculationResult['tier'],
  { color: string; bg: string; border: string; label: string; emoji: string }
> = {
  OPTIMAL:    { color: '#16a34a', bg: '#f0fdf4', border: '#86efac', label: 'Low',       emoji: '✅' },
  MODERATE:   { color: '#ca8a04', bg: '#fefce8', border: '#fde047', label: 'Moderate',  emoji: '⚠️' },
  HIGH:       { color: '#ea580c', bg: '#fff7ed', border: '#fdba74', label: 'High',       emoji: '🔴' },
  'VERY HIGH':{ color: '#dc2626', bg: '#fef2f2', border: '#fca5a5', label: 'Very High', emoji: '🚨' },
}

function useCountUp(target: number, durationMs: number) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (started.current) return
    started.current = true
    const t0 = performance.now()
    function tick(now: number) {
      const p = Math.min((now - t0) / durationMs, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, durationMs])
  return count
}

function AffiliateCard({
  href,
  emoji,
  title,
  benefit,
}: {
  href: string
  emoji: string
  title: string
  benefit: string
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
      }}
    >
      <span style={{ fontSize: '22px', lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: '14px', color: '#1c1917', marginBottom: '2px' }}>
          {title}
        </div>
        <div style={{ fontSize: '13px', color: '#78716c', lineHeight: 1.4, marginBottom: '6px' }}>
          {benefit}
        </div>
        <span
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#ea580c',
            letterSpacing: '0.02em',
          }}
        >
          View on Amazon →
        </span>
      </div>
    </a>
  )
}

// Visual ratio bar — shows where the user sits on a scale from 4:1 to 30:1
function RatioBar({ ratio }: { ratio: number }) {
  const MIN = 4
  const MAX = 30
  const clamped = Math.min(Math.max(ratio, MIN), MAX)
  const pct = ((clamped - MIN) / (MAX - MIN)) * 100
  const idealPct = 0 // 4:1 is at the very left

  const [animated, setAnimated] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setAnimated(pct), 100)
    return () => clearTimeout(t)
  }, [pct])

  return (
    <div style={{ marginBottom: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#a8a29e', marginBottom: '6px' }}>
        <span style={{ color: '#16a34a', fontWeight: 600 }}>Optimal 4:1</span>
        <span>Western avg 16:1</span>
        <span style={{ color: '#dc2626' }}>30:1+</span>
      </div>
      <div
        style={{
          position: 'relative',
          height: '12px',
          borderRadius: '999px',
          overflow: 'visible',
          background: 'linear-gradient(to right, #86efac 0%, #fde047 30%, #fdba74 60%, #fca5a5 100%)',
        }}
      >
        {/* Ideal marker */}
        <div
          style={{
            position: 'absolute',
            left: `${idealPct}%`,
            top: '-4px',
            width: '3px',
            height: '20px',
            backgroundColor: '#16a34a',
            borderRadius: '2px',
          }}
        />
        {/* User marker */}
        <div
          style={{
            position: 'absolute',
            left: `${animated}%`,
            top: '-6px',
            transform: 'translateX(-50%)',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: '#1c1917',
            border: '3px solid #ffffff',
            boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
            transition: 'left 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
            zIndex: 10,
          }}
        />
      </div>
      <div
        style={{
          marginTop: '10px',
          textAlign: 'center',
          fontSize: '13px',
          color: '#57534e',
        }}
      >
        Your ratio: <strong style={{ color: '#1c1917' }}>{Math.round(Math.min(ratio, 50))}:1</strong>
        &nbsp;&nbsp;·&nbsp;&nbsp;
        Target: <strong style={{ color: '#16a34a' }}>4:1</strong>
      </div>
    </div>
  )
}

export default function Results({ result, onReset, inputs }: ResultsProps) {
  const cfg = TIER_CONFIG[result.tier]
  const displayedRatio = useCountUp(Math.round(Math.min(result.ratio, 50)), 1400)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  const omega3Needed = parseFloat(result.omega3Needed)
  const capsules = Math.round(omega3Needed / 1)
  const salmonServings = Math.round(omega3Needed / 0.6)

  // Affiliate products — always show at least 2 based on what will help most
  const showOmega3 = inputs.omega3Supp === 'no' || inputs.omega3Supp === 'occasionally' || result.tier !== 'OPTIMAL'
  const showOliveOil = inputs.cookingFat === 'seed_oils' || inputs.cookingFat === 'mixed' || result.tier === 'HIGH' || result.tier === 'VERY HIGH'
  const showAvocado = result.tier === 'VERY HIGH' || (inputs.cookingFat === 'seed_oils' && showOmega3)
  const showKrill = result.tier === 'OPTIMAL' && inputs.omega3Supp === 'no' // alternative for people already doing well
  const showAffiliates = true // always show — drives affiliate revenue on every result

  const subTexts: Record<CalculationResult['tier'], string> = {
    OPTIMAL:
      'Your omega-6 intake appears well-balanced. Your diet is in the range that nutrition research considers healthy.',
    MODERATE:
      'Your diet has some seed oil and processed food exposure. Small, targeted changes can bring your balance into the optimal range.',
    HIGH:
      'Your diet is likely high in seed oils and processed foods. This level of imbalance is associated with chronic low-grade inflammation.',
    'VERY HIGH':
      'Your diet appears heavily reliant on seed oils and processed food. This is the most common pattern in Western diets — and the most modifiable.',
  }

  return (
    <div
      style={{
        maxWidth: '680px',
        margin: '0 auto',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {/* ── SECTION 1: Emotional headline ── */}
      <div
        style={{
          backgroundColor: cfg.bg,
          border: `2px solid ${cfg.border}`,
          borderRadius: '14px',
          padding: '24px',
          textAlign: 'center',
          marginBottom: '24px',
        }}
      >
        <div style={{ fontSize: '28px', marginBottom: '8px' }}>{cfg.emoji}</div>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: cfg.color,
            textTransform: 'uppercase',
            marginBottom: '6px',
          }}
        >
          Inflammation Risk
        </div>
        <div
          style={{
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            fontWeight: 800,
            color: cfg.color,
            lineHeight: 1,
            marginBottom: '12px',
          }}
        >
          {cfg.label}
        </div>
        <p style={{ fontSize: '15px', color: '#57534e', lineHeight: 1.6, margin: 0 }}>
          {subTexts[result.tier]}
        </p>
      </div>

      {/* ── SECTION 2: Ratio count-up + visual bar ── */}
      <div
        style={{
          padding: '24px',
          backgroundColor: '#fff7ed',
          borderRadius: '12px',
          marginBottom: '20px',
        }}
      >
        <p style={{ fontSize: '14px', color: '#78716c', marginBottom: '4px', textAlign: 'center' }}>
          Estimated omega balance
        </p>
        <div
          style={{
            fontSize: 'clamp(3rem, 14vw, 4.5rem)',
            fontWeight: 800,
            color: '#ea580c',
            lineHeight: 1,
            textAlign: 'center',
            fontVariantNumeric: 'tabular-nums',
            marginBottom: '4px',
          }}
        >
          {displayedRatio}:1
        </div>
        <p style={{ fontSize: '13px', color: '#a8a29e', textAlign: 'center', marginBottom: '20px' }}>
          Healthy target is 4:1 or lower
        </p>
        <RatioBar ratio={result.ratio} />
      </div>

      {/* ── SECTION 3: Impact stat ── */}
      {result.xOverTarget > 1 && (
        <div
          style={{
            padding: '16px 20px',
            borderRadius: '10px',
            backgroundColor: '#1c1917',
            color: '#ffffff',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div style={{ fontSize: '28px', flexShrink: 0 }}>⚡</div>
          <p style={{ fontSize: '14px', lineHeight: 1.5, margin: 0 }}>
            You may be consuming approximately{' '}
            <strong style={{ color: '#fb923c' }}>{result.xOverTarget}× more</strong>{' '}
            inflammatory omega-6 fats than your body can balance — relative to the 4:1 healthy target.
          </p>
        </div>
      )}

      {/* ── SECTION 4: Stats grid ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        {[
          { label: 'Daily omega-6', value: `${result.totalOmega6PerDay.toFixed(1)}g` },
          { label: 'Daily omega-3', value: `${result.totalOmega3PerDay.toFixed(2)}g` },
          { label: 'Your ratio', value: result.ratioDisplay },
          { label: 'Healthy target', value: '4:1' },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{
              backgroundColor: '#fff7ed',
              borderRadius: '10px',
              padding: '14px 16px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#ea580c', marginBottom: '3px' }}>
              {value}
            </div>
            <div style={{ fontSize: '12px', color: '#78716c', lineHeight: 1.3 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* ── SECTION 5: Teaspoons + omega-3 needed ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            backgroundColor: '#fafaf9',
            border: '1px solid #e7e5e4',
            borderRadius: '10px',
            padding: '14px 16px',
          }}
        >
          <div style={{ fontSize: '13px', color: '#78716c', marginBottom: '4px' }}>
            Daily omega-6 equivalent
          </div>
          <div style={{ fontSize: '17px', fontWeight: 700, color: '#ea580c' }}>
            {result.teaspoonsEquivalent} teaspoons of vegetable oil
          </div>
          <div style={{ fontSize: '12px', color: '#a8a29e', marginTop: '3px' }}>
            That is your estimated daily omega-6 intake expressed as cooking oil volume
          </div>
        </div>

        {omega3Needed > 0 && (
          <div
            style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #86efac',
              borderRadius: '10px',
              padding: '14px 16px',
            }}
          >
            <div style={{ fontSize: '13px', color: '#78716c', marginBottom: '4px' }}>
              Extra omega-3 needed daily to reach 4:1
            </div>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#16a34a' }}>
              +{result.omega3Needed}g per day
            </div>
            <div style={{ fontSize: '12px', color: '#a8a29e', marginTop: '3px' }}>
              ≈ {capsules} omega-3 capsule{capsules !== 1 ? 's' : ''}, or{' '}
              {salmonServings} serving{salmonServings !== 1 ? 's' : ''} of salmon per week
            </div>
          </div>
        )}
      </div>

      {/* ── SECTION 6: Top 3 personalised actions ── */}
      {result.topReductions.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#1c1917',
              marginBottom: '4px',
            }}
          >
            Your Personalised Fix Plan
          </h3>
          <p style={{ fontSize: '13px', color: '#78716c', marginBottom: '14px' }}>
            Top {result.topReductions.length} actions ranked by impact on your specific results
          </p>
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
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1c1917', marginBottom: '5px' }}>
                    {action.action}
                  </div>
                  {action.estimatedSaving > 0 ? (
                    <div style={{ fontSize: '13px', color: '#78716c' }}>
                      Saves ~{action.estimatedSaving.toFixed(1)}g omega-6/day — estimated new ratio:{' '}
                      <strong style={{ color: '#ea580c' }}>{action.newRatioIfChanged}:1</strong>
                    </div>
                  ) : (
                    <div style={{ fontSize: '13px', color: '#78716c' }}>
                      Estimated new ratio:{' '}
                      <strong style={{ color: '#16a34a' }}>{action.newRatioIfChanged}:1</strong>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SECTION 7: Amazon affiliate products ── */}
      <div
        style={{
          marginBottom: '24px',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #e7e5e4',
          backgroundColor: '#fafaf9',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1c1917', margin: 0 }}>
            Recommended Products
          </h3>
          <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#ea580c', color: '#fff', padding: '2px 7px', borderRadius: '999px', letterSpacing: '0.04em' }}>
            FOR YOU
          </span>
        </div>
        <p style={{ fontSize: '13px', color: '#a8a29e', marginBottom: '14px' }}>
          Selected based on your specific results — these have the highest impact for your diet pattern.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {showOmega3 && (
            <AffiliateCard
              href={OMEGA3_URL}
              emoji="🐟"
              title="Vitabiotics Ultra Omega-3 1000mg"
              benefit="The most direct way to improve your ratio fast. High-strength EPA/DHA from purified fish oil — one of the UK's best-selling omega-3 supplements."
            />
          )}
          {showKrill && (
            <AffiliateCard
              href={KRILL_URL}
              emoji="🦐"
              title="Krill Oil Omega-3 1000mg"
              benefit="Phospholipid-form omega-3 from Antarctic krill — often better absorbed than standard fish oil, with added astaxanthin antioxidant."
            />
          )}
          {showOliveOil && (
            <AffiliateCard
              href={OLIVE_URL}
              emoji="🫒"
              title="Filippo Berio Extra Virgin Olive Oil 5L"
              benefit="Buying in bulk (5L tin) cuts cost per tablespoon dramatically. Switching from vegetable oil to EVOO saves up to 8g of omega-6 per tablespoon used."
            />
          )}
          {showAvocado && (
            <AffiliateCard
              href={AVOCADO_URL}
              emoji="🥑"
              title="Chosen Foods 100% Pure Avocado Oil"
              benefit="Smoke point ~270°C — ideal for high-heat frying and searing. Very low omega-6, neutral flavour. The best direct swap for vegetable oil at high temperatures."
            />
          )}
          {/* Always show at least one product if none triggered above */}
          {!showOmega3 && !showKrill && !showOliveOil && !showAvocado && (
            <AffiliateCard
              href={OMEGA3_URL}
              emoji="🐟"
              title="Vitabiotics Ultra Omega-3 1000mg"
              benefit="Even with a healthy ratio, daily omega-3 supplementation supports cardiovascular function, brain health, and helps maintain your balance long-term."
            />
          )}
        </div>
        <p style={{ fontSize: '11px', color: '#a8a29e', marginTop: '12px', lineHeight: 1.5 }}>
          As an Amazon Associate we earn from qualifying purchases. Affiliate links do not affect
          which products are recommended — only your results determine what appears here.
        </p>
      </div>

      {/* ── SECTION 8: Share ── */}
      <div
        style={{
          marginBottom: '24px',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #e7e5e4',
          backgroundColor: '#ffffff',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1c1917', marginBottom: '4px' }}>
          Share Your Result
        </h3>
        <p style={{ fontSize: '13px', color: '#78716c', marginBottom: '14px' }}>
          Most people have no idea their diet is this far out of balance.
        </p>
        <ShareButton
          tier={result.tier}
          tierLabel={cfg.label}
          ratioDisplay={result.ratioDisplay}
          xOverTarget={result.xOverTarget}
        />
      </div>

      {/* ── SECTION 9: Recalculate ── */}
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
          }}
        >
          Recalculate with Different Answers
        </button>
      </div>

      {/* ── DISCLAIMER ── */}
      <div
        style={{
          padding: '16px',
          borderRadius: '8px',
          backgroundColor: '#f5f5f4',
          borderLeft: '3px solid #d6d3d1',
        }}
      >
        <p style={{ fontSize: '12px', color: '#a8a29e', lineHeight: 1.6, margin: 0 }}>
          <strong style={{ color: '#78716c' }}>Disclaimer:</strong> This tool provides estimates
          based on general dietary patterns and population-level food composition data (USDA
          FoodData Central). Results are for educational purposes only and do not constitute
          medical advice. Individual results vary based on portion sizes, brands, and metabolism.
          Consult a healthcare professional before making significant dietary changes.
        </p>
      </div>
    </div>
  )
}
