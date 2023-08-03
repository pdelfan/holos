import type { Meta, StoryObj } from "@storybook/react";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";

const meta: Meta<typeof Dropdown> = {
  title: "Actions/Dropdown",
  component: Dropdown,
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => (
    <Dropdown
      button={
        <button className="border-2 p-2 rounded-full text-gray-light font-medium">
          Click here
        </button>
      }
      direction="left"
    >
      <DropdownItem onClick={() => console.log("Item clicked")}>
        A dropdown item
      </DropdownItem>
    </Dropdown>
  ),
};
