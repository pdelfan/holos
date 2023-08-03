import type { Meta, StoryObj } from "@storybook/react";
import EditInventoryForm from "./EditInventoryForm";

const meta: Meta<typeof EditInventoryForm> = {
  title: "Forms/Edit Inventory Form",
  component: EditInventoryForm,
};

export default meta;
type Story = StoryObj<typeof EditInventoryForm>;

export const Default: Story = {
  args: {
    onClose: () => {},
  },
};
