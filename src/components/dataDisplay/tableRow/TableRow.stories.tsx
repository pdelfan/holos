import type { Meta, StoryObj } from "@storybook/react";
import TableRow from "./TableRow";

const meta: Meta<typeof TableRow> = {
  title: "Data Display/Table Row",
  component: TableRow,
};

export default meta;
type Story = StoryObj<typeof TableRow>;

export const Default: Story = {
  // args: {
  //   data: {
  //     position: 1,
  //     image:
  //       "https://www.mec.ca/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-xw5rh7060c%2Fproducts%2F51631%2Fimages%2F231605%2F6020285_NVY13__14377.1681376826.1280.1280.jpg%3Fc%3D1&w=1600&q=65",
  //     title: `MEC Zephyr 65L Backpack`,
  //     description: "SWD Movement 65L (no frame, hip, belt, foam pad)",
  //     link: "https://www.mec.ca/en/product/6020-285/zephyr-65l-backpack",
  //     type: "General",
  //     price: 120,
  //     weight: 1.2,
  //     weightUnit: "kg",
  //     quantity: 1,
  //     groupID: "group-1",
  //   },
  // },
};
