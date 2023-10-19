import BaseWeightIcon from "@/assets/icons/baseWeight.svg";
import TotalWeightIcon from "@/assets/icons/totalWeight.svg";
import CostIcon from "@/assets/icons/costIcon.svg";
import ItemsIcon from "@/assets/icons/itemsIcon.svg";
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
    <div className="grow sm:grow-0">
      <ul className="flex flex-wrap gap-2 sm:gap-6 justify-between">
        <li className="flex flex-col items-center">
          <h4 className="text-gray-light font-medium text-xs sm:text-sm dark:text-neutral-400">
            Base weight
          </h4>
          <span className="flex flex-wrap gap-1">
            <Image
              src={BaseWeightIcon}
              alt="Base icon"
              height={20}
              className="w-4 sm:w-auto"
            />
            <h5 className="text-gray font-medium text-sm sm:text-base dark:text-neutral-200">
              {base_weight} {weight_unit}
            </h5>
          </span>
        </li>
        <li className="flex flex-col items-center">
          <h4 className="text-gray-light font-medium text-xs sm:text-sm dark:text-neutral-400">
            Total weight
          </h4>
          <span className="flex flex-wrap gap-1">
            <Image
              src={TotalWeightIcon}
              alt="Total weight icon"
              height={20}
              className="w-4 sm:w-auto"
            />
            <h5 className="text-gray font-medium text-sm sm:text-base dark:text-neutral-200">
              {total_weight} {weight_unit}
            </h5>
          </span>
        </li>
        <li className="flex flex-col items-center">
          <h4 className="text-gray-light font-medium text-xs sm:text-sm dark:text-neutral-400">
            Total cost
          </h4>
          <span className="flex flex-wrap gap-1">
            <Image src={CostIcon} alt="Cost icon" className="w-4 sm:w-4" />
            <h5 className="text-gray font-medium text-sm sm:text-base dark:text-neutral-200">
              {currency}
              {total_cost}
            </h5>
          </span>
        </li>
        <li className="flex flex-col items-center">
          <h4 className="text-gray-light font-medium text-xs sm:text-sm dark:text-neutral-400">
            Total items
          </h4>
          <span className="flex flex-wrap gap-1">
            <Image
              src={ItemsIcon}
              alt="Items icon"
              height={20}
              className="w-4 sm:w-auto"
            />
            <h5 className="text-gray font-medium text-sm sm:text-base dark:text-neutral-200">
              {total_items}
            </h5>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default PackSummary;
