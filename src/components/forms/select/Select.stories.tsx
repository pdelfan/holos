import type { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";

const meta: Meta<typeof Select> = {
  title: "Forms/Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  {
    text: "Option 1",
  },
];

export const Default: Story = {
  args: {
    direction: "left",
    selected: options[0],
    options: options,
  },
};
