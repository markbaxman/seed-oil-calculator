'use client'

import type { UserInputs } from '@/lib/types'

interface Step1Props {
  inputs: Partial<UserInputs>
  onChange: (key: keyof UserInputs, value: string) => void
  onNext: () => void
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

export default function Step1({ inputs, onChange, onNext }: Step1Props) {
  const allAnswered =
    inputs.takeawayFreq !== undefined &&
    inputs.processedFood !== undefined &&
    inputs.cookingFat !== undefined

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
        Your Daily Habits
      </h2>
      <p style={{ color: '#78716c', fontSize: '14px', marginBottom: '28px' }}>
        3 quick questions about what you eat most days.
      </p>

      {/* Q1 — Takeaway */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{ fontWeight: 600, fontSize: '16px', color: '#1c1917', marginBottom: '12px' }}>
          1. How often do you eat takeaway or fast food?
        </p>
        {(
          [
            ['never', 'Never or very rarely'],
            ['1_to_2_week', '1–2 times a week'],
            ['3_to_5_week', '3–5 times a week'],
            ['daily', 'Daily or almost daily'],
          ] as [UserInputs['takeawayFreq'], string][]
        ).map(([value, label]) => (
          <RadioCard
            key={value}
            selected={inputs.takeawayFreq === value}
            onClick={() => onChange('takeawayFreq', value)}
            label={label}
          />
        ))}
      </div>

      {/* Q2 — Processed food */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{ fontWeight: 600, fontSize: '16px', color: '#1c1917', marginBottom: '12px' }}>
          2. How much packaged or processed food do you eat?
        </p>
        {(
          [
            ['mostly_fresh', 'Mostly fresh', 'Whole foods, home-cooked meals, minimal packaging'],
            ['some', 'Some packaged food', 'A mix of fresh and packaged — occasional crisps, ready meals'],
            ['mostly_packaged', 'Mostly packaged', 'Regular snacks, ready meals, processed foods'],
            ['almost_all', 'Almost all processed', 'Mostly packaged, takeaway, or ready-made food'],
          ] as [UserInputs['processedFood'], string, string][]
        ).map(([value, label, hint]) => (
          <RadioCard
            key={value}
            selected={inputs.processedFood === value}
            onClick={() => onChange('processedFood', value)}
            label={label}
            hint={hint}
          />
        ))}
      </div>

      {/* Q3 — Cooking fat */}
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontWeight: 600, fontSize: '16px', color: '#1c1917', marginBottom: '12px' }}>
          3. What do you mainly cook with?
        </p>
        {(
          [
            ['butter', 'Butter or ghee', 'Animal fats — low in omega-6'],
            ['olive_oil', 'Olive oil or avocado oil', 'Low omega-6, heart-healthy fats'],
            ['mixed', 'A mix of oils', 'Sometimes olive oil, sometimes others'],
            ['seed_oils', 'Vegetable or seed oils', 'Sunflower, corn, rapeseed, or "vegetable" oil'],
          ] as [UserInputs['cookingFat'], string, string][]
        ).map(([value, label, hint]) => (
          <RadioCard
            key={value}
            selected={inputs.cookingFat === value}
            onClick={() => onChange('cookingFat', value)}
            label={label}
            hint={hint}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!allAnswered}
        style={{
          width: '100%',
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
        Next: Protective Factors →
      </button>
    </div>
  )
}
