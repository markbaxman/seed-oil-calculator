export interface UserInputs {
  cookingOil: 'vegetable_sunflower_corn' | 'rapeseed_canola' | 'olive_coconut' | 'butter_ghee_animal' | 'avocado_oil'
  cookingFreq: 'most_meals' | 'sometimes' | 'rarely' | 'hardly_ever'
  sauces: 'bottled_regularly' | 'some_shop_bought' | 'mostly_homemade' | 'rarely'
  snacks: 'daily' | 'few_per_week' | 'occasionally' | 'rarely_never'
  takeaway: '5_plus_week' | '2_to_4_week' | 'once_week_less' | 'very_rarely'
  processedMeat: 'daily' | 'few_per_week' | 'occasionally' | 'rarely_never'
  oilyFish: '3_plus_week' | '1_to_2_week' | 'few_per_month' | 'rarely_never'
  omega3Supplement: 'daily_high_dose' | 'occasional_low' | 'none'
  age: 'under_18' | '18_to_35' | '36_to_55' | 'over_56'
  sex: 'male' | 'female' | 'prefer_not'
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
