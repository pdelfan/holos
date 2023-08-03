import type { Meta, StoryObj } from "@storybook/react";
import WishlistForm from "./WishlistForm";

const meta: Meta<typeof WishlistForm> = {
  title: "Forms/Wishlist Form",
  component: WishlistForm,
};

export default meta;
type Story = StoryObj<typeof WishlistForm>;

export const Default: Story = {
  args: {
    onClose: () => {},
  },
};
