import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holos — Packs",
  description: "Packs",
};

export default async function PacksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
