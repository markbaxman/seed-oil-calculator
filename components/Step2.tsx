'use client'

import type { UserInputs } from '@/lib/types'

interface Step2Props {
  inputs: Partial<UserInputs>
  onChange: (key: keyof UserInputs, value: string) => void
  onBack: () => void
  onSubmit: () => void
}

function RadioCard({
  selected,
  onClick,
  label,
  hint,
}: {
  selected: boolean
  onClick: () => void
  label: string
  hint?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        padding: '13px 16px',
        borderRadius: '8px',
        border: `2px solid ${selected ? '#ea580c' : '#e7e5e4'}`,
        backgroundColor: selected ? '#fff7ed' : '#ffffff',
        color: '#1c1917',
        cursor: 'pointer',
        fontSize: '15px',
        lineHeight: '1.4',
        transition: 'border-color 0.15s, background-color 0.15s',
        marginBottom: '8px',
      }}
    >
      <span style={{ fontWeight: selected ? 600 : 400 }}>{label}</span>
      {hint && (
        <span style={{ display: 'block', fontSize: '12px', color: '#78716c', marginTop: '2px', fontWeight: 400 }}>
          {hint}
        </span>
      )}
    </button>
  )
}

export default function Step2({ inputs, onChange, onBack, onSubmit }: Step2Props) {
  const allAnswered =
    inputs.oilyFish !== undefined &&
    inputs.omega3Supp !== undefined &&
    inputs.nutsSeeds !== undefined

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
      <h2
        style={{
          fontSize: '22px',
          fontWeight: 700,
          color: '#1c1917',
          marginBottom: '4px',
          marginTop: '8px',
        }}
      >
        Your Protective Factors
      </h2>
      <p style={{ color: '#78716c', fontSize: '14px', marginBottom: '28px' }}>
        These foods help balance your omega-6 intake with anti-inflammatory omega-3.
      </p>

      {/* Q4 — Oily fish */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{ fontWeight: 600, fontSize: '16px', color: '#1c1917', marginBottom: '12px' }}>
          4. How often do you eat oily fish?
        </p>
        <p style={{ fontSize: '13px', color: '#a8a29e', marginBottom: '10px' }}>
          Salmon, mackerel, sardines, herring, trout
        </p>
        {(
          [
            ['never', 'Never or very rarely'],
            ['1_week', 'About once a week'],
            ['2_to_3_week', '2–3 times a week'],
            ['4_plus', '4 or more times a week'],
          ] as [UserInputs['oilyFish'], string][]
        ).map(([value, label]) => (
          <RadioCard
            key={value}
            selected={inputs.oilyFish === value}
            onClick={() => onChange('oilyFish', value)}
            label={label}
          />
        ))}
      </div>

      {/* Q5 — Omega-3 supplement */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{ fontWeight: 600, fontSize: '16px', color: '#1c1917', marginBottom: '12px' }}>
          5. Do you take omega-3 supplements?
        </p>
        {(
          [
            ['no', 'No', 'I don\'t take fish oil or omega-3 capsules'],
            ['occasionally', 'Occasionally or low dose', 'Sometimes, or less than 500mg EPA/DHA'],
            ['daily', 'Yes, daily', '1000mg+ EPA/DHA every day'],
          ] as [UserInputs['omega3Supp'], string, string][]
        ).map(([value, label, hint]) => (
          <RadioCard
            key={value}
            selected={inputs.omega3Supp === value}
            onClick={() => onChange('omega3Supp', value)}
            label={label}
            hint={hint}
          />
        ))}
      </div>

      {/* Q6 — Nuts & seeds */}
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontWeight: 600, fontSize: '16px', color: '#1c1917', marginBottom: '12px' }}>
          6. How often do you eat nuts and seeds?
        </p>
        <p style={{ fontSize: '13px', color: '#a8a29e', marginBottom: '10px' }}>
          Walnuts, chia seeds, flaxseeds are especially high in omega-3
        </p>
        {(
          [
            ['rarely', 'Rarely or never'],
            ['moderate', 'A few times a week'],
            ['high', 'Daily or most days'],
          ] as [UserInputs['nutsSeeds'], string][]
        ).map(([value, label]) => (
          <RadioCard
            key={value}
            selected={inputs.nutsSeeds === value}
            onClick={() => onChange('nutsSeeds', value)}
            label={label}
          />
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            flex: '0 0 auto',
            padding: '14px 20px',
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
          ← Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!allAnswered}
          style={{
            flex: 1,
            padding: '14px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: allAnswered ? '#ea580c' : '#d6d3d1',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '16px',
            cursor: allAnswered ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.15s',
            letterSpacing: '0.01em',
          }}
        >
          Calculate My Inflammation Risk →
        </button>
      </div>
    </div>
  )
}
