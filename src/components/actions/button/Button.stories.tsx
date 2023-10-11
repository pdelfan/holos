import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import ViewIcon from "@/assets/icons/viewIcon.svg";

const meta: Meta<typeof Button> = {
  title: "Actions/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: () => <Button>Button</Button>,
};

export const WithIcon: Story = {
  render: () => <Button icon={ViewIcon}>Button</Button>,
};

export const Disabled: Story = {
  render: () => <Button disabled>Button</Button>,
};

export const CustomColours: Story = {
  render: () => (
    <Button bgColor="bg-orange" textColor="text-white">
      Button
    </Button>
  ),
};
