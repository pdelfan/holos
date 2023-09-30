import Logo from "@/assets/logo.svg";
import Link from "next/link";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky z-50 top-0 left-0 right-0 flex flex-wrap items-center justify-between gap-2 bg-white px-3 py-2 border-b">
        <Link href="/" className="flex flex-wrap items-center gap-3">
          <Image src={Logo} alt="HOLOS logo" width={40} />
        </Link>
        <Link href="/" className="flex flex-wrap items-center gap-3">
          <span className="font-medium text-md bg-orange text-white px-3 py-1 rounded-full hover:bg-orange-dark group">
            Try Holos{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </span>
        </Link>
      </header>
      <main className="px-3 pt-3 pb-16 sm:p-3">{children}</main>
    </>
  );
}
