"use client";

import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

function providers(props: Props) {
  const { children } = props;

  return (
    <>
      <Toaster />
      {children}
    </>
  );
}

export default providers;
