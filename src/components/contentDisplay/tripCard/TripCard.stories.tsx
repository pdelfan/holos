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
    title: "Panorama Ridge",
    date: new Date().toDateString(),
    elevation: 800,
    distance: 6.2,
    baseWeight: 5.3,
    totalWeight: 8.7,
    weightUnit: "kg",
  },
};

export const Skeleton: Story = {
  render: () => <TripCardSkeleton />,
};
