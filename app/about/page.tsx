import type { Metadata } from 'next'
import AdSlot from '@/components/AdSlot'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About This Calculator',
  description:
    'Learn how the Seed Oil Inflammation Risk Calculator works, the science behind it, and its limitations.',
}

export default function AboutPage() {
  return (
    <div
      className="max-w-content mx-auto px-4 py-8"
      style={{ maxWidth: '680px' }}
    >
      <h1 className="text-3xl font-bold mb-3" style={{ color: '#1c1917' }}>
        About This Calculator
      </h1>
      <p className="text-lg mb-10" style={{ color: '#57534e' }}>
        The Seed Oil Calculator is a free educational tool that estimates your
        personal omega-6:omega-3 ratio and inflammation risk score from simple
        lifestyle questions.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3" style={{ color: '#1c1917' }}>
          Why We Built This
        </h2>
        <p style={{ color: '#57534e' }}>
          Most people have a reasonable idea of how much sugar or saturated fat
          they eat. Almost nobody knows their omega-6 intake. Yet the
          omega-6:omega-3 ratio may be one of the most consequential — and most
          overlooked — metrics in modern nutrition.
        </p>
        <p className="mt-3" style={{ color: '#57534e' }}>
          In the space of a single generation, the average Western diet shifted
          from an omega-6:omega-3 ratio of roughly 4:1 to somewhere between
          15:1 and 25:1. The culprit is the near-universal adoption of
          industrial seed oils — vegetable oil, sunflower oil, soybean oil,
          corn oil — in home cooking, packaged food, and restaurant kitchens.
          These oils are cheap, shelf-stable, and high in linoleic acid
          (omega-6). We use them in everything.
        </p>
        <p className="mt-3" style={{ color: '#57534e' }}>
          The Seed Oil Calculator makes this invisible number visible. In under
          two minutes, you can get a personalised estimate of your omega-6
          intake, your omega-6:omega-3 ratio, and the three specific changes
          that would have the greatest impact on your ratio. We built it because
          no equivalent free tool existed.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3" style={{ color: '#1c1917' }}>
          The Science Behind the Numbers
        </h2>
        <p style={{ color: '#57534e' }}>
          Every figure in this calculator is drawn from published nutritional
          science. The three primary sources are:
        </p>
        <ul className="mt-3 space-y-3" style={{ color: '#57534e' }}>
          <li>
            <strong style={{ color: '#1c1917' }}>USDA FoodData Central</strong>{' '}
            — the most comprehensive public database of food composition in the
            world. We use it for the omega-6 (linoleic acid) content of all
            cooking oils, condiments, snack foods, and meat products in the
            model.
          </li>
          <li>
            <strong style={{ color: '#1c1917' }}>
              Simopoulos AP (2002), Biomedicine &amp; Pharmacotherapy
            </strong>{' '}
            — the landmark paper establishing the importance of the omega-6 to
            omega-3 ratio. Simopoulos documented that ancestral human diets
            maintained ratios of approximately 4:1, that the modern Western
            diet averages 15–17:1, and that lower ratios are associated with
            significantly reduced rates of cardiovascular disease, inflammatory
            conditions, and all-cause mortality.
          </li>
          <li>
            <strong style={{ color: '#1c1917' }}>
              WHO/FAO (2008), Dietary Fats and Fatty Acids in Human Nutrition
            </strong>{' '}
            — the World Health Organization and Food and Agriculture
            Organization expert consultation report, which provides recommended
            intake ranges for omega-6 and omega-3 fatty acids and endorses a
            target ratio of 4:1 or lower.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3" style={{ color: '#1c1917' }}>
          How the Calculation Works
        </h2>
        <p style={{ color: '#57534e' }}>
          The calculator estimates your daily omega-6 intake in grams by
          summing contributions from five sources:
        </p>
        <ol className="mt-3 space-y-2 list-decimal list-inside" style={{ color: '#57534e' }}>
          <li>
            <strong style={{ color: '#1c1917' }}>Cooking oil</strong> — the
            base omega-6 content of your primary cooking oil (from USDA),
            multiplied by a frequency factor based on how often you cook at
            home.
          </li>
          <li>
            <strong style={{ color: '#1c1917' }}>Sauces and dressings</strong>{' '}
            — bottled dressings and mayonnaise are almost always made from
            soybean oil, contributing 1.5–3.5g omega-6 per day for regular
            users.
          </li>
          <li>
            <strong style={{ color: '#1c1917' }}>Packaged snacks</strong> —
            crisps, crackers, and biscuits are typically fried or baked in
            vegetable oil, contributing 2–4g per day for daily consumers.
          </li>
          <li>
            <strong style={{ color: '#1c1917' }}>Takeaway and fast food</strong>{' '}
            — commercial deep fryers use high-omega-6 vegetable oil, adding
            1–6g per day depending on frequency.
          </li>
          <li>
            <strong style={{ color: '#1c1917' }}>Processed meat</strong> —
            commercially raised pork products (sausages, bacon, deli meats)
            have higher omega-6 content due to grain-based feed.
          </li>
        </ol>
        <p className="mt-4" style={{ color: '#57534e' }}>
          The total omega-6 figure is then adjusted by sex and age modifiers
          derived from USDA dietary intake surveys, which show that men and
          younger adults typically consume more calories — and therefore more
          omega-6 — than women and older adults.
        </p>
        <p className="mt-3" style={{ color: '#57534e' }}>
          Your omega-3 intake is estimated from oily fish consumption and
          supplement use. EPA and DHA from fish (sourced from USDA salmon data)
          and high-dose supplements are counted. ALA from plant sources is
          excluded due to its poor conversion rate to EPA/DHA in the body
          (approximately 5–15%).
        </p>
        <p className="mt-3" style={{ color: '#57534e' }}>
          The final ratio is omega-6 ÷ omega-3. Risk tiers follow the
          Simopoulos benchmarks: Optimal ≤4:1, Moderate 5–10:1, High 11–20:1,
          Very High &gt;20:1.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3" style={{ color: '#1c1917' }}>
          Limitations
        </h2>
        <p style={{ color: '#57534e' }}>
          This tool provides estimates, not measurements. Several important
          caveats:
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: '#57534e' }}>
          <li>
            Portion sizes vary significantly between individuals. We use
            population-average serving sizes from USDA data.
          </li>
          <li>
            Brand differences matter. The omega-6 content of &quot;vegetable
            oil&quot; varies by blend — some use primarily soybean oil, others
            sunflower or corn oil.
          </li>
          <li>
            We do not account for ALA (alpha-linolenic acid) from plant sources
            such as flaxseed, chia seeds, or walnuts, as the human conversion
            rate to EPA/DHA is too variable to model reliably.
          </li>
          <li>
            Individual metabolic variation exists. The FADS1 and FADS2 gene
            variants affect how efficiently people convert dietary fatty acids.
          </li>
          <li>
            The model covers the main dietary drivers of omega-6 intake but
            does not include every food source. Eggs, dairy, and certain nuts
            contribute smaller amounts not fully captured here.
          </li>
        </ul>
        <p className="mt-4" style={{ color: '#57534e' }}>
          For a precise measurement of your omega-3 status, consider an
          omega-3 index blood test, available from specialist nutrition
          laboratories.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3" style={{ color: '#1c1917' }}>
          About This Site
        </h2>
        <p style={{ color: '#57534e' }}>
          Seed Oil Calculator is an independent educational tool. We are not
          affiliated with any food brand, supplement company, or healthcare
          provider. The site is funded through Google AdSense advertising and
          Amazon Associates affiliate links on relevant product recommendations.
          Affiliate links are clearly disclosed and do not affect which products
          we mention.
        </p>
        <p className="mt-3" style={{ color: '#57534e' }}>
          This tool is for educational purposes only and does not constitute
          medical advice. If you have concerns about your diet or inflammatory
          health conditions, please consult a registered dietitian or healthcare
          professional.
        </p>
        <p className="mt-3" style={{ color: '#57534e' }}>
          Questions or corrections? Email{' '}
          <a
            href="mailto:contact@seedoilcalculator.com"
            style={{ color: '#ea580c' }}
          >
            contact@seedoilcalculator.com
          </a>
        </p>
      </section>

      <div className="mt-10">
        <AdSlot slot="6666666666" />
      </div>
    </div>
  )
}
