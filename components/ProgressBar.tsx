interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  labels?: string[]
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  labels = ['Cooking Oils & Fats', 'Packaged & Processed Food', 'Omega-3 Sources & You'],
}: ProgressBarProps) {
  const pct = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium" style={{ color: '#57534e' }}>
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm" style={{ color: '#a8a29e' }}>
          {labels[currentStep - 1]}
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: '#e7e5e4' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, backgroundColor: '#ea580c' }}
        />
      </div>
    </div>
  )
}
