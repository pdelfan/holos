import BaseWeightIcon from "@/assets/icons/baseWeight.svg";
import TotalWeightIcon from "@/assets/icons/totalWeight.svg";
import CostIcon from "@/assets/icons/costIcon.svg";
import ItemsIcon from "@/assets/icons/items.svg";
import Image from "next/image";

interface Props {
  data: PackSummary;
}

function PackSummary(props: Props) {
  const { data } = props;
  const {
    weight_unit,
    base_weight,
    total_weight,
    currency,
    total_cost,
    total_items,
  } = data;
  return (
    <div>
      <ul className="flex flex-wrap gap-3 justify-between">
        <li className="flex flex-col items-center">
          <h4 className="text-gray-light font-medium">Base weight</h4>
          <span className="flex flex-wrap gap-1">
            <Image
              src={BaseWeightIcon}
              alt="Base icon"
              width={20}
              height={20}
            />
            <h5 className="text-gray font-medium">
              {base_weight}
              {weight_unit}
            </h5>
          </span>
        </li>
        <li className="flex flex-col items-center">
          <h4 className="text-gray-light font-medium">Total weight</h4>
          <span className="flex flex-wrap gap-1">
            <Image
              src={TotalWeightIcon}
              alt="Total weight icon"
              width={20}
              height={20}
            />
            <h5 className="text-gray font-medium">
              {total_weight}
              {weight_unit}
            </h5>
          </span>
        </li>
        <li className="flex flex-col items-center">
          <h4 className="text-gray-light font-medium">Total cost</h4>
          <span className="flex flex-wrap gap-1">
            <Image src={CostIcon} alt="Cost icon" width={20} height={20} />
            <h5 className="text-gray font-medium">
              {currency}
              {total_cost}
            </h5>
          </span>
        </li>
        <li className="flex flex-col items-center">
          <h4 className="text-gray-light font-medium">Total items</h4>
          <span className="flex flex-wrap gap-1">
            <Image src={ItemsIcon} alt="Items icon" width={20} height={20} />
            <h5 className="text-gray font-medium">{total_items}</h5>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default PackSummary;
