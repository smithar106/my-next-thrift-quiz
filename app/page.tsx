'use client'

import { useState, useCallback } from 'react'
import QuizStep from '@/components/QuizStep'
import EmailCapture from '@/components/EmailCapture'
import ArchetypeResult from '@/components/ArchetypeResult'
import { ARCHETYPES, type ArchetypeKey } from '@/lib/archetypes'
import { getCanonicalId, getDominantSignals } from '@/lib/handoff'

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
    heading: 'What palette pulls your eye?',
    layout: 'two-cards',
    options: [
      { label: '🖤 Neutrals, earth & dark tones', value: 'dark' },
      { label: '🌸 Colour, pastels & prints', value: 'light' },
    ],
  },
  {
    id: 4,
    heading: 'What kind of score are you hunting?',
    layout: 'two-cards',
    options: [
      { label: '💰 Everyday thrift finds', value: 'everyday' },
      { label: '🪙 Luxury resale & designer scores', value: 'luxury' },
    ],
  },
  {
    id: 5,
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
  step1?: ArchetypeKey
  step2?: string
  step3?: string
  step4?: string
  step5?: string
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0) // 0=intro, 1-5=questions, 6=email, 7=result
  const [answers, setAnswers] = useState<Answers>({})
  const [transitionKey, setTransitionKey] = useState(0)

  // Handoff state — populated after Supabase write
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [quizId, setQuizId] = useState<string | null>(null)
  const [canonicalId, setCanonicalId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const totalSteps = 5

  const handleAnswer = useCallback(
    (value: string) => {
      const stepKey = `step${currentStep}` as keyof Answers

      setAnswers((prev) => ({
        ...prev,
        [stepKey]: value,
      }))

      setTimeout(() => {
        setTransitionKey((k) => k + 1)
        if (currentStep < totalSteps) {
          setCurrentStep((s) => s + 1)
        } else {
          setCurrentStep(6) // email capture
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
          { questionId: 'q3', optionId: answers.step3 },
          { questionId: 'q4', optionId: answers.step4 },
          { questionId: 'q5', optionId: answers.step5 },
        ].filter((r) => r.optionId !== undefined) as Array<{ questionId: string; optionId: string }>

        const res = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            archetypeKey: answers.step1,
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
        setCurrentStep(7) // result
      } catch {
        setSubmitError('Network error. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [answers]
  )

  const archetype = answers.step1 ? ARCHETYPES[answers.step1] : null

  const progress =
    currentStep > 0 && currentStep <= totalSteps
      ? (currentStep - 1) / totalSteps
      : currentStep > totalSteps
      ? 1
      : 0

  // ── Intro screen ──
  if (currentStep === 0) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4 py-12">
        <div
          key={transitionKey}
          className="step-enter w-full max-w-[480px] flex flex-col items-center text-center gap-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#00AB4E]/15 border border-[#00AB4E]/30 flex items-center justify-center text-2xl">
            🛍️
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium tracking-widest uppercase text-[#00AB4E]">
              My Next Thrift
            </p>
            <h1 className="text-3xl font-bold text-white leading-tight">
              Find your thrift
              <br />
              archetype
            </h1>
            <p className="text-[#999] text-base leading-relaxed max-w-[340px] mx-auto">
              React to 5 things. We figure out the rest. The pieces that belong to you.
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full max-w-[320px]">
            <div className="flex items-center gap-3 text-sm text-[#DDD]">
              <span className="w-5 h-5 rounded-full bg-[#00AB4E]/15 border border-[#00AB4E]/40 flex items-center justify-center text-xs text-[#00AB4E]">
                ✓
              </span>
              5 reactions, under 60 seconds
            </div>
            <div className="flex items-center gap-3 text-sm text-[#DDD]">
              <span className="w-5 h-5 rounded-full bg-[#00AB4E]/15 border border-[#00AB4E]/40 flex items-center justify-center text-xs text-[#00AB4E]">
                ✓
              </span>
              10 distinct thrift archetypes
            </div>
            <div className="flex items-center gap-3 text-sm text-[#DDD]">
              <span className="w-5 h-5 rounded-full bg-[#00AB4E]/15 border border-[#00AB4E]/40 flex items-center justify-center text-xs text-[#00AB4E]">
                ✓
              </span>
              Curated pieces matched to your eye
            </div>
          </div>

          <button
            onClick={handleStart}
            className="cta-pulse w-full max-w-[320px] py-4 px-6 rounded-2xl bg-[#00AB4E] text-white font-semibold text-base tracking-wide hover:bg-[#00AB4E]/90 active:scale-[0.97] transition-transform"
          >
            Start the quiz →
          </button>
        </div>
      </main>
    )
  }

  // ── Email capture step ──
  if (currentStep === 6 && archetype) {
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
  if (currentStep === 7 && archetype) {
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

  // ── Quiz steps 1–5 ──
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
