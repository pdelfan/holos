import type { Meta, StoryObj } from "@storybook/react";
import FormSelect from "./FormSelect";

const meta: Meta<typeof FormSelect> = {
  title: "Forms/Form Select",
  component: FormSelect,
};

export default meta;
type Story = StoryObj<typeof FormSelect>;

export const Default: Story = {
  args: {
    label: "Label",
    options: ["One", "Two", "Three"],
  },
};

export const WithInitialValue: Story = {
  args: {
    label: "Label",
    initialValue: "Two",
    options: ["One", "Two", "Three"],
  },
};
