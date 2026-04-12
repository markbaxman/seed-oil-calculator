'use client'

import type { UserInputs } from '@/lib/types'

interface Step1Props {
  inputs: Partial<UserInputs>
  onChange: (key: keyof UserInputs, value: string) => void
  onNext: () => void
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

export default function Step1({ inputs, onChange, onNext }: Step1Props) {
  const allAnswered =
    inputs.cookingOil !== undefined &&
    inputs.cookingFreq !== undefined &&
    inputs.sauces !== undefined

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
        Cooking Oils &amp; Fats
      </h2>
      <p style={{ color: '#78716c', fontSize: '14px', marginBottom: '28px' }}>
        Your cooking oil is often the single biggest driver of omega-6 intake.
      </p>

      {/* Q1 */}
      <div style={{ marginBottom: '28px' }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: '16px',
            color: '#1c1917',
            marginBottom: '12px',
          }}
        >
          1. What oil do you mainly cook with?
        </p>
        {(
          [
            ['vegetable_sunflower_corn', 'Vegetable / sunflower / corn oil'],
            ['rapeseed_canola', 'Rapeseed / canola oil'],
            ['olive_coconut', 'Olive oil or coconut oil'],
            ['butter_ghee_animal', 'Butter, ghee or animal fats'],
            ['avocado_oil', 'Avocado oil'],
          ] as [UserInputs['cookingOil'], string][]
        ).map(([value, label]) => (
          <RadioCard
            key={value}
            selected={inputs.cookingOil === value}
            onClick={() => onChange('cookingOil', value)}
          >
            {label}
          </RadioCard>
        ))}
      </div>

      {/* Q2 */}
      <div style={{ marginBottom: '28px' }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: '16px',
            color: '#1c1917',
            marginBottom: '12px',
          }}
        >
          2. How often do you cook at home?
        </p>
        {(
          [
            ['most_meals', 'Most meals (5–7 days a week)'],
            ['sometimes', 'Sometimes (3–4 days a week)'],
            ['rarely', 'Rarely (1–2 days a week)'],
            ['hardly_ever', 'Hardly ever — mostly takeaways'],
          ] as [UserInputs['cookingFreq'], string][]
        ).map(([value, label]) => (
          <RadioCard
            key={value}
            selected={inputs.cookingFreq === value}
            onClick={() => onChange('cookingFreq', value)}
          >
            {label}
          </RadioCard>
        ))}
      </div>

      {/* Q3 */}
      <div style={{ marginBottom: '32px' }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: '16px',
            color: '#1c1917',
            marginBottom: '12px',
          }}
        >
          3. Which best describes your use of sauces, dressings and condiments?
        </p>
        {(
          [
            ['bottled_regularly', 'I use bottled dressings / mayo / ketchup regularly'],
            ['some_shop_bought', 'I use some shop-bought sauces occasionally'],
            ['mostly_homemade', 'I mostly use olive oil, vinegar or homemade dressings'],
            ['rarely', 'I rarely use dressings or sauces'],
          ] as [UserInputs['sauces'], string][]
        ).map(([value, label]) => (
          <RadioCard
            key={value}
            selected={inputs.sauces === value}
            onClick={() => onChange('sauces', value)}
          >
            {label}
          </RadioCard>
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
          fontWeight: 600,
          fontSize: '16px',
          cursor: allAnswered ? 'pointer' : 'not-allowed',
          transition: 'background-color 0.15s',
        }}
      >
        Next →
      </button>
    </div>
  )
}
