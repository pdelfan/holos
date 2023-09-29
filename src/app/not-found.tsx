import Image from "next/image";
import Logo from "@/assets/logo.svg";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center p-3 h-screen">
      <Image src={Logo} alt="Holos logo" width={60} height={60} />
      <h1 className="text-header-1 text-center text-4xl sm:text-5xl font-medium mt-3">
        404
      </h1>
      <h2 className="text-header-2 text-center text-lg sm:text-xl font-medium mt-1">
        The page you are looking for could not be found.
      </h2>
      <Link
        className="mt-6 px-4 py-2 rounded-full font-medium text-sm bg-button text-button-text hover:bg-button-hover"
        href={`${process.env.NEXT_PUBLIC_SITE_URL}`}
      >
        Return Home
      </Link>
    </main>
  );
}
