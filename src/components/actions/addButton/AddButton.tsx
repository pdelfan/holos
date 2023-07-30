import Image from "next/image";
import AddIcon from "@/assets/icons/addIcon.svg";

interface Props {
  onClick: () => void;
}

function AddButton(props: Props) {
  const { onClick } = props;
  return (
    <button
      className="bg-gray rounded-full p-3 mx-3 mb-3 hover:bg-gray-dark"
      onClick={onClick}
    >
      <Image src={AddIcon} alt="Plus icon" width={22} height={22} />
    </button>
  );
}

export default AddButton;
