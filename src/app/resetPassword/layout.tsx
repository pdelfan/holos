import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holos",
  description: "Reset Password",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-stone-100 animate-fade animate-duration-200">
      {children}
    </main>
  );
}
