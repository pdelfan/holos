import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";
import AvatarSkeleton from "./AvatarSkeleton";

const meta: Meta<typeof Avatar> = {
  title: "Data Display/Avatar",
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: "John Doe",
    size: "small",
  },
};

export const WithImage: Story = {
  args: {
    name: "John Doe",
    image: "https://xsgames.co/randomusers/assets/avatars/female/2.jpg",
    size: "small",
  },
};

export const Skeleton: Story = {
  render: () => <AvatarSkeleton />,
};
