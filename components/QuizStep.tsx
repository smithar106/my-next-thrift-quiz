'use client'

import { useState } from 'react'

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

interface QuizStepProps {
  question: Question
  onAnswer: (value: string) => void
}

export default function QuizStep({ question, onAnswer }: QuizStepProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (value: string) => {
    if (selected) return // prevent double-tap
    setSelected(value)
    onAnswer(value)
  }

  return (
    <div className="step-enter w-full max-w-[480px] flex flex-col gap-6">
      {/* Heading */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-white leading-snug">
          {question.heading}
        </h2>
        {question.subheading && (
          <p className="text-[#999] text-sm">{question.subheading}</p>
        )}
      </div>

      {/* Options */}
      {question.layout === 'chips' && (
        <div className="grid grid-cols-2 gap-2">
          {question.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              disabled={!!selected}
              className={`option-card text-left px-4 py-3 rounded-2xl border text-sm font-medium leading-snug
                ${
                  selected === opt.value
                    ? 'bg-[#00AB4E]/15 border-[#00AB4E] text-white'
                    : 'bg-white/5 border-white/10 text-[#DDD] hover:bg-white/8 hover:border-white/20'
                }
                disabled:cursor-not-allowed
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {question.layout === 'two-cards' && (
        <div className="flex flex-col gap-3">
          {question.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              disabled={!!selected}
              className={`option-card w-full text-left px-5 py-5 rounded-3xl border text-base font-semibold leading-snug
                ${
                  selected === opt.value
                    ? 'bg-[#00AB4E]/15 border-[#00AB4E] text-white'
                    : 'bg-white/5 border-white/10 text-[#DDD] hover:bg-white/8 hover:border-white/20'
                }
                disabled:cursor-not-allowed
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {question.layout === 'four-cards' && (
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              disabled={!!selected}
              className={`option-card text-left px-4 py-4 rounded-2xl border text-sm font-semibold leading-snug h-full
                ${
                  selected === opt.value
                    ? 'bg-[#00AB4E]/15 border-[#00AB4E] text-white'
                    : 'bg-white/5 border-white/10 text-[#DDD] hover:bg-white/8 hover:border-white/20'
                }
                disabled:cursor-not-allowed
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Tap hint on step 1 */}
      {question.id === 1 && !selected && (
        <p className="text-xs text-[#555] text-center">
          Tap the one that fits best — no overthinking
        </p>
      )}
    </div>
  )
}
