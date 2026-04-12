'use client'

import type { UserInputs } from '@/lib/types'

interface Step3Props {
  inputs: Partial<UserInputs>
  onChange: (key: keyof UserInputs, value: string) => void
  onBack: () => void
  onSubmit: () => void
}

interface RadioCardProps {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}

function RadioCard({ selected, onClick, children }: RadioCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        padding: '12px 16px',
        borderRadius: '8px',
        border: `2px solid ${selected ? '#ea580c' : '#e7e5e4'}`,
        backgroundColor: selected ? '#fff7ed' : '#ffffff',
        fontWeight: selected ? 500 : 400,
        color: '#1c1917',
        cursor: 'pointer',
        fontSize: '15px',
        lineHeight: '1.4',
        transition: 'border-color 0.15s, background-color 0.15s',
        marginBottom: '8px',
      }}
    >
      {children}
    </button>
  )
}

export default function Step3({ inputs, onChange, onBack, onSubmit }: Step3Props) {
  const allAnswered =
    inputs.oilyFish !== undefined &&
    inputs.omega3Supplement !== undefined &&
    inputs.age !== undefined &&
    inputs.sex !== undefined

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
        Omega-3 Sources &amp; You
      </h2>
      <p style={{ color: '#78716c', fontSize: '14px', marginBottom: '28px' }}>
        Your omega-3 intake determines how well your body can balance the omega-6 load.
      </p>

      {/* Q7 */}
      <div style={{ marginBottom: '28px' }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: '16px',
            color: '#1c1917',
            marginBottom: '12px',
          }}
        >
          7. How often do you eat oily fish (salmon, mackerel, sardines, herring, trout)?
        </p>
        {(
          [
            ['3_plus_week', '3+ times per week'],
            ['1_to_2_week', '1–2 times per week'],
            ['few_per_month', 'A few times per month'],
            ['rarely_never', 'Rarely or never'],
          ] as [UserInputs['oilyFish'], string][]
        ).map(([value, label]) => (
          <RadioCard
            key={value}
            selected={inputs.oilyFish === value}
            onClick={() => onChange('oilyFish', value)}
          >
            {label}
          </RadioCard>
        ))}
      </div>

      {/* Q8 */}
      <div style={{ marginBottom: '28px' }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: '16px',
            color: '#1c1917',
            marginBottom: '12px',
          }}
        >
          8. Do you take a fish oil or omega-3 supplement?
        </p>
        {(
          [
            ['daily_high_dose', 'Yes — daily (1000mg+ EPA/DHA)'],
            ['occasional_low', 'Yes — occasionally or low dose'],
            ['none', 'No'],
          ] as [UserInputs['omega3Supplement'], string][]
        ).map(([value, label]) => (
          <RadioCard
            key={value}
            selected={inputs.omega3Supplement === value}
            onClick={() => onChange('omega3Supplement', value)}
          >
            {label}
          </RadioCard>
        ))}
      </div>

      {/* Q9 */}
      <div style={{ marginBottom: '28px' }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: '16px',
            color: '#1c1917',
            marginBottom: '12px',
          }}
        >
          9. What is your age group?
        </p>
        {(
          [
            ['under_18', 'Under 18'],
            ['18_to_35', '18–35'],
            ['36_to_55', '36–55'],
            ['over_56', '56+'],
          ] as [UserInputs['age'], string][]
        ).map(([value, label]) => (
          <RadioCard
            key={value}
            selected={inputs.age === value}
            onClick={() => onChange('age', value)}
          >
            {label}
          </RadioCard>
        ))}
      </div>

      {/* Q10 */}
      <div style={{ marginBottom: '32px' }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: '16px',
            color: '#1c1917',
            marginBottom: '4px',
          }}
        >
          10. What is your biological sex?
        </p>
        <p style={{ fontSize: '13px', color: '#a8a29e', marginBottom: '12px' }}>
          (Used only for metabolic adjustment)
        </p>
        {(
          [
            ['male', 'Male'],
            ['female', 'Female'],
            ['prefer_not', 'Prefer not to say'],
          ] as [UserInputs['sex'], string][]
        ).map(([value, label]) => (
          <RadioCard
            key={value}
            selected={inputs.sex === value}
            onClick={() => onChange('sex', value)}
          >
            {label}
          </RadioCard>
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
            fontWeight: 600,
            fontSize: '16px',
            cursor: allAnswered ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.15s',
          }}
        >
          Calculate My Inflammation Risk →
        </button>
      </div>
    </div>
  )
}
