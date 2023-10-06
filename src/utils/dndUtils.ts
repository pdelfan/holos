export const calculateChangedItems = (
  items: PackItem[],
  oldIndex: number,
  newIndex: number
): PackItem[] => {
  const copy = [...items];
  const changedItems: PackItem[] = [];
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

export const calculateChangedGroups = (
  groups: GroupData[],
  oldIndex: number,
  newIndex: number
): GroupData[] => {
  const copy = [...groups];
  const changedGroups: GroupData[] = [];
  const isMovingDown = oldIndex < newIndex; // if item is moved down or up
  const start = isMovingDown ? oldIndex : newIndex;
  const end = isMovingDown ? newIndex : oldIndex;

  // update position of affected items
  for (let i = start; i <= end; i++) {
    const group = copy[i];
    group.position = i === oldIndex ? newIndex : i + (isMovingDown ? -1 : 1);
    changedGroups.push(group);
  }

  return changedGroups;
};
