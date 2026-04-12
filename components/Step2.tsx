'use client'

import type { UserInputs } from '@/lib/types'

interface Step2Props {
  inputs: Partial<UserInputs>
  onChange: (key: keyof UserInputs, value: string) => void
  onNext: () => void
  onBack: () => void
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

export default function Step2({ inputs, onChange, onNext, onBack }: Step2Props) {
  const allAnswered =
    inputs.snacks !== undefined &&
    inputs.takeaway !== undefined &&
    inputs.processedMeat !== undefined

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
        Packaged &amp; Processed Food
      </h2>
      <p style={{ color: '#78716c', fontSize: '14px', marginBottom: '28px' }}>
        Ultra-processed foods are a major hidden source of omega-6 seed oils.
      </p>

      {/* Q4 */}
      <div style={{ marginBottom: '28px' }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: '16px',
            color: '#1c1917',
            marginBottom: '12px',
          }}
        >
          4. How often do you eat crisps, biscuits, crackers or packaged snacks?
        </p>
        {(
          [
            ['daily', 'Daily or almost daily'],
            ['few_per_week', 'A few times per week'],
            ['occasionally', 'Occasionally (once a week or less)'],
            ['rarely_never', 'Rarely or never'],
          ] as [UserInputs['snacks'], string][]
        ).map(([value, label]) => (
          <RadioCard
            key={value}
            selected={inputs.snacks === value}
            onClick={() => onChange('snacks', value)}
          >
            {label}
          </RadioCard>
        ))}
      </div>

      {/* Q5 */}
      <div style={{ marginBottom: '28px' }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: '16px',
            color: '#1c1917',
            marginBottom: '12px',
          }}
        >
          5. How often do you eat takeaway, fast food or restaurant meals?
        </p>
        {(
          [
            ['5_plus_week', '5+ times per week'],
            ['2_to_4_week', '2–4 times per week'],
            ['once_week_less', 'Once a week or less'],
            ['very_rarely', 'Very rarely'],
          ] as [UserInputs['takeaway'], string][]
        ).map(([value, label]) => (
          <RadioCard
            key={value}
            selected={inputs.takeaway === value}
            onClick={() => onChange('takeaway', value)}
          >
            {label}
          </RadioCard>
        ))}
      </div>

      {/* Q6 */}
      <div style={{ marginBottom: '32px' }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: '16px',
            color: '#1c1917',
            marginBottom: '12px',
          }}
        >
          6. How often do you eat processed meats (sausages, bacon, deli meats, nuggets)?
        </p>
        {(
          [
            ['daily', 'Daily'],
            ['few_per_week', 'A few times per week'],
            ['occasionally', 'Occasionally'],
            ['rarely_never', 'Rarely or never'],
          ] as [UserInputs['processedMeat'], string][]
        ).map(([value, label]) => (
          <RadioCard
            key={value}
            selected={inputs.processedMeat === value}
            onClick={() => onChange('processedMeat', value)}
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
          onClick={onNext}
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
          Next →
        </button>
      </div>
    </div>
  )
}
