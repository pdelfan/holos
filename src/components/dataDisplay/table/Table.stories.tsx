import type { Meta, StoryObj } from "@storybook/react";
import Table from "./Table";
import TableRow from "../tableRow/TableRow";

const meta: Meta<typeof Table> = {
  title: "Data Display/Table",
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

const rowData: PackItem = {
  position: 1,
  image:
    "https://www.mec.ca/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-xw5rh7060c%2Fproducts%2F51631%2Fimages%2F231605%2F6020285_NVY13__14377.1681376826.1280.1280.jpg%3Fc%3D1&w=1600&q=65",
  title: `MEC Zephyr 65L Backpack`,
  description: "SWD Movement 65L (no frame, hip, belt, foam pad)",
  link: "https://www.mec.ca/en/product/6020-285/zephyr-65l-backpack",
  type: "General",
  price: 120,
  weight: 1.2,
  weightUnit: "kg",
  quantity: 1,
  groupID: "group-1",
};
const rowData2: PackItem = {
  position: 2,
  image:
    "https://www.mec.ca/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-xw5rh7060c%2Fproducts%2F44518%2Fimages%2F201055%2F5019272_IRN11__48985.1681759436.1280.1280.jpg%3Fc%3D1&w=1600&q=65",
  title: `MEC Fulcrum PFD`,
  description: "SWD Movement 65L (no frame, hip, belt, foam pad)",
  link: "https://www.mec.ca/en/product/5019-272/fulcrum-pfd?colour=Cast+Iron",
  type: "Wearable",
  price: 90,
  weight: 3,
  weightUnit: "kg",
  quantity: 2,
  groupID: "group-2",
};

export const Default: Story = {
  render: () => (
    <Table onAddItem={() => console.log("onAddItem clicked")}>
      <TableRow data={rowData} />
      <TableRow data={rowData2} />
    </Table>
  ),
};
