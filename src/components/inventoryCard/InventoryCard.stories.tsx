import type { Meta, StoryObj } from "@storybook/react";
import InventoryCard from "./InventoryCard";

const meta: Meta<typeof InventoryCard> = {
  title: "Components/Inventory Card",
  component: InventoryCard,
};

export default meta;
type Story = StoryObj<typeof InventoryCard>;

export const Default: Story = {
  args: {
    data: {
      title: "Baltoro 75L Pack",
      description: "SWD Movement 40L (no frame, hip, belt, foam pad)",
      tag: "Backpack",
      price: 320,
      weight: 420,
      image:
        "https://www.mec.ca/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-xw5rh7060c%2Fproducts%2F51635%2Fimages%2F231626%2F6020283_BK000__00667.1681376828.1280.1280.jpg%3Fc%3D1&w=1600&q=65",
    },
  },
};
