import Image from "next/image";
import MoreIcon from "@/assets/icons/moreIcon.svg";

interface Props {
  item: TripItem;
  onEdit: () => void;
}

function TripCard(props: Props) {
  const { item, onEdit } = props;

  const gradient = {
    background:
      "radial-gradient(50% 50.00% at 50% 50.00%, #4B5A54 0%, #A3B3AD 100%)",
  };

  const formattedDate = new Date(item.date).toLocaleString("default", {
    month: "short",
    year: "numeric",
    day: "numeric",
  });

  return (
    <article
      className="relative flex flex-col justify-between gap-8 rounded-2xl p-5 bg-gradient-trip-radial hover:saturate-50 focus-visible"
      style={gradient}
      tabIndex={0}
    >
      <div className="flex flex-col flex-wrap gap-1">
        <h2 className="text-lg text-white font-medium break-words overflow-clip leading-5">
          {item.title}
        </h2>
        <h3 className="text-sm text-white font-medium break-words overflow-clip">
          {formattedDate}
        </h3>
      </div>
      <ul className="flex flex-wrap justify-between gap-2">
        <li className="flex flex-col">
          <span className="text-sm font-semibold text-nandor-light">
            Elevation
          </span>
          <span className="text-white text-lg font-medium">
            {item.elevation} {item.elevation_unit}
          </span>
        </li>
        <li className="flex flex-col">
          <span className="text-sm font-semibold text-nandor-light">
            Distance
          </span>
          <span className="text-white text-lg font-medium">
            {item.distance} {item.distance_unit}
          </span>
        </li>
        <li className="flex flex-col">
          <span className="text-sm font-semibold text-nandor-light">
            Base Weight
          </span>
          <span className="text-white text-lg font-medium">
            {item.base_weight} {item.weight_unit}
          </span>
        </li>
        <li className="flex flex-col">
          <span className="text-sm font-semibold text-nandor-light">
            Total weight
          </span>
          <span className="text-white text-lg font-medium">
            {item.total_weight} {item.weight_unit}
          </span>
        </li>
      </ul>
      <div className="flex gap-2 absolute right-5 top-5">
        <button
          className="bg-button p-2 rounded-full hover:bg-button-hover"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <Image src={MoreIcon} alt="Dots icon" width={20} height={20} />
        </button>
      </div>
    </article>
  );
}

export default TripCard;
