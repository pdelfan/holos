import type { Meta, StoryObj } from "@storybook/react";
import EditTripForm from "./EditTripForm";

const meta: Meta<typeof EditTripForm> = {
  title: "Forms/Edit Trip Form",
  component: EditTripForm,
};

export default meta;
type Story = StoryObj<typeof EditTripForm>;

export const Default: Story = {
  args: {
    onClose: () => {},
  },
};
