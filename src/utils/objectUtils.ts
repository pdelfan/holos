function getType<T>(value: T) {
  return Object.prototype.toString.call(value);
}

export const deepEqual = <T extends object>(valueA: T, valueB: T): boolean => {
  // Check for arrays/objects equality.
  const type1 = getType(valueA);
  const type2 = getType(valueB);

  // Only compare the contents if they're both arrays or both objects.
  if (type1 === type2) {
    const entriesA = Object.entries(valueA);
    const entriesB = Object.entries(valueB);

    if (entriesA.length !== entriesB.length) {
      return false;
    }

    return entriesA.every(
      // Make sure the other object has the same properties defined.
      ([k, v]) => Object.hasOwn(valueB, k) && deepEqual(v, valueB[k as keyof T])
    );
  }

  // Check for primitives + type equality.
  return Object.is(valueA, valueB);
};
