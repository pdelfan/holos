import type { Meta, StoryObj } from "@storybook/react";
import WishlistCard from "./WishlistCard";

const meta: Meta<typeof WishlistCard> = {
  title: "Example/Wishlist Card",
  component: WishlistCard,
};

export default meta;
type Story = StoryObj<typeof WishlistCard>;

export const Default: Story = {
  args: {
    wishlistItem: {
      title: "",
      url: "https://houdinisportswear.com/en-ca/clothing/shorts/ws-wadi-shorts-160854",
    },
  },
};
