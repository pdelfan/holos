import type { Meta, StoryObj } from "@storybook/react";
import Tag from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Content Display/Tag",
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    title: "",
  },
};

export const Wearable: Story = {
  args: {
    title: "Wearable",
  },
};

export const Consumable: Story = {
    args: {
      title: "Consumable",
    },
  };