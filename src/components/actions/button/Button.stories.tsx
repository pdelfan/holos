import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import DeleteIcon from "@/assets/icons/deleteIcon.svg";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    text: "Button",
    icon: DeleteIcon,
  },
};
