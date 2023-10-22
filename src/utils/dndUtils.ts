interface DNDItem {
  position: number;
}

export const calculateChangedItems = <T extends DNDItem>(
  items: T[],
  oldIndex: number,
  newIndex: number
): T[] => {
  const copy = [...items];
  const changedItems: T[] = [];
  const isMovingDown = oldIndex < newIndex; // if item is moved down or up
  const start = isMovingDown ? oldIndex : newIndex;
  const end = isMovingDown ? newIndex : oldIndex;

  // update position of affected items
  for (let i = start; i <= end; i++) {
    const item = copy[i];
    item.position = i === oldIndex ? newIndex : i + (isMovingDown ? -1 : 1);
    changedItems.push(item);
  }

  return changedItems;
};
