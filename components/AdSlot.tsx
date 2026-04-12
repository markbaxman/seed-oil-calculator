'use client'

interface AdSlotProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'leaderboard'
  className?: string
}

export default function AdSlot({ slot, format = 'auto', className = '' }: AdSlotProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID

  if (!publisherId) {
    // Development placeholder
    return (
      <div
        className={`flex items-center justify-center text-xs rounded ${className}`}
        style={{
          backgroundColor: '#f5f5f4',
          border: '1px dashed #e7e5e4',
          color: '#a8a29e',
          minHeight: format === 'leaderboard' ? '90px' : '250px',
          minWidth: '100%',
        }}
      >
        Ad slot {slot} ({format}) — enabled in production
      </div>
    )
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
