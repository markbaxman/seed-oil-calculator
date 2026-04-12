export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"
          style={{ borderTopColor: '#ea580c', borderColor: '#fed7aa' }}
        />
        <p className="text-sm" style={{ color: '#a8a29e' }}>Loading…</p>
      </div>
    </div>
  )
}
