import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  icon?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button(props: Props) {
  const { children, icon, disabled = false, onClick } = props;

  return (
    <button
      className="flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium text-sm bg-button text-button-text hover:bg-button-hover"
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <Image src={icon} alt="Icon" width={20} height={20} />}
      {children}
    </button>
  );
}
