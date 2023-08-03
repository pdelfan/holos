import type { Meta, StoryObj } from "@storybook/react";
import EditPackForm from "./EditPackForm";

const meta: Meta<typeof EditPackForm> = {
  title: "Forms/Edit Pack Form",
  component: EditPackForm,
};

export default meta;
type Story = StoryObj<typeof EditPackForm>;

export const Default: Story = {
  args: {
    onClose: () => {},
  },
};
