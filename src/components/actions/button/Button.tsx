import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  icon?: string;
  disabled?: boolean;
  textColor?: string;
  bgColor?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function Button(props: Props) {
  const {
    children,
    textColor,
    bgColor,
    type = "button",
    icon,
    disabled = false,
    onClick,
  } = props;

  return (
    <button
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium text-sm ${
        bgColor ? bgColor : "bg-button"
      } ${textColor ? textColor : "text-button-text"} ${
        disabled &&
        "opacity-30 contrast-75 hover:brightness-100 cursor-not-allowed"
      } hover:brightness-95 disabled:cursor-not-allowed`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {icon && <Image src={icon} alt="Icon" width={20} height={20} />}
      {children}
    </button>
  );
}
