import type { Meta, StoryObj } from "@storybook/react";
import TripCard from "./TripCard";
import TripCardSkeleton from "./TripCardSkeleton";

const meta: Meta<typeof TripCard> = {
  title: "Content Display/Trip Card",
  component: TripCard,
};

export default meta;
type Story = StoryObj<typeof TripCard>;

export const Default: Story = {
  args: {
    item: {
      created_at: new Date().toDateString(),
      id: 0,
      title: "Panorama Ridge",
      date: new Date().toDateString(),
      elevation: 800,
      elevation_unit: "m",
      distance: 6.2,
      distance_unit: "km",
      base_weight: 5.3,
      total_weight: 8.7,
      weight_unit: "kg",
      user_id: "0",
    },
  },
};

export const Skeleton: Story = {
  render: () => <TripCardSkeleton />,
};
