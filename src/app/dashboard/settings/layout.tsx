import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holos — Settings",
  description: "Settings",
};

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
