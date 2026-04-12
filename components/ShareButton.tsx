'use client'

import { useState } from 'react'
import { trackEvent } from './Analytics'

interface ShareButtonProps {
  tier: string
  tierLabel: string
  ratioDisplay: string
  xOverTarget: number
}

export default function ShareButton({
  tier,
  tierLabel,
  ratioDisplay,
  xOverTarget,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const isHigh = tier === 'HIGH' || tier === 'VERY HIGH'
  const emoji = tier === 'VERY HIGH' ? '🚨' : tier === 'HIGH' ? '🔴' : tier === 'MODERATE' ? '⚠️' : '✅'

  const copyText = isHigh
    ? `I just checked my inflammation risk — it's ${tierLabel.toUpperCase()} ${emoji}\n\nMy omega-6:omega-3 ratio is ${ratioDisplay}. That's ${xOverTarget}× higher than it should be.\n\nApparently most of us have no idea how bad our diet is for inflammation.\n\nCheck yours: https://www.seedoilcalculator.com/`
    : `I just checked my omega-6:omega-3 balance — my inflammation risk is ${tierLabel} ${emoji}\n\nRatio: ${ratioDisplay} (healthy target is 4:1)\n\nCheck yours: https://www.seedoilcalculator.com/`

  const tweetText = isHigh
    ? `Just checked my inflammation risk — it's ${tierLabel.toUpperCase()} ${emoji} My omega ratio is ${ratioDisplay} (${xOverTarget}× the healthy target). Most people have no idea 😬 Check yours: seedoilcalculator.com #inflammation #seedoils #health`
    : `Just checked my omega balance — inflammation risk is ${tierLabel} ${emoji} Ratio: ${ratioDisplay} (target 4:1) Check yours: seedoilcalculator.com #omega3 #seedoils`

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      trackEvent('result_shared', { method: 'copy', tier })
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // clipboard API not available
    }
  }

  const handleTwitterClick = () => {
    trackEvent('result_shared', { method: 'twitter', tier })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Pre-filled copy preview */}
      <div
        style={{
          padding: '12px 14px',
          borderRadius: '8px',
          backgroundColor: '#f5f5f4',
          fontSize: '13px',
          color: '#57534e',
          lineHeight: 1.6,
          whiteSpace: 'pre-line',
          border: '1px solid #e7e5e4',
        }}
      >
        {copyText}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleCopy}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '2px solid #e7e5e4',
            backgroundColor: copied ? '#f0fdf4' : '#ffffff',
            color: copied ? '#16a34a' : '#1c1917',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {copied ? (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy to Clipboard
            </>
          )}
        </button>

        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleTwitterClick}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#000000',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '14px',
            textDecoration: 'none',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on X
        </a>
      </div>
    </div>
  )
}
