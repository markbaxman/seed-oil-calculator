import type { UserInputs, CalculationResult, ReductionAction } from './types'

// ─── COOKING FAT OMEGA-6 (grams/day) ─────────────────────────────────────────
// Source: USDA FoodData Central — omega-6 (linoleic acid) per tablespoon
const COOKING_FAT_OMEGA6: Record<UserInputs['cookingFat'], number> = {
  seed_oils: 9.0,  // sunflower/corn/vegetable oil: ~9–11g LA per tbsp
  mixed: 4.5,      // blend of high and low omega-6 oils
  olive_oil: 0.8,  // USDA: ~0.8g LA per tbsp olive oil
  butter: 0.4,     // USDA: minimal LA in butter/ghee
}

// ─── TAKEAWAY / FAST FOOD OMEGA-6 (grams/day) ────────────────────────────────
// Source: USDA FoodData Central — commercial deep fryers use high-omega-6 oils
const TAKEAWAY_OMEGA6: Record<UserInputs['takeawayFreq'], number> = {
  daily: 6.0,         // near-daily takeaway/fast food
  '3_to_5_week': 3.5, // several times per week
  '1_to_2_week': 1.2, // occasional takeaway
  never: 0.1,         // minimal contribution
}

// ─── PROCESSED FOOD OMEGA-6 (grams/day) ──────────────────────────────────────
// Crisps, crackers, biscuits, ready meals — almost all use seed oils
const PROCESSED_FOOD_OMEGA6: Record<UserInputs['processedFood'], number> = {
  almost_all: 5.0,      // near-total processed food diet
  mostly_packaged: 3.5, // majority packaged/processed
  some: 1.5,            // mix of fresh and packaged
  mostly_fresh: 0.2,    // mainly whole/fresh foods
}

// ─── OILY FISH OMEGA-3 (EPA + DHA, grams/day) ────────────────────────────────
// Source: USDA FoodData Central — salmon ~2.2g EPA/DHA per 100g serving
const FISH_OMEGA3: Record<UserInputs['oilyFish'], number> = {
  '4_plus': 1.6,      // 4+ servings oily fish per week
  '2_to_3_week': 0.9, // 2–3 servings per week
  '1_week': 0.4,      // 1 serving per week
  never: 0.0,         // no contribution
}

// ─── OMEGA-3 SUPPLEMENT (EPA + DHA, grams/day) ───────────────────────────────
// Source: Simopoulos AP (2002) — supplementation studies used 1000mg+ EPA/DHA
const SUPP_OMEGA3: Record<UserInputs['omega3Supp'], number> = {
  daily: 1.0,        // 1000mg+ EPA/DHA daily
  occasionally: 0.3, // occasional or low-dose supplement
  no: 0.0,           // no supplement
}

// ─── NUTS & SEEDS OMEGA-3 (ALA partial conversion, grams/day) ────────────────
// ALA from walnuts/chia/flax converts to EPA/DHA at ~5–15%; estimate is conservative
const NUTS_OMEGA3: Record<UserInputs['nutsSeeds'], number> = {
  high: 0.3,      // daily nuts/seeds — walnuts, chia, flax
  moderate: 0.15, // several times per week
  rarely: 0.0,    // minimal contribution
}

// ─── MAIN CALCULATION FUNCTION ────────────────────────────────────────────────
export function calculateRisk(inputs: UserInputs): CalculationResult {
  // Step 1: Omega-6 sources
  const cookingOmega6 = COOKING_FAT_OMEGA6[inputs.cookingFat]
  const takeawayOmega6 = TAKEAWAY_OMEGA6[inputs.takeawayFreq]
  const processedOmega6 = PROCESSED_FOOD_OMEGA6[inputs.processedFood]

  const totalOmega6PerDay = cookingOmega6 + takeawayOmega6 + processedOmega6

  // Step 2: Omega-3 sources
  const fishOmega3 = FISH_OMEGA3[inputs.oilyFish]
  const suppOmega3 = SUPP_OMEGA3[inputs.omega3Supp]
  const nutsOmega3 = NUTS_OMEGA3[inputs.nutsSeeds]
  const totalOmega3PerDay = fishOmega3 + suppOmega3 + nutsOmega3

  // Step 3: Calculate ratio
  // If omega-3 is zero, use 0.1 to avoid division by zero
  const safeOmega3 = totalOmega3PerDay === 0 ? 0.1 : totalOmega3PerDay
  const ratio = totalOmega6PerDay / safeOmega3

  // Cap ratio display at 50:1 for extreme cases
  const displayRatio = Math.min(ratio, 50)
  const ratioDisplay = `${Math.round(displayRatio)}:1`

  // Step 4: Risk tier
  // Source: Simopoulos AP (2002) — ratio research benchmarks
  let tier: CalculationResult['tier']
  if (ratio <= 4) {
    tier = 'OPTIMAL'
  } else if (ratio <= 10) {
    tier = 'MODERATE'
  } else if (ratio <= 20) {
    tier = 'HIGH'
  } else {
    tier = 'VERY HIGH'
  }

  // Step 5: Contextual metrics
  // Teaspoons equivalent: 1 tsp vegetable oil ≈ 2.5g omega-6
  const teaspoonsEquivalent = (totalOmega6PerDay / 2.5).toFixed(1)

  // Extra omega-3 per day needed to reach 4:1 target
  // Source: WHO/FAO (2008) — 4:1 as recommended ratio target
  const omega3Needed = Math.max(
    0,
    totalOmega6PerDay / 4 - totalOmega3PerDay
  ).toFixed(1)

  // vs Western average (16:1 midpoint of 15–17:1 range)
  // Source: Simopoulos AP (2002) — Western diets average 15–17:1
  const vsWesternAverage = Math.round(((ratio - 16) / 16) * 100)

  // How many times over the 4:1 target
  const xOverTarget = Math.max(1, Math.round(ratio / 4))

  // Step 6: Top 3 reduction actions
  const topReductions = generateReductions(inputs, {
    cookingOmega6,
    takeawayOmega6,
    processedOmega6,
    totalOmega6PerDay,
    totalOmega3PerDay,
  })

  return {
    totalOmega6PerDay: Math.round(totalOmega6PerDay * 10) / 10,
    totalOmega3PerDay: Math.round(totalOmega3PerDay * 100) / 100,
    ratio,
    ratioDisplay,
    tier,
    teaspoonsEquivalent,
    omega3Needed,
    vsWesternAverage,
    xOverTarget,
    topReductions,
  }
}

// ─── REDUCTION ACTION GENERATOR ───────────────────────────────────────────────
interface Components {
  cookingOmega6: number
  takeawayOmega6: number
  processedOmega6: number
  totalOmega6PerDay: number
  totalOmega3PerDay: number
}

function generateReductions(
  inputs: UserInputs,
  components: Components
): ReductionAction[] {
  const actions: ReductionAction[] = []
  const { totalOmega6PerDay, totalOmega3PerDay } = components
  const safeOmega3 = totalOmega3PerDay === 0 ? 0.1 : totalOmega3PerDay

  // Cooking fat swap
  if (inputs.cookingFat === 'seed_oils' || inputs.cookingFat === 'mixed') {
    const newCookingOmega6 = 0.8 // switch to olive oil
    const saving = components.cookingOmega6 - newCookingOmega6
    const newOmega6 = Math.max(0, totalOmega6PerDay - saving)
    const newRatio = newOmega6 / safeOmega3
    actions.push({
      action:
        inputs.cookingFat === 'seed_oils'
          ? 'Switch from vegetable/seed oil to extra virgin olive oil — biggest single change you can make'
          : 'Switch to olive oil or avocado oil for all your cooking',
      currentOmega6Contribution: components.cookingOmega6,
      estimatedSaving: Math.max(0, saving),
      newRatioIfChanged: Math.round(newRatio * 10) / 10,
    })
  }

  // Processed food reduction
  if (
    inputs.processedFood === 'almost_all' ||
    inputs.processedFood === 'mostly_packaged'
  ) {
    const newProcessedOmega6 = 0.2 // reduce to mostly_fresh level
    const saving = components.processedOmega6 - newProcessedOmega6
    const newOmega6 = Math.max(0, totalOmega6PerDay - saving)
    const newRatio = newOmega6 / safeOmega3
    actions.push({
      action:
        'Reduce packaged and processed food — replace snacks with nuts, fruit, or yoghurt',
      currentOmega6Contribution: components.processedOmega6,
      estimatedSaving: Math.max(0, saving),
      newRatioIfChanged: Math.round(newRatio * 10) / 10,
    })
  }

  // Takeaway reduction
  if (inputs.takeawayFreq === 'daily' || inputs.takeawayFreq === '3_to_5_week') {
    const newTakeawayOmega6 = 1.2 // reduce to 1–2x per week
    const saving = components.takeawayOmega6 - newTakeawayOmega6
    const newOmega6 = Math.max(0, totalOmega6PerDay - saving)
    const newRatio = newOmega6 / safeOmega3
    actions.push({
      action: 'Cut takeaway and fast food to once or twice a week maximum',
      currentOmega6Contribution: components.takeawayOmega6,
      estimatedSaving: Math.max(0, saving),
      newRatioIfChanged: Math.round(newRatio * 10) / 10,
    })
  }

  // Add oily fish
  if (inputs.oilyFish === 'never' || inputs.oilyFish === '1_week') {
    const newOmega3 = totalOmega3PerDay + 0.9 // adding 2–3 servings/week
    const newRatio = totalOmega6PerDay / Math.max(0.1, newOmega3)
    actions.push({
      action:
        'Eat oily fish 2–3× per week — salmon, mackerel, sardines add significant EPA/DHA omega-3',
      currentOmega6Contribution: 0,
      estimatedSaving: 0,
      newRatioIfChanged: Math.round(newRatio * 10) / 10,
    })
  }

  // Add omega-3 supplement
  if (inputs.omega3Supp === 'no') {
    const newOmega3 = totalOmega3PerDay + 1.0
    const newRatio = totalOmega6PerDay / Math.max(0.1, newOmega3)
    actions.push({
      action:
        'Take a daily omega-3 supplement (1000mg+ EPA/DHA) to boost your omega-3 baseline directly',
      currentOmega6Contribution: 0,
      estimatedSaving: 0,
      newRatioIfChanged: Math.round(newRatio * 10) / 10,
    })
  }

  // Sort: omega-6 reducers (positive saving) first, then omega-3 boosters
  const sorted = actions.sort((a, b) => b.estimatedSaving - a.estimatedSaving)
  return sorted.slice(0, 3)
}
