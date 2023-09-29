import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  icon?: string;
  disabled?: boolean;
  textColor?: string;
  bgColor?: string;
  onClick?: () => void;
}

export default function Button(props: Props) {
  const {
    children,
    textColor,
    bgColor,
    icon,
    disabled = false,
    onClick,
  } = props;

  return (
    <button
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium text-sm ${
        bgColor ? bgColor : "bg-button"
      } ${
        textColor ? textColor : "text-button-text"
      } hover:brightness-95 disabled:cursor-not-allowed`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <Image src={icon} alt="Icon" width={20} height={20} />}
      {children}
    </button>
  );
}
