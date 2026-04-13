'use client'

interface AdSlotProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'leaderboard'
  className?: string
}

export default function AdSlot({ slot, format = 'auto', className = '' }: AdSlotProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID

  return null
}
