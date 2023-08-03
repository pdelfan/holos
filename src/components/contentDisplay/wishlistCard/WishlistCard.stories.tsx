import type { Meta, StoryObj } from "@storybook/react";
import WishlistCard from "./WishlistCard";

const meta: Meta<typeof WishlistCard> = {
  title: "Content Display/Wishlist Card",
  component: WishlistCard,
};

export default meta;
type Story = StoryObj<typeof WishlistCard>;

export const Default: Story = {
  args: {
    url: "https://www.mec.ca/en/product/6023-723/multi-trails-shorts",
  },
};
