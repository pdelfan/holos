import type { Meta, StoryObj } from "@storybook/react";
import TripCard from "./TripCard";

const meta: Meta<typeof TripCard> = {
  title: "Components/Trip Card",
  component: TripCard,
};

export default meta;
type Story = StoryObj<typeof TripCard>;

export const Default: Story = {
  args: {
    image:
      "https://images.unsplash.com/photo-1606285055154-8ab1f4f4eb6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    title: "Panorama Ridge",
    date: new Date(),
    baseWeight: 6.2,
    consumables: 0.5,
    worn: 2,
    totalWeight: 8.7,
  },
};
