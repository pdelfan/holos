import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  text: string;
  icon?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button(props: Props) {
  const { text, icon, disabled = false, onClick } = props;

  return (
    <button
      className="flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium bg-button text-button-text hover:bg-button-hover"
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <Image src={icon} alt="Icon" width={20} height={20} />}
      {text}
    </button>
  );
}
