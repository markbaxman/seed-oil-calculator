import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for Seed Oil Calculator — how we handle data, cookies, and third-party services.',
}

export default function PrivacyPage() {
  const lastUpdated = '12 April 2026'

  return (
    <div
      className="max-w-content mx-auto px-4 py-8"
      style={{ maxWidth: '680px' }}
    >
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#1c1917' }}>
        Privacy Policy
      </h1>
      <p className="text-sm mb-8" style={{ color: '#a8a29e' }}>
        Last updated: {lastUpdated}
      </p>

      <div className="space-y-8" style={{ color: '#57534e' }}>
        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            Overview
          </h2>
          <p>
            Seed Oil Calculator (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates
            seedoilcalculator.com. This policy explains what information we
            collect, how we use it, and your rights regarding your data.
          </p>
          <p className="mt-3">
            We are committed to protecting your privacy. This site is designed
            as a lightweight educational tool with minimal data collection.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            Calculator Data
          </h2>
          <p>
            <strong style={{ color: '#1c1917' }}>
              The calculator is entirely client-side.
            </strong>{' '}
            Your answers to the calculator questions are processed in your
            browser using JavaScript. No calculator inputs, results, or any
            personally identifiable information are transmitted to our servers,
            stored in a database, or retained after you close the page.
          </p>
          <p className="mt-3">
            We do not use localStorage or sessionStorage for calculator data.
            When you close or refresh the page, all calculator data is
            permanently discarded.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            Cookies and Tracking
          </h2>
          <h3 className="font-semibold mb-2" style={{ color: '#1c1917' }}>
            Google AdSense and DoubleClick
          </h3>
          <p>
            This site may display advertisements served by Google AdSense.
            Google uses cookies (including DoubleClick cookies) to serve
            relevant ads based on your browsing history. Google&apos;s use of
            advertising cookies enables it and its partners to serve ads based
            on your visit to this site and other sites on the internet.
          </p>
          <p className="mt-2">
            You may opt out of personalised advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ea580c' }}
            >
              Google Ads Settings
            </a>
            .
          </p>
          <h3 className="font-semibold mb-2 mt-4" style={{ color: '#1c1917' }}>
            Google Analytics
          </h3>
          <p>
            If enabled, this site uses Google Analytics to collect anonymised
            usage statistics including pages visited, time on site, and general
            geographic location (country level only). IP addresses are
            anonymised. This data helps us understand which content is most
            useful and improve the site. You can opt out via the{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ea580c' }}
            >
              Google Analytics opt-out browser add-on
            </a>
            .
          </p>
          <h3 className="font-semibold mb-2 mt-4" style={{ color: '#1c1917' }}>
            No Other Tracking Cookies
          </h3>
          <p>
            We do not use any additional first-party tracking cookies beyond
            those described above.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            Affiliate Links
          </h2>
          <p>
            This site participates in the Amazon Services LLC Associates
            Programme, an affiliate advertising programme designed to provide a
            means for us to earn fees by linking to Amazon.com and affiliated
            sites. When you click an affiliate link and make a purchase, we may
            receive a small commission at no additional cost to you.
          </p>
          <p className="mt-3">
            Affiliate links are clearly marked on the site. We only recommend
            products we believe are relevant and useful. Amazon may set its own
            cookies when you visit via an affiliate link; please refer to
            Amazon&apos;s privacy policy for details.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            Contact Form
          </h2>
          <p>
            If you submit a message via our contact form, your name, email
            address, and message are transmitted to Formspree (our form
            processing provider) and then forwarded to our email address. We
            use this information solely to respond to your enquiry. We do not
            add contact form submitters to mailing lists.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            Your Rights (GDPR)
          </h2>
          <p>
            If you are located in the European Economic Area (EEA) or the
            United Kingdom, you have the following rights under GDPR and UK
            GDPR:
          </p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            <li>
              <strong style={{ color: '#1c1917' }}>Right of access</strong> —
              you may request a copy of any personal data we hold about you.
            </li>
            <li>
              <strong style={{ color: '#1c1917' }}>Right to erasure</strong> —
              you may request deletion of your personal data (note: we hold
              virtually none).
            </li>
            <li>
              <strong style={{ color: '#1c1917' }}>Right to portability</strong>{' '}
              — you may request your data in a machine-readable format.
            </li>
            <li>
              <strong style={{ color: '#1c1917' }}>
                Right to object to processing
              </strong>{' '}
              — you may object to any data processing based on legitimate
              interest.
            </li>
            <li>
              <strong style={{ color: '#1c1917' }}>
                Right to withdraw consent
              </strong>{' '}
              — where processing is based on consent, you may withdraw it at
              any time.
            </li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, email{' '}
            <a
              href="mailto:contact@seedoilcalculator.com"
              style={{ color: '#ea580c' }}
            >
              contact@seedoilcalculator.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            Your Rights (CCPA — California)
          </h2>
          <p>
            California residents have the right to know what personal
            information is collected, the right to delete personal information,
            and the right to opt out of the sale of personal information. We do
            not sell personal information. For enquiries, email{' '}
            <a
              href="mailto:contact@seedoilcalculator.com"
              style={{ color: '#ea580c' }}
            >
              contact@seedoilcalculator.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. The &quot;last
            updated&quot; date at the top of this page reflects when the most
            recent changes were made. Continued use of the site after changes
            constitutes acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            Contact
          </h2>
          <p>
            For any privacy-related questions, email:{' '}
            <a
              href="mailto:contact@seedoilcalculator.com"
              style={{ color: '#ea580c' }}
            >
              contact@seedoilcalculator.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
