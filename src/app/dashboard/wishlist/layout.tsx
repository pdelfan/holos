import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holos — Wishlist",
  description: "Wishlist",
};

export default async function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
