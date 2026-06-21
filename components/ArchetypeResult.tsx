'use client'

import { useState } from 'react'
import type { Archetype } from '@/lib/archetypes'

interface ArchetypeResultProps {
  archetype: Archetype
  sessionId: string | null
  quizId: string | null
  canonicalId: string | null
  onRetake: () => void
  transitionKey: number
}

// TODO: replace with real App Store URL once published
const APP_STORE_URL = 'https://apps.apple.com/app/my-next-thrift'

export default function ArchetypeResult({
  archetype,
  sessionId,
  quizId,
  canonicalId,
  onRetake,
  transitionKey,
}: ArchetypeResultProps) {
  const [copied, setCopied] = useState(false)

  // Build the deep link using values returned from the API submit
  const deepLink = sessionId && quizId && canonicalId
    ? `mynextthrift://open?archetype_name=${encodeURIComponent(canonicalId)}&result_id=${encodeURIComponent(sessionId)}&quiz_id=${encodeURIComponent(quizId)}`
    : null

  const shareText = `I'm a ${archetype.name} — find your thrift archetype on My Next Thrift`
  const shareUrl =
    typeof window !== 'undefined' ? window.location.href : 'https://mynextthrift.com'

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `I'm a ${archetype.name}`,
          text: shareText,
          url: shareUrl,
        })
      } catch {
        // user cancelled — ignore
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      } catch {
        // clipboard not available
      }
    }
  }

  // Building the deep link — show loading while session is being written
  if (!sessionId) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4 py-12">
        <div className="step-enter w-full max-w-[480px] flex flex-col items-center text-center gap-6">
          <div className="w-10 h-10 rounded-full border-2 border-[#00AB4E]/30 border-t-[#00AB4E] animate-spin" />
          <p className="text-[#999] text-sm">Preparing your matches…</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4 py-12">
      <div
        key={transitionKey}
        className="result-enter w-full max-w-[480px] flex flex-col items-center text-center gap-6"
      >
        {/* Subtle top label */}
        <p className="text-xs font-medium tracking-widest uppercase text-[#00AB4E]">
          Your archetype
        </p>

        {/* Big emoji */}
        <div className="text-8xl leading-none select-none" role="img" aria-label={archetype.name}>
          {archetype.emoji}
        </div>

        {/* Name + description */}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {archetype.name}
          </h1>
          <p className="text-[#DDD] text-base leading-relaxed max-w-[360px] mx-auto">
            {archetype.description}
          </p>
        </div>

        {/* Tagline */}
        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
          <p className="text-sm text-[#999] italic">
            Your thrift eye is forming.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/8" />

        {/* CTA section */}
        <div className="flex flex-col gap-3 w-full">
          {deepLink && (
            <a
              href={deepLink}
              className="cta-pulse w-full py-4 px-6 rounded-2xl bg-[#00AB4E] text-white font-semibold text-base tracking-wide text-center hover:bg-[#00AB4E]/90 active:scale-[0.97] transition-transform block"
            >
              Find my pieces →
            </a>
          )}

          <button
            onClick={handleShare}
            className="w-full py-3.5 px-6 rounded-2xl bg-white/5 border border-white/10 text-[#DDD] font-medium text-sm hover:bg-white/10 hover:border-white/20 active:scale-[0.97] transition-all"
          >
            {copied ? '✓ Link copied!' : 'Share my result'}
          </button>

          <button
            onClick={onRetake}
            className="text-xs text-[#555] hover:text-[#888] transition-colors py-2"
          >
            Retake the quiz
          </button>
        </div>

        {/* App store fallback */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <p className="text-xs text-[#555]">Available on iOS</p>
          <a
            href={APP_STORE_URL}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-white"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <span className="text-sm text-white font-medium">Download on the App Store</span>
          </a>
        </div>

        {/* Footer */}
        <p className="text-xs text-[#444] mt-4">
          My Next Thrift · Built for thrift obsessives
        </p>
      </div>
    </main>
  )
}
