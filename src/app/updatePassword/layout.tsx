import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holos",
  description: "Update Password",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-[100svh] flex items-center justify-center bg-stone-100 animate-fade animate-duration-200 dark:bg-neutral-900">
      {children}
    </main>
  );
}
