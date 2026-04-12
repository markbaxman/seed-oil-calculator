import type { Metadata } from 'next'
import Calculator from '@/components/Calculator'
import AdSlot from '@/components/AdSlot'
import SchemaMarkup, { websiteSchema, webAppSchema, faqSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Seed Oil Calculator — What Is Your Inflammation Risk?',
  description:
    'Find out how much seed oil you are really eating and what your omega-6:omega-3 ratio is. Free calculator based on USDA food data and published nutrition science. Takes 2 minutes.',
  alternates: { canonical: 'https://seedoilcalculator.com' },
}

export default function HomePage() {
  return (
    <>
      <SchemaMarkup schema={websiteSchema} />
      <SchemaMarkup schema={webAppSchema} />
      <SchemaMarkup schema={faqSchema} />

      <main style={{ backgroundColor: '#fafaf9', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {/* ── Above-calculator section ── */}
        <section style={{ backgroundColor: '#fff7ed', borderBottom: '1px solid #e7e5e4' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px 40px' }}>
            <h1
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: 800,
                color: '#1c1917',
                lineHeight: 1.15,
                marginBottom: '16px',
              }}
            >
              What&rsquo;s Your Inflammation Risk Score?
            </h1>

            <p
              style={{
                fontSize: '1.2rem',
                fontWeight: 500,
                color: '#ea580c',
                lineHeight: 1.4,
                marginBottom: '24px',
              }}
            >
              Find out how much seed oil you&rsquo;re really eating &mdash; and what it&rsquo;s doing to your body
            </p>

            <p style={{ color: '#57534e', lineHeight: 1.75, marginBottom: '32px', fontSize: '1rem' }}>
              Most people have no idea that the balance of omega-6 to omega-3 fatty acids in their diet could be
              silently driving inflammation. The average Western diet delivers an omega-6:omega-3 ratio somewhere
              between 15:1 and 25:1 — a staggering distance from the 4:1 ratio that nutrition researchers consider
              healthy. This imbalance is not trivial. Decades of peer-reviewed research link chronically elevated
              omega-6 intake — driven largely by seed oils such as sunflower, corn, soybean, and vegetable oil —
              to systemic inflammation, increased cardiovascular disease risk, joint pain, insulin resistance, and
              impaired immune function. The problem is not fat itself. The problem is ratio. When omega-6 floods
              the body without adequate omega-3 to balance it, cells produce an excess of pro-inflammatory
              compounds called eicosanoids. Understanding where you sit on that spectrum is the first step to
              making meaningful changes.
            </p>

            {/* Stat boxes */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                marginBottom: '36px',
              }}
            >
              {[
                {
                  emoji: '🔥',
                  value: '15–25:1',
                  label: 'Average Western omega-6:omega-3 ratio',
                },
                {
                  emoji: '🎯',
                  value: '4:1',
                  label: 'The healthy target ratio',
                },
                {
                  emoji: '📉',
                  value: '90%+',
                  label: 'Of people exceed the safe threshold',
                },
              ].map((stat) => (
                <div
                  key={stat.value}
                  style={{
                    flex: '1 1 180px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e7e5e4',
                    borderRadius: '12px',
                    padding: '20px 16px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{stat.emoji}</div>
                  <div
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: 800,
                      color: '#ea580c',
                      lineHeight: 1,
                      marginBottom: '8px',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#57534e', lineHeight: 1.4 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <h2
              style={{
                fontSize: '1.375rem',
                fontWeight: 700,
                color: '#1c1917',
                marginBottom: '12px',
              }}
            >
              Calculate Your Personal Inflammation Risk
            </h2>

            <p style={{ color: '#57534e', lineHeight: 1.7, fontSize: '1rem' }}>
              Answer 10 quick questions about what you eat and how often — it takes under two minutes.
              The calculator uses USDA FoodData Central omega-6 values and published ratio benchmarks from
              Simopoulos (2002) to estimate your personal omega-6:omega-3 ratio and flag whether your diet
              puts you in a low, moderate, or high inflammation risk band. No sign-up required. Nothing is
              stored. Your data never leaves your device.
            </p>
          </div>
        </section>

        {/* ── Ad above calculator ── */}
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '24px 24px 0' }}>
          <AdSlot slot="1111111111" format="leaderboard" />
        </div>

        {/* ── Calculator ── */}
        <div id="calculator" style={{ maxWidth: '680px', margin: '0 auto', padding: '24px' }}>
          <Calculator />
        </div>

        {/* ── Below-calculator content ── */}
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '16px 24px 64px' }}>

          {/* What Are Seed Oils */}
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
              What Are Seed Oils?
            </h2>
            <p style={{ color: '#57534e', lineHeight: 1.8, marginBottom: '14px' }}>
              Seed oils are refined vegetable oils extracted from the seeds of plants — including sunflower,
              soybean, corn, rapeseed (canola), cottonseed, safflower, and generic &ldquo;vegetable oil&rdquo;
              blends. What they all have in common is a very high concentration of omega-6 polyunsaturated
              fatty acids (PUFAs), particularly linoleic acid. A single tablespoon of sunflower oil delivers
              around 8.9 grams of omega-6. Soybean oil contains about 6.9 grams per tablespoon. Corn oil
              provides roughly 7.3 grams — all far higher than the omega-6 content of butter (0.4 g),
              olive oil (1.3 g), or avocado oil (1.8 g).
            </p>
            <p style={{ color: '#57534e', lineHeight: 1.8, marginBottom: '14px' }}>
              These oils barely existed in the human food supply before the 20th century. Industrial seed oil
              production scaled dramatically after World War II, coinciding with advice to reduce saturated fat
              and the rise of processed food manufacturing. By the 1970s and 80s, seed oils had replaced
              animal fats in homes, restaurants, and food factories across the developed world. Today they are
              ubiquitous: present in crisps, biscuits, ready meals, salad dressings, hummus, protein bars,
              takeaway food, and almost every product fried in a commercial kitchen. This rapid dietary shift
              happened over decades, not centuries — far too fast for human metabolism to adapt.
            </p>
            <p style={{ color: '#57534e', lineHeight: 1.8 }}>
              The scale of exposure is the issue. Linoleic acid (the primary omega-6 in seed oils) now makes
              up an estimated 8–10% of total calorie intake in Western diets, up from less than 2% in 1900.
              This matters because omega-6 and omega-3 fatty acids compete for the same enzymes in the body.
              When omega-6 dominates, it wins — producing inflammatory compounds and crowding out the
              anti-inflammatory signals that omega-3 provides.
            </p>
          </section>

          {/* Why the Ratio Matters */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1c1917',
                marginBottom: '14px',
              }}
            >
              Why the Omega-6:Omega-3 Ratio Matters
            </h2>
            <p style={{ color: '#57534e', lineHeight: 1.8, marginBottom: '14px' }}>
              The omega-6:omega-3 ratio is one of the most studied — and most overlooked — variables in
              nutrition science. Research by Dr Artemis Simopoulos, published in the journal{' '}
              <em>Biomedicine &amp; Pharmacotherapy</em> (2002), established the foundational understanding
              that our hunter-gatherer ancestors evolved on a ratio close to 1:1, and that the human genome
              is adapted to that balance. A ratio of 4:1 or lower is associated with reduced cardiovascular
              mortality, lower markers of systemic inflammation, and improved mental health outcomes. A ratio
              above 15:1 — typical of Western diets — correlates with increased risk of heart disease,
              colorectal cancer, and inflammatory conditions such as rheumatoid arthritis.
            </p>
            <p style={{ color: '#57534e', lineHeight: 1.8, marginBottom: '14px' }}>
              What makes the ratio critical is the competition at the enzymatic level. Omega-6 and omega-3
              PUFAs are both converted by the same enzymes (delta-6 desaturase and delta-5 desaturase) into
              longer-chain fatty acids. When omega-6 overwhelms the system, it monopolises these enzymes,
              producing arachidonic acid — a precursor to pro-inflammatory prostaglandins and leukotrienes.
              Omega-3, particularly EPA and DHA from oily fish, competes for the same pathway and produces
              resolvins and protectins that actively dampen inflammation.
            </p>
            <p style={{ color: '#57534e', lineHeight: 1.8 }}>
              Critically, it is not the absolute amount of omega-6 that determines risk — it is the ratio.
              You can consume large amounts of omega-6 and remain healthy if you also consume proportionally
              high omega-3. The problem in the Western diet is that omega-3 intake has not kept pace with the
              explosion in omega-6 from seed oils. Most people are eating far less oily fish, and far more
              processed food, than any previous generation. The result is a ratio that chronically tips the
              body towards inflammation.
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
              The Seed Oil Calculator uses a frequency-weighted model based on published food composition
              data and dietary ratio benchmarks. Omega-6 values for each food category come from the{' '}
              <strong>USDA FoodData Central</strong> database — the most comprehensive publicly available
              nutritional dataset. Ratio targets and risk thresholds are drawn from Simopoulos (2002) and
              WHO/FAO (2008) dietary fat guidelines, which recommend limiting omega-6 to omega-3 ratios and
              increasing long-chain omega-3 intake to at least 500 mg per day for adults.
            </p>
            <p style={{ color: '#57534e', lineHeight: 1.8 }}>
              The model multiplies a typical serving omega-6 value by your reported weekly frequency for each
              food category — cooking oils, sauces and dressings, packaged snacks, takeaway and fast food,
              and processed meat products. Omega-3 is estimated separately from oily fish consumption and
              supplement use. The two totals are divided to produce an estimated ratio. The result is a
              snapshot estimate using population-average portion sizes; individual results will vary based on
              actual portion sizes, specific brands, and food preparation methods. Use it as a directional
              guide, not a clinical measurement.
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
                  a: 'Research by Simopoulos (2002) recommends a ratio of 4:1 or lower. Modern Western diets average 15–25:1. Lower ratios are consistently associated with reduced inflammation, better cardiovascular health, and improved mental wellbeing. A ratio below 4:1 has been shown to reduce all-cause cardiovascular mortality by 70% in secondary prevention trials.',
                },
                {
                  q: 'Which oils are highest in omega-6?',
                  a: 'Sunflower, corn, soybean, and standard vegetable oils contain between 7 and 11 grams of omega-6 per tablespoon — making them the largest single contributors to omega-6 overload in the Western diet. Olive oil contains around 1.3 grams per tablespoon, avocado oil approximately 1.8 grams, butter roughly 0.4 grams, and ghee is similar to butter. Coconut oil contains virtually no polyunsaturated fat at all.',
                },
                {
                  q: 'Can seed oils cause inflammation?',
                  a: 'High omega-6 intake relative to omega-3 promotes the production of pro-inflammatory compounds (eicosanoids, prostaglandins, leukotrienes) via the arachidonic acid pathway. Research consistently links a high omega-6:omega-3 ratio to elevated inflammatory biomarkers including CRP, IL-6, and TNF-alpha, and to increased risk of chronic inflammatory diseases. This does not mean seed oils are toxic in small amounts — the issue is the ratio, not any inherent toxicity.',
                },
                {
                  q: 'How do I reduce my seed oil intake?',
                  a: "Switch your primary cooking oil to extra-virgin olive oil or avocado oil, which are low in omega-6 and stable at cooking temperatures. Avoid packaged snacks, crisps, and biscuits — almost all use seed oils. Be wary of bottled salad dressings, mayonnaise, and sauces. Reduce takeaway and fast food, where seed oils are universal. Increase oily fish (salmon, mackerel, sardines) to two portions per week or more. Consider an EPA/DHA omega-3 supplement if your fish intake is low.",
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
