import type { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    direction: "left",
    options: [
      { text: "Option 1", onClick: () => console.log("Option 1") },
      { text: "Option 2", onClick: () => console.log("Option 2") },
      { text: "Option 3", onClick: () => console.log("Option 3") },
    ],
  },
};
