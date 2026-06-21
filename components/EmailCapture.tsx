'use client'

import { useState } from 'react'

interface EmailCaptureProps {
  onSubmit: (email: string) => Promise<void>
  isSubmitting: boolean
  error: string | null
}

export default function EmailCapture({ onSubmit, isSubmitting, error }: EmailCaptureProps) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || isSubmitting) return
    onSubmit(email.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-white">Save your archetype</h2>
        <p className="text-sm text-[#999] leading-relaxed">
          Get your results and early access to pieces matched to your eye.
        </p>
      </div>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={isSubmitting}
        className="w-full py-3.5 px-4 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-[#555] text-base outline-none focus:border-[#00AB4E]/50 focus:bg-white/[0.12] transition-colors disabled:opacity-50"
      />

      {error && (
        <p className="text-sm text-red-400 text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !email.trim()}
        className="cta-pulse w-full py-4 px-6 rounded-2xl bg-[#00AB4E] text-white font-semibold text-base tracking-wide hover:bg-[#00AB4E]/90 active:scale-[0.97] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Saving…' : 'Save my style profile →'}
      </button>

      <p className="text-xs text-[#555] text-center">
        We'll send you pieces that match your archetype.
      </p>
    </form>
  )
}
