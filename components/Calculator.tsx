'use client'

import { useState, useRef, useEffect } from 'react'
import type { UserInputs } from '@/lib/types'
import { calculateRisk } from '@/lib/calculate'
import { trackEvent } from './Analytics'
import ProgressBar from './ProgressBar'
import Step1 from './Step1'
import Step2 from './Step2'
import Results from './Results'

type Step = 1 | 2 | 'results'

export default function Calculator() {
  const [step, setStep] = useState<Step>(1)
  const [inputs, setInputs] = useState<Partial<UserInputs>>({})
  const [result, setResult] = useState<ReturnType<typeof calculateRisk> | null>(null)
  const topRef = useRef<HTMLDivElement>(null)

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleChange = (key: keyof UserInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  const goToStep2 = () => {
    setStep(2)
    trackEvent('calculator_step2')
    scrollToTop()
  }

  const handleSubmit = () => {
    const full = inputs as UserInputs
    const calc = calculateRisk(full)
    setResult(calc)
    setStep('results')
    trackEvent('calculator_completed', { tier: calc.tier, ratio: Math.round(calc.ratio) })
    scrollToTop()
  }

  const handleReset = () => {
    setStep(1)
    setInputs({})
    setResult(null)
    scrollToTop()
  }

  useEffect(() => {
    if (step === 1 && Object.keys(inputs).length === 0) {
      trackEvent('calculator_started')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  return (
    <div
      id="calculator"
      ref={topRef}
      className="rounded-xl border p-6 md:p-8 scroll-mt-20"
      style={{ backgroundColor: '#ffffff', borderColor: '#e7e5e4' }}
    >
      {step !== 'results' && (
        <ProgressBar currentStep={step as number} totalSteps={2} />
      )}

      <div className="slide-in" key={step}>
        {step === 1 && (
          <Step1
            inputs={inputs}
            onChange={handleChange}
            onNext={goToStep2}
          />
        )}
        {step === 2 && (
          <Step2
            inputs={inputs}
            onChange={handleChange}
            onBack={() => { setStep(1); scrollToTop() }}
            onSubmit={handleSubmit}
          />
        )}
        {step === 'results' && result && (
          <Results result={result} onReset={handleReset} inputs={inputs as UserInputs} />
        )}
      </div>
    </div>
  )
}
