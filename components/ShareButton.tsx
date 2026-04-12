'use client'

import { useState } from 'react'
import { trackEvent } from './Analytics'

interface ShareButtonProps {
  ratioDisplay: string
  tier: string
  multiplier?: number
}

export default function ShareButton({ ratioDisplay, tier, multiplier }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const ratioNum = parseInt(ratioDisplay)
  const tweetText = `Just found out my omega-6:omega-3 ratio is ${ratioDisplay} 😳 The healthy target is 4:1. Apparently my diet is ${multiplier ? `${multiplier}×` : 'significantly'} more inflammatory than it should be. Find out yours: seedoilcalculator.com #seedoils #inflammation`

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `My omega-6:omega-3 ratio is ${ratioDisplay} (${tier}). The healthy target is 4:1. Calculate yours at seedoilcalculator.com`
      )
      setCopied(true)
      trackEvent('result_shared', { method: 'copy' })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  const handleTwitterClick = () => {
    trackEvent('result_shared', { method: 'twitter' })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleTwitterClick}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#1da1f2' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Share on X
      </a>
      <button
        onClick={handleCopy}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm border transition-colors"
        style={{ borderColor: '#e7e5e4', color: '#1c1917', backgroundColor: 'white' }}
      >
        {copied ? (
          <>
            <span>✓</span> Copied!
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy Result
          </>
        )}
      </button>
    </div>
  )
}
