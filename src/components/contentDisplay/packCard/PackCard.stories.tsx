import type { Meta, StoryObj } from "@storybook/react";
import PackCard from "./PackCard";
import PackCardSkeleton from "./PackCardSkeleton";

const meta: Meta<typeof PackCard> = {
  title: "Content Display/Pack Card",
  component: PackCard,
};

export default meta;
type Story = StoryObj<typeof PackCard>;

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    item: {
      id: 0,
      created_at: "2021-08-01T00:00:00.000Z",
      user_id: "0",
      title: "Ultralight backpacking",
      description: "Affordable, ultralight, and easy to find backpacking items",
      weight_unit: "kg",
      base_weight: 2.2,
      total_weight: 5,
      total_cost: 900,
      total_items: 10,
      is_public: false,
      share_id: "0",
    },
  },
};

export const Skeleton: Story = {
  render: () => <PackCardSkeleton />,
};
