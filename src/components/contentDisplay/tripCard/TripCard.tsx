import Image from "next/image";
import DeleteIcon from "@/assets/icons/deleteIcon.svg";
import EditIcon from "@/assets/icons/editIcon.svg";
import TripIcon from "@/assets/icons/tripIcon.svg";

interface Props {
  title: string;
  date: string;
  elevation: number;
  elevationUnit: string;
  distance: number;
  distanceUnit: string;
  baseWeight: number;
  totalWeight: number;
  weightUnit: string;
  onDelete: () => void;
  onEdit: () => void;
}

function TripCard(props: Props) {
  const {
    title,
    date,
    elevation,
    elevationUnit,
    distance,
    distanceUnit,
    baseWeight,
    totalWeight,
    weightUnit,
    onDelete,
    onEdit,
  } = props;

  const gradient = {
    background:
      "radial-gradient(50% 50.00% at 50% 50.00%, #4B5A54 0%, #A3B3AD 100%)",
  };

  const formattedDate = new Date(date).toLocaleString("default", {
    month: "short",
    year: "numeric",
    day: "numeric",
  });

  return (
    <article
      className="relative flex flex-col justify-between gap-8 rounded-2xl p-5 bg-gradient-trip-radial group hover:saturate-50 focus-visible"
      style={gradient}
      tabIndex={0}
    >
      <div className="flex flex-wrap gap-1 justify-between items-center">
        <span className="flex items-center gap-1">
          <h2 className="text-lg text-white font-medium break-words overflow-clip leading-5">
            {title}
          </h2>
        </span>
        <h3 className="text-md text-white font-medium break-words overflow-clip">
          {formattedDate}
        </h3>
      </div>
      <ul className="flex flex-wrap justify-between gap-2">
        <li className="flex flex-col">
          <span className="text-sm font-semibold text-nandor-light">
            Elevation
          </span>
          <span className="text-white text-lg font-medium">
            {elevation}
            {elevationUnit}
          </span>
        </li>
        <li className="flex flex-col">
          <span className="text-sm font-semibold text-nandor-light">
            Distance
          </span>
          <span className="text-white text-lg font-medium">
            {distance}
            {distanceUnit}
          </span>
        </li>
        <li className="flex flex-col">
          <span className="text-sm font-semibold text-nandor-light">
            Base Weight
          </span>
          <span className="text-white text-lg font-medium">
            {baseWeight}
            {weightUnit}
          </span>
        </li>
        <li className="flex flex-col">
          <span className="text-sm font-semibold text-nandor-light">
            Total weight
          </span>
          <span className="text-white text-lg font-medium">
            {totalWeight}
            {weightUnit}
          </span>
        </li>
      </ul>
      <div className="hidden group-focus:flex group-hover:flex gap-2 absolute right-5 top-5">
        <button
          className="bg-button p-2 rounded-full hover:bg-button-hover"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Image src={DeleteIcon} alt="Dots icon" width={20} height={20} />
        </button>
        <button
          className="bg-button p-2 rounded-full hover:bg-button-hover"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <Image src={EditIcon} alt="Dots icon" width={20} height={20} />
        </button>
      </div>
    </article>
  );
}

export default TripCard;
