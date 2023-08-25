import type { Meta, StoryObj } from "@storybook/react";
import AddItem from "./AddItem";

const meta: Meta<typeof AddItem> = {
  title: "Data Display/Add Item",
  component: AddItem,
};

export default meta;
type Story = StoryObj<typeof AddItem>;

export const Default: Story = {};
