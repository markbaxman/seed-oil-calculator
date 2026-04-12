interface SchemaMarkupProps {
  schema: Record<string, unknown> | Record<string, unknown>[]
}

export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Seed Oil Calculator',
  url: 'https://seedoilcalculator.com',
  description:
    'Free calculator estimating personal omega-6:omega-3 ratio and dietary inflammation risk from lifestyle inputs.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://seedoilcalculator.com/blog?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Seed Oil Inflammation Risk Calculator',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Calculate your personal omega-6:omega-3 ratio and inflammation risk score based on your diet and lifestyle.',
  url: 'https://seedoilcalculator.com',
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the ideal omega-6 to omega-3 ratio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Research by Simopoulos (2002) recommends a ratio of 4:1 or lower. Modern Western diets average 15–25:1. Lower ratios are associated with reduced inflammation and better cardiovascular health.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which cooking oils are highest in omega-6?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sunflower, corn, soybean and vegetable oils are the highest — containing 7–11g of omega-6 per tablespoon. Olive oil, avocado oil, butter and ghee are much lower.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can seed oils cause inflammation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'High omega-6 intake relative to omega-3 promotes the production of pro-inflammatory compounds in the body. Research suggests that rebalancing the ratio toward 4:1 reduces inflammatory markers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I reduce my seed oil intake?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The biggest impact comes from switching your cooking oil to olive or avocado oil, avoiding packaged and fried foods, and increasing oily fish or omega-3 supplements.',
      },
    },
  ],
}
