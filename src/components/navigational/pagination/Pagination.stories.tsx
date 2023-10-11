import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Navigational/Pagination",
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    totalPages: 9,
    pageIndex: 0,
  },
};
