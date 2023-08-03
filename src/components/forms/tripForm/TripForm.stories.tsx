import type { Meta, StoryObj } from "@storybook/react";
import TripForm from "./TripForm";

const meta: Meta<typeof TripForm> = {
  title: "Forms/Trip Form",
  component: TripForm,
};

export default meta;
type Story = StoryObj<typeof TripForm>;

export const Default: Story = {
  args: {
    onClose: () => {},
  },
};
