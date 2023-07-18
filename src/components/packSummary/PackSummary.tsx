import BaseWeightIcon from "@/assets/icons/baseWeight.svg";
import TotalWeightIcon from "@/assets/icons/totalWeight.svg";
import CostIcon from "@/assets/icons/cost.svg";
import ItemsIcon from "@/assets/icons/items.svg";
import Image from "next/image";

function PackSummary() {
  return (
    <div>
      <ul className="flex gap-8 flex-wrap">
        <li className="flex flex-col items-center">
          <span className="text-stone-500 font-medium">Base weight</span>
          <Image src={BaseWeightIcon} alt="Base icon" width={20} height={20} />
        </li>
        <li className="flex flex-col items-center">
          <span className="text-stone-500 font-medium">Total weight</span>
          <Image
            src={TotalWeightIcon}
            alt="Total weight icon"
            width={20}
            height={20}
          />
        </li>
        <li className="flex flex-col items-center">
          <span className="text-stone-500 font-medium">Total cost</span>
          <Image src={CostIcon} alt="Cost icon" width={20} height={20} />
        </li>
        <li className="flex flex-col items-center">
          <span className="text-stone-500 font-medium">Total items</span>
          <Image src={ItemsIcon} alt="Items icon" width={20} height={20} />
        </li>
      </ul>
    </div>
  );
}

export default PackSummary;
