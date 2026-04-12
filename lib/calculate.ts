import type { UserInputs, CalculationResult, ReductionAction } from './types'

// ─── COOKING OIL BASE (grams omega-6 per day) ────────────────────────────────
// Source: USDA FoodData Central — omega-6 (linoleic acid) per tablespoon
const COOKING_OIL_BASE: Record<UserInputs['cookingOil'], number> = {
  vegetable_sunflower_corn: 11.0, // USDA: ~11g LA per tbsp sunflower/corn oil
  rapeseed_canola: 3.5,           // USDA: ~3.5g LA per tbsp rapeseed/canola
  olive_coconut: 0.8,             // USDA: ~0.8g LA per tbsp olive oil
  butter_ghee_animal: 0.4,        // USDA: minimal LA in butter/ghee
  avocado_oil: 1.2,               // USDA: ~1.2g LA per tbsp avocado oil
}

// ─── COOKING FREQUENCY MULTIPLIER ────────────────────────────────────────────
// Applied to cooking oil base to adjust for how often home cooking occurs
const COOKING_FREQ_MULTIPLIER: Record<UserInputs['cookingFreq'], number> = {
  most_meals: 1.0,  // reference — cooks 5–7 days/week
  sometimes: 0.7,   // 3–4 days/week
  rarely: 0.4,      // 1–2 days/week
  hardly_ever: 0.2, // mostly takeaways (takeaway omega-6 handled by Q5)
}

// ─── SAUCES & DRESSINGS OMEGA-6 ADDITION (grams/day) ─────────────────────────
// Source: USDA FoodData Central — bottled dressings and mayo are almost always
// made with soybean oil (~3.5g LA per tablespoon)
const SAUCE_OMEGA6: Record<UserInputs['sauces'], number> = {
  bottled_regularly: 3.5, // mayo/bottled dressings: ~3.5g LA per tbsp
  some_shop_bought: 1.5,  // occasional use
  mostly_homemade: 0.3,   // olive oil-based homemade dressings
  rarely: 0.0,            // minimal contribution
}

// ─── PACKAGED SNACK OMEGA-6 (grams/day) ──────────────────────────────────────
// Source: USDA FoodData Central — crisps/crackers fried in vegetable oil
const SNACK_OMEGA6: Record<UserInputs['snacks'], number> = {
  daily: 4.0,           // daily crisps/crackers/biscuits
  few_per_week: 2.0,    // several times per week
  occasionally: 0.8,    // once a week or less
  rarely_never: 0.0,    // no contribution
}

// ─── TAKEAWAY / FAST FOOD OMEGA-6 (grams/day) ────────────────────────────────
// Source: USDA FoodData Central — deep-frying adds significant omega-6
// via vegetable oil at high temperatures
const TAKEAWAY_OMEGA6: Record<UserInputs['takeaway'], number> = {
  '5_plus_week': 6.0,    // near-daily takeaway/fast food
  '2_to_4_week': 3.0,   // several times per week
  once_week_less: 1.0,  // occasional takeaway
  very_rarely: 0.2,     // minimal contribution
}

// ─── PROCESSED MEAT OMEGA-6 (grams/day) ──────────────────────────────────────
// Source: USDA FoodData Central — pork products higher in omega-6 due to
// grain/corn feed given to commercially raised pigs
const PROCESSED_MEAT_OMEGA6: Record<UserInputs['processedMeat'], number> = {
  daily: 2.0,           // daily sausages/bacon/deli meats
  few_per_week: 1.0,   // several times per week
  occasionally: 0.4,   // occasional consumption
  rarely_never: 0.0,   // no contribution
}

// ─── OILY FISH OMEGA-3 (EPA + DHA, grams/day) ────────────────────────────────
// Source: USDA FoodData Central — salmon contains ~2.2g EPA/DHA per 100g serving
const FISH_OMEGA3: Record<UserInputs['oilyFish'], number> = {
  '3_plus_week': 1.4,    // 3+ servings oily fish per week
  '1_to_2_week': 0.6,   // 1–2 servings per week
  few_per_month: 0.15,  // occasional fish consumption
  rarely_never: 0.0,    // no contribution
}

// ─── OMEGA-3 SUPPLEMENT (EPA + DHA, grams/day) ───────────────────────────────
// Source: Simopoulos AP (2002) — supplementation studies used 1000mg+ EPA/DHA
const SUPPLEMENT_OMEGA3: Record<UserInputs['omega3Supplement'], number> = {
  daily_high_dose: 1.0,  // 1000mg+ EPA/DHA daily
  occasional_low: 0.3,   // occasional or low-dose supplement
  none: 0.0,             // no supplement
}

// ─── BIOLOGICAL SEX MODIFIER ─────────────────────────────────────────────────
// Source: USDA dietary surveys — men typically consume more calories and
// therefore more omega-6 than women
const SEX_MODIFIER: Record<UserInputs['sex'], number> = {
  male: 1.05,       // higher caloric intake on average
  female: 0.95,     // lower caloric intake on average
  prefer_not: 1.00, // use neutral baseline
}

// ─── AGE MODIFIER ────────────────────────────────────────────────────────────
// Source: USDA dietary surveys — younger adults eat more overall;
// over-56 cohort shows reduced total food intake
const AGE_MODIFIER: Record<UserInputs['age'], number> = {
  under_18: 0.80,  // lower total food intake
  '18_to_35': 1.00, // reference intake
  '36_to_55': 1.00, // broadly similar to reference
  over_56: 0.90,    // typically lower total intake
}

// ─── MAIN CALCULATION FUNCTION ────────────────────────────────────────────────
export function calculateRisk(inputs: UserInputs): CalculationResult {
  // Step 1: Cooking oil contribution (adjusted for frequency)
  const cookingOilBase = COOKING_OIL_BASE[inputs.cookingOil]
  const freqMultiplier = COOKING_FREQ_MULTIPLIER[inputs.cookingFreq]
  const cookingOmega6 = cookingOilBase * freqMultiplier

  // Step 2: Other omega-6 sources
  const sauceOmega6 = SAUCE_OMEGA6[inputs.sauces]
  const snackOmega6 = SNACK_OMEGA6[inputs.snacks]
  const takeawayOmega6 = TAKEAWAY_OMEGA6[inputs.takeaway]
  const meatOmega6 = PROCESSED_MEAT_OMEGA6[inputs.processedMeat]

  // Step 3: Apply biological modifiers
  const sexMod = SEX_MODIFIER[inputs.sex]
  const ageMod = AGE_MODIFIER[inputs.age]

  const totalOmega6PerDay =
    (cookingOmega6 + sauceOmega6 + snackOmega6 + takeawayOmega6 + meatOmega6) *
    sexMod *
    ageMod

  // Step 4: Omega-3 intake
  const fishOmega3 = FISH_OMEGA3[inputs.oilyFish]
  const suppOmega3 = SUPPLEMENT_OMEGA3[inputs.omega3Supplement]
  const totalOmega3PerDay = fishOmega3 + suppOmega3

  // Step 5: Calculate ratio
  // If omega-3 is zero, use 0.1 to avoid division by zero
  const safeOmega3 = totalOmega3PerDay === 0 ? 0.1 : totalOmega3PerDay
  const ratio = totalOmega6PerDay / safeOmega3

  // Cap ratio display at 50:1 for extreme cases
  const displayRatio = Math.min(ratio, 50)
  const ratioDisplay = `${Math.round(displayRatio)}:1`

  // Step 6: Risk tier
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

  // Step 7: Contextual metrics
  // Teaspoons equivalent: 1 tsp vegetable oil ≈ 2.5g omega-6
  const teaspoonsEquivalent = (totalOmega6PerDay / 2.5).toFixed(1)

  // How much extra omega-3 per day to reach 4:1 target
  // Source: WHO/FAO (2008) — 4:1 as recommended ratio target
  const omega3Needed = Math.max(
    0,
    totalOmega6PerDay / 4 - totalOmega3PerDay
  ).toFixed(1)

  // vs Western average (16:1 midpoint of 15–17:1 range)
  // Source: Simopoulos AP (2002) — Western diets average 15–17:1
  const vsWesternAverage = Math.round(((ratio - 16) / 16) * 100)

  // Step 8: Top 3 reduction actions
  const topReductions = generateReductions(inputs, {
    cookingOmega6,
    sauceOmega6,
    snackOmega6,
    takeawayOmega6,
    meatOmega6,
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
    topReductions,
  }
}

// ─── REDUCTION ACTION GENERATOR ───────────────────────────────────────────────
interface Components {
  cookingOmega6: number
  sauceOmega6: number
  snackOmega6: number
  takeawayOmega6: number
  meatOmega6: number
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

  // Cooking oil swap
  if (
    inputs.cookingOil === 'vegetable_sunflower_corn' ||
    inputs.cookingOil === 'rapeseed_canola'
  ) {
    const saving =
      inputs.cookingOil === 'vegetable_sunflower_corn'
        ? components.cookingOmega6 - 0.8 * COOKING_FREQ_MULTIPLIER[inputs.cookingFreq]
        : components.cookingOmega6 - 0.8 * COOKING_FREQ_MULTIPLIER[inputs.cookingFreq]
    const newOmega6 = Math.max(0, totalOmega6PerDay - saving)
    const newRatio = newOmega6 / safeOmega3
    actions.push({
      action:
        inputs.cookingOil === 'vegetable_sunflower_corn'
          ? 'Switch to olive oil for cooking — biggest single change you can make'
          : 'Switch to olive or avocado oil for cooking',
      currentOmega6Contribution: components.cookingOmega6,
      estimatedSaving: Math.max(0, saving),
      newRatioIfChanged: Math.round(newRatio * 10) / 10,
    })
  }

  // Sauces swap
  if (
    inputs.sauces === 'bottled_regularly' ||
    inputs.sauces === 'some_shop_bought'
  ) {
    const saving = components.sauceOmega6 - 0.3
    const newOmega6 = Math.max(0, totalOmega6PerDay - saving)
    const newRatio = newOmega6 / safeOmega3
    actions.push({
      action: 'Make your own dressings with olive oil instead of bottled sauces',
      currentOmega6Contribution: components.sauceOmega6,
      estimatedSaving: Math.max(0, saving),
      newRatioIfChanged: Math.round(newRatio * 10) / 10,
    })
  }

  // Snack reduction
  if (inputs.snacks === 'daily' || inputs.snacks === 'few_per_week') {
    const saving = components.snackOmega6 - 0.0
    const newOmega6 = Math.max(0, totalOmega6PerDay - saving)
    const newRatio = newOmega6 / safeOmega3
    actions.push({
      action: 'Replace packaged snacks with nuts, fruit, or yoghurt',
      currentOmega6Contribution: components.snackOmega6,
      estimatedSaving: saving,
      newRatioIfChanged: Math.round(newRatio * 10) / 10,
    })
  }

  // Takeaway reduction
  if (
    inputs.takeaway === '5_plus_week' ||
    inputs.takeaway === '2_to_4_week'
  ) {
    const newTakeawayOmega6 = 1.0 // reduce to "once a week or less"
    const saving = components.takeawayOmega6 - newTakeawayOmega6
    const newOmega6 = Math.max(0, totalOmega6PerDay - saving)
    const newRatio = newOmega6 / safeOmega3
    actions.push({
      action: 'Reduce takeaway/fast food to once a week or less',
      currentOmega6Contribution: components.takeawayOmega6,
      estimatedSaving: Math.max(0, saving),
      newRatioIfChanged: Math.round(newRatio * 10) / 10,
    })
  }

  // Add oily fish
  if (inputs.oilyFish === 'rarely_never' || inputs.oilyFish === 'few_per_month') {
    const newOmega3 = totalOmega3PerDay + 0.6 // adding 1–2 servings/week
    const newRatio = totalOmega6PerDay / Math.max(0.1, newOmega3)
    actions.push({
      action:
        'Eat oily fish 2× per week — salmon, mackerel, sardines add 1.2g omega-3/day',
      currentOmega6Contribution: 0,
      estimatedSaving: 0,
      newRatioIfChanged: Math.round(newRatio * 10) / 10,
    })
  }

  // Add omega-3 supplement
  if (inputs.omega3Supplement === 'none') {
    const newOmega3 = totalOmega3PerDay + 1.0
    const newRatio = totalOmega6PerDay / Math.max(0.1, newOmega3)
    actions.push({
      action:
        'Take a daily omega-3 supplement (1000mg+ EPA/DHA) to boost your omega-3 baseline',
      currentOmega6Contribution: 0,
      estimatedSaving: 0,
      newRatioIfChanged: Math.round(newRatio * 10) / 10,
    })
  }

  // Sort by estimated saving (omega-6 reducers first, then omega-3 boosters)
  const sorted = actions.sort((a, b) => b.estimatedSaving - a.estimatedSaving)

  return sorted.slice(0, 3)
}
