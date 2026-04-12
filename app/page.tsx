import type { Metadata } from 'next'
import Calculator from '@/components/Calculator'
import AdSlot from '@/components/AdSlot'
import SchemaMarkup, { websiteSchema, webAppSchema, faqSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Seed Oil Calculator — What Is Your Inflammation Risk?',
  description:
    'Find out how much seed oil you are really eating and what your omega-6:omega-3 ratio is. Free 6-question calculator. Takes under a minute.',
  alternates: { canonical: 'https://seedoilcalculator.com' },
}

export default function HomePage() {
  return (
    <>
      <SchemaMarkup schema={websiteSchema} />
      <SchemaMarkup schema={webAppSchema} />
      <SchemaMarkup schema={faqSchema} />

      <main style={{ backgroundColor: '#fafaf9', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

        {/* ── Hero ── */}
        <section style={{ backgroundColor: '#fff7ed', borderBottom: '1px solid #e7e5e4' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px 40px' }}>
            <h1
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: 800,
                color: '#1c1917',
                lineHeight: 1.15,
                marginBottom: '14px',
              }}
            >
              How Much Are Seed Oils Affecting Your Health?
            </h1>

            <p
              style={{
                fontSize: '1.125rem',
                fontWeight: 500,
                color: '#ea580c',
                lineHeight: 1.5,
                marginBottom: '20px',
              }}
            >
              Find out your personal inflammation risk in under 60 seconds
            </p>

            <p style={{ color: '#57534e', lineHeight: 1.8, marginBottom: '28px', fontSize: '1rem' }}>
              Most people have no idea that the cooking oils and packaged foods they eat every day
              may be quietly disrupting their body&rsquo;s inflammatory balance. Answer 6 simple
              questions about your diet and get an instant, personalised estimate of your
              omega-6:omega-3 ratio — plus a targeted action plan to improve it.
            </p>

            {/* Stat boxes */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                marginBottom: '32px',
              }}
            >
              {[
                { emoji: '🔥', value: '15–25:1', label: 'Average Western omega ratio' },
                { emoji: '🎯', value: '4:1',     label: 'The healthy target' },
                { emoji: '⏱️', value: '<1 min',  label: 'Time to complete' },
              ].map((stat) => (
                <div
                  key={stat.value}
                  style={{
                    flex: '1 1 160px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e7e5e4',
                    borderRadius: '12px',
                    padding: '18px 14px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{stat.emoji}</div>
                  <div
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: '#ea580c',
                      lineHeight: 1,
                      marginBottom: '6px',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#57534e', lineHeight: 1.4 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#1c1917',
                marginBottom: '10px',
              }}
            >
              Calculate Your Inflammation Risk
            </h2>
            <p style={{ color: '#57534e', lineHeight: 1.7, fontSize: '0.95rem' }}>
              Answer 6 questions about what you eat. No sign-up required. Nothing is stored.
              Your data never leaves your device.
            </p>
          </div>
        </section>

        {/* ── Ad above calculator ── */}
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '20px 24px 0' }}>
          <AdSlot slot="1111111111" format="leaderboard" />
        </div>

        {/* ── Calculator ── */}
        <div id="calculator" style={{ maxWidth: '680px', margin: '0 auto', padding: '20px 24px' }}>
          <Calculator />
        </div>

        {/* ── Below-calculator SEO content ── */}
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '8px 24px 64px' }}>

          {/* What Is Omega-6 vs Omega-3 Balance */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1c1917',
                marginBottom: '14px',
                paddingTop: '8px',
              }}
            >
              What Is Omega-6 vs Omega-3 Balance?
            </h2>
            <p style={{ color: '#57534e', lineHeight: 1.8, marginBottom: '14px' }}>
              Omega-6 and omega-3 are both polyunsaturated fatty acids your body needs — but they
              have opposite effects on inflammation. Omega-6 fats, found in high concentrations in
              seed oils like sunflower, corn, and soybean oil, promote the production of
              pro-inflammatory compounds. Omega-3 fats, found in oily fish, act as a natural
              counterbalance — producing anti-inflammatory signals that help regulate the immune
              response.
            </p>
            <p style={{ color: '#57534e', lineHeight: 1.8, marginBottom: '14px' }}>
              The key number is the ratio between them. Research by Dr Artemis Simopoulos
              (published in <em>Biomedicine &amp; Pharmacotherapy</em>, 2002) established that our
              ancestral diet maintained a ratio of approximately 1:1 to 4:1. A ratio at or below
              4:1 is associated with significantly reduced risk of cardiovascular disease,
              inflammatory conditions, and all-cause mortality.
            </p>
            <p style={{ color: '#57534e', lineHeight: 1.8 }}>
              The average Western diet today sits between 15:1 and 25:1 — reflecting a dramatic
              shift driven almost entirely by the rise of cheap seed oils in cooking and food
              manufacturing. The human body has not adapted to this change; it happened too fast.
            </p>
          </section>

          {/* Why Modern Diets Are Out of Balance */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1c1917',
                marginBottom: '14px',
              }}
            >
              Why Modern Diets Are Out of Balance
            </h2>
            <p style={{ color: '#57534e', lineHeight: 1.8, marginBottom: '14px' }}>
              Two changes explain almost all of the omega imbalance in Western diets: the rise of
              seed oils, and the decline of oily fish consumption.
            </p>
            <p style={{ color: '#57534e', lineHeight: 1.8, marginBottom: '14px' }}>
              Seed oils — sunflower, vegetable, corn, soybean, rapeseed — are now the dominant
              cooking fat in restaurants, food manufacturing, and many homes. They are cheap,
              shelf-stable, and high in linoleic acid (omega-6). A single tablespoon of sunflower
              oil delivers around 9 grams of omega-6. These oils appear in crisps, crackers,
              biscuits, ready meals, salad dressings, mayonnaise, takeaway food, and almost
              everything fried in a commercial kitchen.
            </p>
            <p style={{ color: '#57534e', lineHeight: 1.8 }}>
              At the same time, oily fish consumption — the primary dietary source of EPA and DHA
              omega-3 — has declined significantly. The result is a diet that floods the body with
              omega-6 while providing little omega-3 to balance it. The ratio tips, inflammatory
              pathways are chronically activated, and over years, this may contribute to conditions
              ranging from joint pain and fatigue to more serious cardiovascular and metabolic
              disease.
            </p>
          </section>

          {/* How This Calculator Works */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1c1917',
                marginBottom: '14px',
              }}
            >
              How This Calculator Works
            </h2>
            <p style={{ color: '#57534e', lineHeight: 1.8, marginBottom: '14px' }}>
              The Seed Oil Inflammation Risk Calculator estimates your daily omega-6 and omega-3
              intake from 6 questions about your diet. The three omega-6 drivers are: your main
              cooking fat, how often you eat takeaway or fast food, and how much packaged or
              processed food you consume. The three omega-3 factors are: oily fish frequency,
              omega-3 supplement use, and nuts and seeds intake.
            </p>
            <p style={{ color: '#57534e', lineHeight: 1.8, marginBottom: '14px' }}>
              Omega-6 values come from{' '}
              <strong>USDA FoodData Central</strong> — the most comprehensive public food
              composition database in the world. Risk thresholds are drawn from Simopoulos (2002)
              and WHO/FAO (2008) dietary guidelines. The result is an estimated ratio, a risk
              tier (Optimal / Moderate / High / Very High), and a personalised fix plan showing
              the top 3 changes that would have the greatest impact on your specific answers.
            </p>
            <p style={{ color: '#57534e', lineHeight: 1.8 }}>
              This tool provides estimates, not clinical measurements. Individual results vary
              based on actual portion sizes, food brands, and metabolism. Use it as a directional
              guide — and consult a dietitian if you have health concerns.
            </p>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1c1917',
                marginBottom: '20px',
              }}
            >
              Frequently Asked Questions
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                {
                  q: 'What is the ideal omega-6 to omega-3 ratio?',
                  a: 'Research recommends a ratio of 4:1 or lower (Simopoulos, 2002). Western diets average 15–25:1. A ratio below 4:1 is associated with significantly reduced cardiovascular mortality and lower levels of inflammatory biomarkers. Getting below 10:1 is a meaningful first milestone for most people.',
                },
                {
                  q: 'Which cooking oils are highest in omega-6?',
                  a: 'Sunflower, corn, soybean, and generic "vegetable" oils contain between 7 and 11 grams of omega-6 per tablespoon. Rapeseed/canola oil is lower at around 2.9g. Olive oil contains roughly 1.3g per tablespoon. Butter and ghee contain approximately 0.4g. Avocado oil is around 1.8g. Coconut oil contains virtually no polyunsaturated fat.',
                },
                {
                  q: 'Can seed oils cause inflammation?',
                  a: 'A high omega-6:omega-3 ratio — driven largely by seed oil consumption — is associated with increased production of pro-inflammatory compounds via the arachidonic acid pathway. Research consistently links high ratios to elevated inflammatory markers (CRP, IL-6) and increased risk of chronic inflammatory disease. The issue is the ratio relative to omega-3, not any inherent toxicity of seed oils in small amounts.',
                },
                {
                  q: 'What is the fastest way to improve my omega ratio?',
                  a: 'The two highest-impact changes are: (1) switch your primary cooking oil from seed oils to extra virgin olive oil — this alone can save 8–10g of omega-6 per day, and (2) eat oily fish (salmon, mackerel, sardines) 2–3 times per week or take a daily omega-3 supplement providing 1000mg+ EPA/DHA. These two changes combined can move many people from a 20:1 ratio to under 10:1.',
                },
              ].map((item) => (
                <div
                  key={item.q}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e7e5e4',
                    borderRadius: '12px',
                    padding: '20px 22px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#1c1917',
                      marginBottom: '10px',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.q}
                  </h3>
                  <p style={{ color: '#57534e', lineHeight: 1.75, fontSize: '0.95rem', margin: 0 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom AdSlot */}
          <AdSlot slot="2222222222" format="rectangle" />
        </div>
      </main>
    </>
  )
}
