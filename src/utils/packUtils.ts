import { convertWeight } from "./numberUtils";

export const calculateGroupTotals = (
  packData: GroupData[],
  weight_unit: string
): PackStats[] => {
  const updatedTotal: PackStats[] = packData.map((group) => {
    const total_weight = group.pack_item.reduce(
      (acc, item) =>
        acc +
        convertWeight(
          item.inventory.weight,
          item.inventory.weight_unit,
          weight_unit
        ) *
          item.quantity,
      0
    );
    const base_weight = group.pack_item
      .filter((item) => item.type === "General")
      .reduce(
        (acc, item) =>
          acc +
          convertWeight(
            item.inventory.weight,
            item.inventory.weight_unit,
            weight_unit
          ) *
            item.quantity,
        0
      );
    const price = group.pack_item.reduce(
      (acc, item) => acc + item.inventory.price * item.quantity,
      0
    );
    const quantity = group.pack_item.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    return {
      group_id: group.id,
      group_title: group.title,
      weight_unit: weight_unit,
      total_weight,
      base_weight,
      price,
      quantity,
    };
  });
  return updatedTotal;
};

export const calculatePackTotal = (
  packStats: PackStats[],
  weight_unit: string,
  currency: string
): PackSummary => {
  const total = {
    weight_unit: weight_unit,
    currency: currency,
    base_weight: parseFloat(
      packStats
        .reduce(
          (acc, group) =>
            acc +
            convertWeight(group.base_weight, group.weight_unit, weight_unit),
          0
        )
        .toFixed(2)
    ),
    total_weight: parseFloat(
      packStats
        .reduce(
          (acc, group) =>
            acc +
            convertWeight(group.total_weight, group.weight_unit, weight_unit),
          0
        )
        .toFixed(2)
    ),
    total_cost: parseFloat(
      packStats.reduce((acc, group) => acc + group.price, 0).toFixed(2)
    ),
    total_items: packStats.reduce((acc, group) => acc + group.quantity, 0),
  };

  return total;
};

export const totalsAreEqual = (
  oldTotal: PackSummary | null,
  newTotal: PackSummary
) => {
  return (
    oldTotal &&
    oldTotal.base_weight === newTotal.base_weight &&
    oldTotal.total_weight === newTotal.total_weight &&
    oldTotal.total_cost === newTotal.total_cost &&
    oldTotal.total_items === newTotal.total_items
  );
};
