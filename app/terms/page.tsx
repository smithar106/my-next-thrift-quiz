export const metadata = {
  title: 'Terms of Service — My Next Thrift',
  description: 'Terms of Service for My Next Thrift.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-2xl mx-auto px-6 py-16 text-white">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-[#555] text-sm mb-12">Last updated: June 2026</p>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">1. Acceptance</h2>
          <p className="text-[#999] leading-relaxed">
            By accessing or using My Next Thrift, you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">2. Description of Service</h2>
          <p className="text-[#999] leading-relaxed">
            My Next Thrift is an AI-powered thrift fashion discovery app available for iOS.
            This website hosts a style quiz that acts as a conversion funnel for the iOS
            application. Results from the quiz are used to personalize your experience inside the app.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">3. Eligibility</h2>
          <p className="text-[#999] leading-relaxed">
            You must be at least 13 years old to use My Next Thrift. By using the service,
            you represent that you meet this age requirement.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">4. Subscriptions</h2>
          <p className="text-[#999] leading-relaxed">
            My Next Thrift Pro offers a 14-day free trial. After the trial, the subscription
            renews at $4.99/month or $29.99/year, depending on the plan selected. All
            subscriptions are managed through the Apple App Store. You can cancel anytime in
            your iOS Settings under Subscriptions. No refunds are provided for partial
            subscription periods.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">5. Intellectual Property</h2>
          <p className="text-[#999] leading-relaxed">
            All content, including style archetypes, quiz questions, design assets, and
            recommendation logic, is the intellectual property of Red Derby Ventures LLC.
            You may not reproduce, distribute, or create derivative works without
            express written permission.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">6. Disclaimer</h2>
          <p className="text-[#999] leading-relaxed">
            Style recommendations provided by My Next Thrift are for entertainment and style
            guidance only. We make no guarantee that recommended items will be available for
            purchase at any given time. Product availability, pricing, and condition are
            determined by third-party sellers and are outside our control.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3">7. Contact</h2>
          <p className="text-[#999] leading-relaxed">
            Questions about these terms? Reach us at{' '}
            <a href="mailto:support@mynextthrift.app" className="text-[#00AB4E] underline">
              support@mynextthrift.app
            </a>
            .
          </p>
        </section>

        <a href="/" className="text-[#00AB4E] text-sm font-medium hover:underline">
          ← Back to quiz
        </a>
      </div>
    </main>
  );
}
