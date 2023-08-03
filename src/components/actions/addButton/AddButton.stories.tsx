import type { Meta, StoryObj } from "@storybook/react";
import AddButton from "./AddButton";

const meta: Meta<typeof AddButton> = {
  title: "Actions/Add Button",
  component: AddButton,
};

export default meta;
type Story = StoryObj<typeof AddButton>;

export const Default: Story = {};
