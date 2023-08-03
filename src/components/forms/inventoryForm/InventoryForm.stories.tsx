import type { Meta, StoryObj } from "@storybook/react";
import InventoryForm from "./InventoryForm";

const meta: Meta<typeof InventoryForm> = {
  title: "Forms/Inventory Form",
  component: InventoryForm,
};

export default meta;
type Story = StoryObj<typeof InventoryForm>;

export const Default: Story = {
  args: {
    onClose: () => {},
  },
};
