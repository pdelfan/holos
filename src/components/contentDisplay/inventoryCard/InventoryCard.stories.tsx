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
    currency: "CAD$",
    data: {
      id: 0,
      created_at: "2021-08-01T00:00:00.000Z",
      title: "Baltoro 75L Pack",
      description: "SWD Movement 40L (no frame, hip, belt, foam pad)",
      price: 320,
      weight: 420,
      weight_unit: "g",
      season: "Summer",
      url: "https://www.gregorypacks.com/packs-bags/backpacking-packs/baltoro-75-916BAL75.html",
      image_url:
        "https://www.mec.ca/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-xw5rh7060c%2Fproducts%2F51635%2Fimages%2F231626%2F6020283_BK000__00667.1681376828.1280.1280.jpg%3Fc%3D1&w=1600&q=65",
    },
  },
};
