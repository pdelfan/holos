"use client";

import { Toaster } from "react-hot-toast";
import { Provider } from "jotai";

interface Props {
  children: React.ReactNode;
}

export default function Providers(props: Props) {
  const { children } = props;

  return (
    <>
      <Toaster />
      <Provider>{children}</Provider>
    </>
  );
}
