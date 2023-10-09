import Image from "next/image";
import FallingIcon from "@/assets/icons/fallingIcon.svg";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center p-3 h-[100svh]">
      <Image src={FallingIcon} alt="A person falling" width={80} height={80} />
      <h1 className="text-header-2 text-center text-lg sm:text-xl font-medium mt-1 dark:text-neutral-100">
        The page you are looking for could not be found.
      </h1>
      <Link
        className="mt-6 px-4 py-2 rounded-full font-medium text-sm bg-button text-button-text dark:bg-neutral-700 dark:text-neutral-200 hover:brightness-95"
        href={`${process.env.NEXT_PUBLIC_SITE_URL}`}
      >
        Return Home
      </Link>
    </main>
  );
}
