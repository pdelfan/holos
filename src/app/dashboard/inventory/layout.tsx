import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holos — Inventory",
  description: "Inventory",
};

export default async function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
