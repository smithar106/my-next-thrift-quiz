export type ArchetypeKey =
  | 'archive-hunter'
  | 'streetwear-scavenger'
  | 'quiet-luxury'
  | 'eclectic-curator'
  | 'hidden-gem'
  | 'downtown-treasure'
  | 'romantic-relic'
  | 'designer-score'
  | 'off-duty-scavenger'
  | 'sharp-archive'

export interface Archetype {
  key: ArchetypeKey
  emoji: string
  name: string
  description: string
}

export const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
  'archive-hunter': {
    key: 'archive-hunter',
    emoji: '🗝️',
    name: 'Archive Hunter',
    description:
      'You hunt for pieces with history. Structured silhouettes, worn leather, forgotten labels.',
  },
  'streetwear-scavenger': {
    key: 'streetwear-scavenger',
    emoji: '🎒',
    name: 'Streetwear Scavenger',
    description:
      'You move fast. Vintage graphics, rare collabs, the find before anyone else.',
  },
  'quiet-luxury': {
    key: 'quiet-luxury',
    emoji: '🧥',
    name: 'Quiet Luxury Thrifter',
    description:
      'Understated and deliberate. Cashmere, silk, pieces that feel expensive without announcing it.',
  },
  'eclectic-curator': {
    key: 'eclectic-curator',
    emoji: '🧳',
    name: 'Eclectic Curator',
    description:
      'Your wardrobe tells a story. You mix eras, textures, and references nobody else catches.',
  },
  'hidden-gem': {
    key: 'hidden-gem',
    emoji: '💎',
    name: 'Hidden Gem Collector',
    description:
      'The thrill is in the dig. You find what others miss and wear it better.',
  },
  'downtown-treasure': {
    key: 'downtown-treasure',
    emoji: '🧭',
    name: 'Downtown Treasure Hunter',
    description:
      'Urban instincts. You know every rack, every corner store, every hidden back section.',
  },
  'romantic-relic': {
    key: 'romantic-relic',
    emoji: '🪞',
    name: 'Romantic Relic Finder',
    description:
      "You're drawn to pieces with feeling. Lace, florals, things that feel like they've been loved.",
  },
  'designer-score': {
    key: 'designer-score',
    emoji: '🪙',
    name: 'Designer Score Seeker',
    description:
      'You know what things are worth. Prada for $40. Chanel at an estate sale. That energy.',
  },
  'off-duty-scavenger': {
    key: 'off-duty-scavenger',
    emoji: '🏷️',
    name: 'Off-Duty Scavenger',
    description:
      'Effortless and unpretentious. Great thrift eye, zero effort to prove it.',
  },
  'sharp-archive': {
    key: 'sharp-archive',
    emoji: '📐',
    name: 'The Sharp Archive',
    description:
      'Tailored instincts. You spot the cut, the fabric, the construction. Quiet and precise.',
  },
}
