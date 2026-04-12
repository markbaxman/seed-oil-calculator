import type { Metadata } from 'next'
import AdSlot from '@/components/AdSlot'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Reduce Seed Oils From Your Diet',
  description:
    'Practical guide to reducing seed oil intake with ranked actions by omega-6 savings, hidden sources, and what to eat instead.',
}

export default function ReducePage() {
  return (
    <div
      className="max-w-content mx-auto px-4 py-8"
      style={{ maxWidth: '680px' }}
    >
      <h1 className="text-3xl font-bold mb-3" style={{ color: '#1c1917' }}>
        How to Reduce Seed Oils From Your Diet
      </h1>
      <p className="text-lg mb-10" style={{ color: '#57534e' }}>
        You don&apos;t need to overhaul your entire diet. A handful of targeted
        swaps can cut your omega-6 intake dramatically — here&apos;s what to
        prioritise.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1c1917' }}>
          Ranked by Impact: What to Change First
        </h2>
        <p className="mb-6" style={{ color: '#57534e' }}>
          Not all changes are equal. These seven actions are ranked by their
          estimated omega-6 saving per day, based on USDA food composition data.
        </p>

        <div className="space-y-5">
          {[
            {
              num: '1',
              title: 'Switch your cooking oil',
              saving: 'saves 8–10g omega-6/day',
              body: 'This is the single biggest change you can make. If you currently cook with vegetable oil, sunflower oil, or corn oil, switching to extra virgin olive oil or avocado oil eliminates up to 10g of omega-6 per tablespoon used. Olive oil contains just 0.8g omega-6 per tablespoon versus 9–11g in sunflower oil. For everyday cooking, olive oil (smoke point ~200°C) handles sautéing, roasting, and dressings. For high-heat cooking, avocado oil (smoke point ~270°C) is ideal.',
            },
            {
              num: '2',
              title: 'Cut packaged snacks',
              saving: 'saves 2–4g omega-6/day',
              body: 'Crisps, crackers, biscuits, and most packaged savoury snacks are fried or baked in vegetable oil. Daily snackers can easily consume 4g of omega-6 from snacks alone. Replace with: nuts (walnuts have omega-3), fresh fruit, plain yoghurt, cheese, boiled eggs, or rice cakes made with olive oil.',
            },
            {
              num: '3',
              title: 'Reduce takeaway and fast food',
              saving: 'saves 1–6g omega-6/day',
              body: 'Commercial deep fryers operate at 180°C using high-capacity vegetable oil. Every portion of fried chicken, chips, or battered fish absorbs significant omega-6. Cutting from 5+ takeaways per week to 1–2 saves roughly 4–5g omega-6 daily. When you do eat out, choose grilled, baked, or steamed dishes. Ask restaurants what oil they use — some now use olive or avocado oil.',
            },
            {
              num: '4',
              title: 'Replace bottled dressings and sauces',
              saving: 'saves 1.5–3.5g omega-6/day',
              body: 'Bottled salad dressings, mayonnaise, and many ready-made sauces are made with soybean oil — containing 3.5g omega-6 per tablespoon. Make your own: combine extra virgin olive oil with apple cider vinegar or lemon juice, a pinch of salt, and mustard. Takes 30 seconds. For mayonnaise, olive oil mayo is widely available in supermarkets as a direct swap.',
            },
            {
              num: '5',
              title: 'Increase oily fish',
              saving: 'adds 0.6–1.4g omega-3/day',
              body: 'Eating oily fish 2–3 times per week directly improves your omega-3:omega-6 ratio by raising the denominator. Salmon, mackerel, sardines, herring, and trout are all high in EPA and DHA — the active forms of omega-3. A 100g serving of salmon provides approximately 2.2g EPA+DHA. Canned sardines and mackerel are affordable options with identical nutritional profiles to fresh.',
            },
            {
              num: '6',
              title: 'Take an omega-3 supplement',
              saving: 'adds 0.3–1g omega-3/day',
              body: 'A daily fish oil supplement providing 1000mg+ EPA+DHA raises your omega-3 baseline directly. Look for supplements in triglyceride form (better absorbed) and check that the EPA+DHA content — not total fish oil — meets 1000mg. Take with a meal containing fat for best absorption. This is particularly important if you rarely eat oily fish.',
            },
            {
              num: '7',
              title: 'Read ingredient labels',
              saving: 'prevents hidden omega-6 accumulation',
              body: 'Once you know what to look for, label reading takes seconds. Scan the ingredients list for: vegetable oil, sunflower oil, soybean oil, corn oil, rapeseed oil. These appear in unexpected products including bread, cereal, protein bars, hummus, pesto, and frozen meals. Products listing olive oil or avocado oil are usually better choices — though verify it\'s the primary oil used, not listed last.',
            },
          ].map((item) => (
            <div
              key={item.num}
              className="rounded-xl border p-5"
              style={{ backgroundColor: '#ffffff', borderColor: '#e7e5e4' }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: '#ea580c' }}
                >
                  {item.num}
                </span>
                <div>
                  <h3
                    className="font-semibold text-base mb-0.5"
                    style={{ color: '#1c1917' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs font-medium mb-2"
                    style={{ color: '#ea580c' }}
                  >
                    {item.saving}
                  </p>
                  <p className="text-sm" style={{ color: '#57534e' }}>
                    {item.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3" style={{ color: '#1c1917' }}>
          Hidden Sources of Seed Oils
        </h2>
        <p className="mb-4" style={{ color: '#57534e' }}>
          Many &quot;healthy&quot; foods contain seed oils that people don&apos;t expect.
          Check the labels on:
        </p>
        <ul className="space-y-2" style={{ color: '#57534e' }}>
          {[
            'Hummus — most supermarket brands use sunflower oil, not olive oil',
            'Protein bars and energy bars — vegetable or sunflower oil is a common filler',
            'Granola and muesli — often coated in sunflower or rapeseed oil',
            '"Healthy" cereals — seed oils used in processing and coating',
            'Restaurant salads — house dressings almost always use soybean or sunflower oil',
            'Baby food pouches — some contain refined vegetable oils',
            'Pesto — many commercial pestos use sunflower oil instead of olive oil',
            'Bread and wraps — vegetable oil is a common ingredient',
            'Frozen ready meals — even "balanced" meal options often contain seed oils',
            'Takeaway sauces — garlic sauce, chilli sauce, and dips are typically soybean oil based',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span style={{ color: '#ea580c', flexShrink: 0 }}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3" style={{ color: '#1c1917' }}>
          Best Oil Swaps
        </h2>
        <div className="overflow-x-auto">
          <table
            className="w-full text-sm border-collapse"
            style={{ color: '#57534e' }}
          >
            <thead>
              <tr
                className="text-left text-xs uppercase"
                style={{ backgroundColor: '#fafaf9', color: '#a8a29e' }}
              >
                <th className="py-2 px-3 font-medium">Replace</th>
                <th className="py-2 px-3 font-medium">With</th>
                <th className="py-2 px-3 font-medium">Omega-6 saving/tbsp</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Sunflower oil (9g/tbsp)', 'Extra virgin olive oil', '~8.2g'],
                ['Corn oil (7.3g/tbsp)', 'Avocado oil', '~6.1g'],
                ['Vegetable oil (7g/tbsp)', 'Extra virgin olive oil', '~6.2g'],
                ['Rapeseed oil (2.9g/tbsp)', 'Olive oil', '~2.1g'],
                ['Bottled dressing (3.5g/tbsp)', 'Olive oil + vinegar', '~3.2g'],
              ].map(([from, to, saving], i) => (
                <tr
                  key={i}
                  style={{ borderTop: '1px solid #e7e5e4' }}
                >
                  <td className="py-2.5 px-3">{from}</td>
                  <td className="py-2.5 px-3 font-medium" style={{ color: '#1c1917' }}>
                    {to}
                  </td>
                  <td className="py-2.5 px-3 font-semibold" style={{ color: '#16a34a' }}>
                    {saving}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3" style={{ color: '#1c1917' }}>
          The Goal — You Don&apos;t Need to Be Perfect
        </h2>
        <p style={{ color: '#57534e' }}>
          The target ratio is 4:1, but the realistic first milestone is getting
          below 10:1. Research by Simopoulos (2002) shows meaningful reductions
          in inflammatory markers at ratios of 5:1, and significant
          cardiovascular benefit at 4:1 compared to the typical Western average
          of 15–25:1.
        </p>
        <p className="mt-3" style={{ color: '#57534e' }}>
          If you currently cook with vegetable oil and eat packaged snacks
          daily, simply switching to olive oil and cutting snacks to 3× per
          week could move your ratio from 20:1 to 10:1 or better. That is a
          substantial improvement achieved with just two changes.
        </p>
        <p className="mt-3" style={{ color: '#57534e' }}>
          Consistency matters more than perfection. A diet that averages 6:1
          every day is far better than one that oscillates between perfect days
          and days of heavy seed oil consumption.
        </p>
      </section>

      <div
        className="rounded-xl p-6 mb-10 text-center"
        style={{ backgroundColor: '#fff7ed', border: '1px solid #fed7aa' }}
      >
        <h3 className="text-xl font-bold mb-2" style={{ color: '#1c1917' }}>
          Find Out Your Current Ratio
        </h3>
        <p className="text-sm mb-4" style={{ color: '#57534e' }}>
          Use the free calculator to see where you are starting from before
          making changes.
        </p>
        <Link
          href="/#calculator"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white"
          style={{ backgroundColor: '#ea580c' }}
        >
          Calculate My Current Ratio →
        </Link>
      </div>

      <div className="mt-10">
        <AdSlot slot="7777777777" format="leaderboard" />
      </div>
    </div>
  )
}
