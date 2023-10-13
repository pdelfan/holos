import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holos — Pack",
  description: "Pack",
};

export default async function PackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
