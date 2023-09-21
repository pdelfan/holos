// common base unit to convert from
const unitToGrams = {
  g: 1,
  kg: 1000,
  lb: 453.592,
  oz: 28.3495,
};

export function convertWeight(
  weight: number,
  from: WeightUnit,
  to: WeightUnit
): number {
  if (from === to) {
    return weight;
  }

  const toGrams = weight * unitToGrams[from];
  const converted = toGrams / unitToGrams[to];

  return converted;
}