import type { Meta, StoryObj } from "@storybook/react";
import WishlistCard from "./WishlistCard";
import WishlistCardSkeleton from "./WishlistCardSkeleton";

const meta: Meta<typeof WishlistCard> = {
  title: "Content Display/Wishlist Card",
  component: WishlistCard,
};

export default meta;
type Story = StoryObj<typeof WishlistCard>;

export const Default: Story = {
  args: {
    item: {
      id: 0,
      created_at: new Date().toDateString(),
      url: "https://www.mec.ca/en/product/6023-723/multi-trails-shorts",
      logo_url: "https://logo.clearbit.com/www.mec.ca",
      title: "Multi trails shorts",
      image_url:
        "https://www.mec.ca/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-xw5rh7060c%2Fproducts%2F51101%2Fimages%2F226904%2F6023723_LAG29__79551.1676974486.1280.1280.jpg%3Fc%3D1&w=1600&q=65",
      user_id: "0",
    },
  },
};

export const Skeleton: Story = {
  render: () => <WishlistCardSkeleton />,
};
