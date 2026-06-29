import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getCanonicalId, getDominantSignals } from '@/lib/handoff'
import type { ArchetypeKey } from '@/lib/archetypes'

export interface SubmitRequest {
  email?: string | null
  archetypeKey: ArchetypeKey
  answers: Array<{ questionId: string; optionId: string }>
}

export async function POST(request: Request) {
  try {
    const body: SubmitRequest = await request.json()

    if (!body.archetypeKey) {
      return NextResponse.json({ error: 'Archetype key is required' }, { status: 400 })
    }

    const canonicalId = getCanonicalId(body.archetypeKey)
    const dominantSignals = getDominantSignals(body.archetypeKey)
    const sessionId = crypto.randomUUID()
    const quizId = 'thrift_v1'

    const { error } = await supabase.from('quiz_sessions').insert({
      session_id: sessionId,
      quiz_id: quizId,
      result_id: canonicalId,
      quiz_slug: quizId,
      canonical_archetype_id: canonicalId,
      quiz_result_id: canonicalId,
      email: body.email,
      dominant_signals: dominantSignals,
      avoided_signals: [],
      quiz_responses: body.answers,
      schema_version: 1,
    })

    if (error) {
      console.error('[submit] Insert failed:', error.message)
      return NextResponse.json({ error: 'Failed to save session' }, { status: 500 })
    }

    return NextResponse.json({
      session_id: sessionId,
      quiz_id: quizId,
      archetype_name: canonicalId,
    })
  } catch (err) {
    console.error('[submit] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
