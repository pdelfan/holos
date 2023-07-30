import Image from "next/image";

interface Props {
  children?: React.ReactNode;
  icon?: string;
  onClick: () => void;
}

export default function DropdownItem(props: Props) {
  const { children, icon, onClick } = props;

  return (
    <button
      className="flex gap-2 text-sm rounded-md text-zinc-500 px-3 py-2 hover:bg-zinc-100"
      onClick={onClick}
    >
      {icon && <Image src={icon} alt="Icon" width={20} height={20} />}
      {children}
    </button>
  );
}
