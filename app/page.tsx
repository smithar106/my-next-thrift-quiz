'use client'

import { useState, useCallback } from 'react'
import QuizStep from '@/components/QuizStep'
import EmailCapture from '@/components/EmailCapture'
import ArchetypeResult from '@/components/ArchetypeResult'
import { ARCHETYPES, type ArchetypeKey } from '@/lib/archetypes'

// ─── Scoring engine ───────────────────────────────────────────────────────────

type ArchetypeScore = {
  'archive-hunter': number
  'streetwear-scavenger': number
  'quiet-luxury': number
  'eclectic-curator': number
  'hidden-gem': number
  'downtown-treasure': number
  'romantic-relic': number
  'designer-score': number
  'off-duty-scavenger': number
  'sharp-archive': number
}

const EMPTY_SCORES = (): ArchetypeScore => ({
  'archive-hunter': 0,
  'streetwear-scavenger': 0,
  'quiet-luxury': 0,
  'eclectic-curator': 0,
  'hidden-gem': 0,
  'downtown-treasure': 0,
  'romantic-relic': 0,
  'designer-score': 0,
  'off-duty-scavenger': 0,
  'sharp-archive': 0,
})

// Per-answer score contributions
const ANSWER_SCORES: Record<string, Partial<ArchetypeScore>> = {
  // Q1 — initial archetype lean
  'archive-hunter':       { 'archive-hunter': 3, 'sharp-archive': 1 },
  'streetwear-scavenger': { 'streetwear-scavenger': 3, 'eclectic-curator': 1 },

  // Q2 — material
  'raw':     { 'archive-hunter': 2, 'streetwear-scavenger': 1, 'off-duty-scavenger': 1 },
  'refined': { 'quiet-luxury': 3, 'sharp-archive': 2, 'designer-score': 1 },

  // Q3 — era (new question)
  'era_y2k':      { 'streetwear-scavenger': 3, 'eclectic-curator': 2 },
  'era_90s':      { 'streetwear-scavenger': 2, 'off-duty-scavenger': 2, 'archive-hunter': 1 },
  'era_80s':      { 'eclectic-curator': 2, 'sharp-archive': 2, 'archive-hunter': 1 },
  'era_70s':      { 'romantic-relic': 3, 'eclectic-curator': 2 },
  'era_timeless': { 'archive-hunter': 3, 'sharp-archive': 2, 'quiet-luxury': 1 },
  'era_mix':      { 'eclectic-curator': 3, 'downtown-treasure': 1 },

  // Q4 — palette (was Q3)
  'dark':  { 'archive-hunter': 2, 'sharp-archive': 2, 'quiet-luxury': 1 },
  'light': { 'romantic-relic': 2, 'eclectic-curator': 2, 'off-duty-scavenger': 1 },

  // Q5 — score type (was Q4)
  'everyday': { 'off-duty-scavenger': 3, 'hidden-gem': 2, 'downtown-treasure': 1 },
  'luxury':   { 'designer-score': 3, 'quiet-luxury': 2, 'sharp-archive': 1 },

  // Q6 — what are you hunting (was Q5)
  'forever':  { 'archive-hunter': 3, 'sharp-archive': 2 },
  'budget':   { 'hidden-gem': 3, 'downtown-treasure': 2, 'off-duty-scavenger': 1 },
  'vintage':  { 'romantic-relic': 2, 'eclectic-curator': 2, 'archive-hunter': 2 },
  'designer': { 'designer-score': 3, 'quiet-luxury': 2 },
}

// Tiebreak order — first in list wins ties
const TIEBREAK_ORDER: Array<keyof ArchetypeScore> = [
  'archive-hunter',
  'quiet-luxury',
  'streetwear-scavenger',
  'designer-score',
  'eclectic-curator',
  'sharp-archive',
  'hidden-gem',
  'romantic-relic',
  'downtown-treasure',
  'off-duty-scavenger',
]

function computeArchetype(answers: Answers): ArchetypeKey {
  const scores = EMPTY_SCORES()

  // Tally all answers
  const allValues = [
    answers.step1,
    answers.step2,
    answers.step3_era,
    answers.step4,
    answers.step5,
    answers.step6,
  ].filter(Boolean) as string[]

  for (const value of allValues) {
    const contribution = ANSWER_SCORES[value]
    if (!contribution) continue
    for (const [key, pts] of Object.entries(contribution)) {
      scores[key as keyof ArchetypeScore] += pts ?? 0
    }
  }

  // Find winner with tiebreak
  let best: keyof ArchetypeScore = TIEBREAK_ORDER[0]
  let bestScore = scores[best]

  for (const key of TIEBREAK_ORDER) {
    if (scores[key] > bestScore) {
      bestScore = scores[key]
      best = key
    }
  }

  return best as ArchetypeKey
}

// ─── Quiz questions ───────────────────────────────────────────────────────────

interface Option {
  label: string
  value: string
}

interface Question {
  id: number
  heading: string
  subheading?: string
  layout: 'chips' | 'two-cards' | 'four-cards'
  options: Option[]
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    heading: 'When you find a piece that\'s exactly right — how does it feel?',
    layout: 'two-cards',
    options: [
      { label: '🗝️ Like it was waiting for me', value: 'archive-hunter' },
      { label: '⚡ Like I found it before anyone else', value: 'streetwear-scavenger' },
    ],
  },
  {
    id: 2,
    heading: 'What material stops you in your tracks?',
    layout: 'two-cards',
    options: [
      { label: '🤎 Leather, denim & worn texture', value: 'raw' },
      { label: '✨ Silk, cashmere & natural fibres', value: 'refined' },
    ],
  },
  {
    id: 3,
    heading: 'What era speaks to your eye?',
    subheading: 'This shapes which pieces we pull for you.',
    layout: 'four-cards',
    options: [
      { label: '📼 Y2K', value: 'era_y2k' },
      { label: '🎒 90s', value: 'era_90s' },
      { label: '🕹️ 80s', value: 'era_80s' },
      { label: '🌻 70s', value: 'era_70s' },
      { label: '🏛️ Timeless', value: 'era_timeless' },
      { label: '🎲 Mix it up', value: 'era_mix' },
    ],
  },
  {
    id: 4,
    heading: 'What palette pulls your eye?',
    layout: 'two-cards',
    options: [
      { label: '🖤 Neutrals, earth & dark tones', value: 'dark' },
      { label: '🌸 Colour, pastels & prints', value: 'light' },
    ],
  },
  {
    id: 5,
    heading: 'What kind of score are you hunting?',
    layout: 'two-cards',
    options: [
      { label: '💰 Everyday thrift finds', value: 'everyday' },
      { label: '🪙 Luxury resale & designer scores', value: 'luxury' },
    ],
  },
  {
    id: 6,
    heading: 'What are you hunting for right now?',
    layout: 'four-cards',
    options: [
      { label: "🗝️ A piece I'll wear forever", value: 'forever' },
      { label: '💎 Hidden gems under $50', value: 'budget' },
      { label: '🏷️ Rare vintage or deadstock', value: 'vintage' },
      { label: '🪙 A designer score', value: 'designer' },
    ],
  },
]

// ─── Quiz answers state ───────────────────────────────────────────────────────

interface Answers {
  step1?: ArchetypeKey  // Q1 archetype lean
  step2?: string        // Q2 material
  step3_era?: string    // Q3 era (new)
  step4?: string        // Q4 palette
  step5?: string        // Q5 score type
  step6?: string        // Q6 hunting
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0) // 0=intro, 1-6=questions, 7=email, 8=result
  const [answers, setAnswers] = useState<Answers>({})
  const [transitionKey, setTransitionKey] = useState(0)

  // Handoff state — populated after Supabase write
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [quizId, setQuizId] = useState<string | null>(null)
  const [canonicalId, setCanonicalId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const totalSteps = 6

  const STEP_KEYS: Record<number, keyof Answers> = {
    1: 'step1',
    2: 'step2',
    3: 'step3_era',
    4: 'step4',
    5: 'step5',
    6: 'step6',
  }

  const handleAnswer = useCallback(
    (value: string) => {
      const stepKey = STEP_KEYS[currentStep]
      setAnswers((prev) => ({ ...prev, [stepKey]: value }))
      setTimeout(() => {
        setTransitionKey((k) => k + 1)
        if (currentStep < totalSteps) {
          setCurrentStep((s) => s + 1)
        } else {
          setCurrentStep(7) // email capture
        }
      }, 120)
    },
    [currentStep, totalSteps]
  )

  const handleStart = useCallback(() => {
    setTransitionKey((k) => k + 1)
    setCurrentStep(1)
  }, [])

  const handleRetake = useCallback(() => {
    setAnswers({})
    setSessionId(null)
    setQuizId(null)
    setCanonicalId(null)
    setSubmitError(null)
    setTransitionKey((k) => k + 1)
    setCurrentStep(0)
  }, [])

  const handleEmailSubmit = useCallback(
    async (email: string) => {
      if (!answers.step1) return

      setIsSubmitting(true)
      setSubmitError(null)

      try {
        const quizResponses = [
          { questionId: 'q1', optionId: answers.step1 },
          { questionId: 'q2', optionId: answers.step2 },
          { questionId: 'q3', optionId: answers.step3_era },
          { questionId: 'q4', optionId: answers.step4 },
          { questionId: 'q5', optionId: answers.step5 },
          { questionId: 'q6', optionId: answers.step6 },
        ].filter((r) => r.optionId !== undefined) as Array<{ questionId: string; optionId: string }>

        const res = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            archetypeKey: computeArchetype(answers),
            answers: quizResponses,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          setSubmitError(data.error ?? 'Something went wrong. Try again.')
          setIsSubmitting(false)
          return
        }

        setSessionId(data.session_id)
        setQuizId(data.quiz_id)
        setCanonicalId(data.archetype_name)

        setTransitionKey((k) => k + 1)
        setCurrentStep(8) // result
      } catch {
        setSubmitError('Network error. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [answers]
  )

  const archetype = Object.values(answers).some(Boolean) ? ARCHETYPES[computeArchetype(answers)] : null

  const progress =
    currentStep > 0 && currentStep <= totalSteps
      ? (currentStep - 1) / totalSteps
      : currentStep > totalSteps
      ? 1
      : 0

  // ── Intro screen ──
  if (currentStep === 0) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6">
        <div key={transitionKey} className="step-enter w-full max-w-[440px] flex flex-col items-center text-center gap-8">

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#00AB4E]/10 border border-[#00AB4E]/20 flex items-center justify-center text-3xl">
            🛍️
          </div>

          {/* Copy */}
          <div className="flex flex-col gap-3">
            <p className="text-[#00AB4E] text-xs font-bold tracking-[0.2em] uppercase">
              My Next Thrift
            </p>
            <h1 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
              Find your thrift<br />archetype
            </h1>
            <p className="text-[#999] text-base leading-relaxed max-w-[320px] mx-auto">
              6 reactions. We figure out which vintage pieces belong to you.
            </p>
          </div>

          {/* Trust bullets */}
          <div className="flex flex-col gap-2.5 w-full max-w-[280px]">
            {[
              'Under 60 seconds',
              '10 distinct thrift archetypes',
              'Era-matched pieces, curated for you',
            ].map(item => (
              <div key={item} className="flex items-center gap-3 text-sm text-[#CCC]">
                <span className="w-5 h-5 rounded-full bg-[#00AB4E]/15 border border-[#00AB4E]/30 flex items-center justify-center text-xs text-[#00AB4E] flex-shrink-0">✓</span>
                {item}
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={handleStart}
            className="cta-pulse w-full max-w-[320px] py-4 px-6 rounded-2xl bg-[#00AB4E] text-white font-bold text-base tracking-wide hover:bg-[#00AB4E]/90 active:scale-[0.97] transition-all"
          >
            Find my archetype →
          </button>

          {/* Legal */}
          <div className="flex gap-4 text-xs text-[#444]">
            <a href="/privacy" className="hover:text-[#666] transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-[#666] transition-colors">Terms</a>
          </div>
        </div>
      </main>
    )
  }

  // ── Email capture step ──
  if (currentStep === 7 && archetype) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4 py-12">
        <div
          key={transitionKey}
          className="step-enter w-full max-w-[480px] flex flex-col items-center text-center gap-6"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-[#00AB4E]">
            My Next Thrift
          </p>

          <div className="flex flex-col gap-2">
            <p className="text-2xl font-bold text-white">
              {archetype.name}
            </p>
            <p className="text-[#999] text-sm">
              Your thrift archetype is ready. Save it to get matched.
            </p>
          </div>

          <EmailCapture
            onSubmit={handleEmailSubmit}
            isSubmitting={isSubmitting}
            error={submitError}
          />
        </div>
      </main>
    )
  }

  // ── Result screen ──
  if (currentStep === 8 && archetype) {
    return (
      <ArchetypeResult
        archetype={archetype}
        sessionId={sessionId}
        quizId={quizId}
        canonicalId={canonicalId}
        onRetake={handleRetake}
        transitionKey={transitionKey}
      />
    )
  }

  // ── Quiz steps 1–6 ──
  const question = QUESTIONS[currentStep - 1]
  if (!question) return null

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center px-4 py-8">
      {/* Progress bar */}
      <div className="w-full max-w-[480px] mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[#00AB4E] tracking-wide uppercase">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-xs text-[#555]">{Math.round(progress * 100)}% complete</span>
        </div>
        <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
          <div
            className="progress-bar h-full bg-[#00AB4E] rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <QuizStep key={transitionKey} question={question} onAnswer={handleAnswer} />
    </main>
  )
}
