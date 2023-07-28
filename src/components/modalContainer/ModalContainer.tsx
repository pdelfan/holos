import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ModalContainer(props: Props) {
  const { children } = props;

  return (
    <>
      <div className="z-20 bg-black/50 fixed inset-0 animate-fade animate-duration-100" />
      {children}
    </>
  );
}
