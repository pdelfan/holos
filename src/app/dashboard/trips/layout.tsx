import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holos — Trips",
  description: "Trips",
};

export default async function TripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
