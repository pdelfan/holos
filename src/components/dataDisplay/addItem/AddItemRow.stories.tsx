import type { Meta, StoryObj } from "@storybook/react";
import AddItemRow from "./AddItemRow";

const meta: Meta<typeof AddItemRow> = {
  title: "Data Display/Add Item",
  component: AddItemRow,
};

export default meta;
type Story = StoryObj<typeof AddItemRow>;

export const Default: Story = {
  args: {
    viewMode: false,
    total: { price: 120, weight: 3, quantity: 12 },
    weightUnit: "kg",
    currency: "$",
  },
};
