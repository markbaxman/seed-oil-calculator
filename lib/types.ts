export interface UserInputs {
  // Step 1 — Daily Habits
  takeawayFreq: 'never' | '1_to_2_week' | '3_to_5_week' | 'daily'
  processedFood: 'mostly_fresh' | 'some' | 'mostly_packaged' | 'almost_all'
  cookingFat: 'butter' | 'olive_oil' | 'mixed' | 'seed_oils'
  // Step 2 — Protective Factors
  oilyFish: 'never' | '1_week' | '2_to_3_week' | '4_plus'
  omega3Supp: 'no' | 'occasionally' | 'daily'
  nutsSeeds: 'rarely' | 'moderate' | 'high'
}

export interface ReductionAction {
  action: string
  currentOmega6Contribution: number
  estimatedSaving: number
  newRatioIfChanged: number
}

export interface CalculationResult {
  totalOmega6PerDay: number
  totalOmega3PerDay: number
  ratio: number
  ratioDisplay: string
  tier: 'OPTIMAL' | 'MODERATE' | 'HIGH' | 'VERY HIGH'
  teaspoonsEquivalent: string
  omega3Needed: string
  vsWesternAverage: number
  xOverTarget: number
  topReductions: ReductionAction[]
}

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  category: string
  keyword: string
  readingTime?: string
}
