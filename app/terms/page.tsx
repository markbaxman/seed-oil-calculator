import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for Seed Oil Calculator.',
}

export default function TermsPage() {
  const lastUpdated = '12 April 2026'

  return (
    <div
      className="max-w-content mx-auto px-4 py-8"
      style={{ maxWidth: '680px' }}
    >
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#1c1917' }}>
        Terms of Use
      </h1>
      <p className="text-sm mb-8" style={{ color: '#a8a29e' }}>
        Last updated: {lastUpdated}
      </p>

      <div className="space-y-8" style={{ color: '#57534e' }}>
        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using seedoilcalculator.com (&quot;the Site&quot;),
            you agree to be bound by these Terms of Use. If you do not agree,
            please do not use the Site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            2. Educational Use Only — Not Medical Advice
          </h2>
          <p>
            The Seed Oil Calculator and all content on this Site are provided
            for educational and informational purposes only.{' '}
            <strong style={{ color: '#1c1917' }}>
              Nothing on this Site constitutes medical advice, diagnosis, or
              treatment.
            </strong>
          </p>
          <p className="mt-3">
            The calculator estimates are based on published population-level
            nutritional data and are not a substitute for professional dietary
            assessment. Individual omega-6 and omega-3 intake varies
            significantly based on portion sizes, food brands, preparation
            methods, and individual metabolism. Always consult a qualified
            healthcare professional or registered dietitian before making
            significant changes to your diet, particularly if you have an
            existing medical condition.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            3. Accuracy and Limitations
          </h2>
          <p>
            While we make every effort to ensure the information and
            calculations on this Site are accurate and based on current
            published research, we make no warranties regarding accuracy,
            completeness, or fitness for any particular purpose. The
            omega-6:omega-3 estimates provided are approximations based on
            average food composition data (USDA FoodData Central) and
            published research (Simopoulos 2002, WHO/FAO 2008).
          </p>
          <p className="mt-3">
            Nutritional science evolves, and figures that are accurate today
            may require revision as new research emerges. We endeavour to keep
            the content current but cannot guarantee this at all times.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            4. Affiliate Disclosure
          </h2>
          <p>
            This Site participates in the Amazon Services LLC Associates
            Programme. Some links on this Site are affiliate links. When you
            click an affiliate link and make a qualifying purchase, we may earn
            a small commission at no additional cost to you.
          </p>
          <p className="mt-3">
            Affiliate links are clearly disclosed where they appear. Our
            editorial recommendations are not influenced by affiliate
            relationships — we only recommend products we believe are relevant
            to users seeking to improve their omega-6:omega-3 ratio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            5. Advertising
          </h2>
          <p>
            This Site displays advertisements served by Google AdSense. We do
            not control the content of these advertisements. The presence of an
            advertisement does not constitute endorsement of the advertised
            product or service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            6. Intellectual Property
          </h2>
          <p>
            All content on this Site — including text, calculation logic,
            design elements, and blog posts — is owned by Seed Oil Calculator
            unless otherwise stated. You may share links to this content and
            quote brief excerpts (with attribution and a link back), but you
            may not reproduce or republish full articles or the calculator
            without permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            7. Disclaimer of Warranties
          </h2>
          <p>
            This Site is provided &quot;as is&quot; without warranties of any kind,
            whether express or implied, including but not limited to implied
            warranties of merchantability, fitness for a particular purpose,
            and non-infringement. We do not warrant that the Site will be
            uninterrupted, error-free, or free of viruses or other harmful
            components.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            8. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, Seed Oil
            Calculator shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages arising out of your
            use of — or inability to use — the Site or its content, including
            any decisions made based on calculator results or blog post
            information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            9. Third-Party Links
          </h2>
          <p>
            This Site may contain links to third-party websites (including
            Amazon, academic papers, and other resources). These links are
            provided for convenience and informational purposes only. We have
            no control over the content of third-party sites and accept no
            responsibility for them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            10. Changes to These Terms
          </h2>
          <p>
            We reserve the right to modify these Terms of Use at any time. The
            &quot;last updated&quot; date at the top of this page will reflect any
            changes. Your continued use of the Site after changes are posted
            constitutes your acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            11. Governing Law
          </h2>
          <p>
            These Terms of Use shall be governed by and construed in accordance
            with applicable law. If any provision of these Terms is found to be
            unenforceable, the remaining provisions will continue in full force
            and effect.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1c1917' }}>
            12. Contact
          </h2>
          <p>
            If you have questions about these Terms, email:{' '}
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
