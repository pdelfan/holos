// common base unit to convert from
const unitToGrams = {
  g: 1,
  kg: 1000,
  lb: 453.592,
  oz: 28.3495,
};

export function convertWeight(
  weight: number,
  from: string,
  to: string
): number {
  if (from === to) {
    return weight;
  }

  const toGrams = weight * unitToGrams[from as keyof typeof unitToGrams];
  const converted = toGrams / unitToGrams[to as keyof typeof unitToGrams];

  return converted;
}
