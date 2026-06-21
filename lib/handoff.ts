import type { ArchetypeKey } from './archetypes'

// Maps quiz hyphenated keys → app canonical underscored IDs
// The app's resolveQuizAlias() expects canonical IDs or display labels.
// We send canonical IDs so resolution is a direct passthrough (step 1).
export const QUIZ_TO_CANONICAL: Record<ArchetypeKey, string> = {
  'archive-hunter': 'archive_hunter',
  'streetwear-scavenger': 'streetwear_scavenger',
  'quiet-luxury': 'quiet_luxury_thrifter',
  'eclectic-curator': 'eclectic_curator',
  'hidden-gem': 'hidden_gem_collector',
  'downtown-treasure': 'downtown_treasure_hunter',
  'romantic-relic': 'romantic_relic_finder',
  'designer-score': 'designer_score_seeker',
  'off-duty-scavenger': 'off_duty_scavenger',
  'sharp-archive': 'the_sharp_archive',
}

// Dominant signal tags per archetype — derived from the app's
// ARCHETYPES[].styleTags for each canonical ID.
// These are the core identifying tags for personalization.
const DOMINANT_SIGNALS: Record<string, string[]> = {
  archive_hunter: ['style_classic', 'cond_vintage'],
  streetwear_scavenger: ['style_streetwear', 'cond_vintage'],
  quiet_luxury_thrifter: ['style_luxury'],
  eclectic_curator: ['style_bold'],
  hidden_gem_collector: ['style_minimalist', 'cond_vintage'],
  downtown_treasure_hunter: ['style_workwear', 'cond_vintage'],
  romantic_relic_finder: ['style_bohemian', 'cond_vintage'],
  designer_score_seeker: ['style_luxury', 'cond_vintage'],
  off_duty_scavenger: ['style_athletic'],
  the_sharp_archive: ['style_workwear', 'style_classic'],
}

export function getCanonicalId(key: ArchetypeKey): string {
  return QUIZ_TO_CANONICAL[key]
}

export function getDominantSignals(key: ArchetypeKey): string[] {
  const canonical = getCanonicalId(key)
  return DOMINANT_SIGNALS[canonical] ?? ['cond_vintage']
}
