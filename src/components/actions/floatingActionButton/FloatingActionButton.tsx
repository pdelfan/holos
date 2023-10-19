import Image from "next/image";
import AddIcon from "@/assets/icons/addIcon.svg";

interface Props {
  onClick: () => void;
}

export default function FloatingActionButton(props: Props) {
  const { onClick } = props;
  return (
    <button
      className="bg-gray rounded-full p-3 hover:bg-gray-dark dark:bg-neutral-500 dark:hover:bg-neutral-600"
      onClick={onClick}
    >
      <Image src={AddIcon} alt="Plus icon" width={22} height={22} />
    </button>
  );
}
