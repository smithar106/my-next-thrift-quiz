export const metadata = {
  title: 'Privacy Policy — My Next Thrift',
  description: 'How My Next Thrift collects, uses, and protects your data.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-2xl mx-auto px-6 py-16 text-white">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-[#555] text-sm mb-12">Last updated: June 2026</p>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">1. Information We Collect</h2>
          <p className="text-[#999] leading-relaxed">
            We collect the following information when you use My Next Thrift:
          </p>
          <ul className="text-[#999] list-disc pl-6 mt-2 space-y-1">
            <li>Quiz answers and style preferences you provide.</li>
            <li>Email address, if you choose to provide one to receive your results.</li>
            <li>Anonymous usage analytics to understand how people use the quiz.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">2. How We Use Your Information</h2>
          <ul className="text-[#999] list-disc pl-6 space-y-1">
            <li>To generate your personalized style archetype and recommendations.</li>
            <li>To improve our recommendation engine over time.</li>
            <li>To send your quiz results to your email, if you provided one.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">3. Data Sharing</h2>
          <p className="text-[#999] leading-relaxed">
            We do not sell your personal data. Your quiz answers and style profile are stored in Supabase,
            our cloud database provider. Anonymous product analytics are collected via PostHog.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">4. Data Retention</h2>
          <p className="text-[#999] leading-relaxed">
            Quiz results and associated data are stored for 12 months. You can unsubscribe from emails
            or request deletion of your data at any time by contacting us.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3">5. Contact</h2>
          <p className="text-[#999] leading-relaxed">
            Questions about this policy? Reach us at{' '}
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
