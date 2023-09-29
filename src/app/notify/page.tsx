"use client";

import Image from "next/image";
import Logo from "@/assets/logo.svg";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Notify({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { message } = searchParams;

  if (!message) {
    redirect("/");
  }

  return (
    <main className="flex flex-col items-center justify-center p-3 h-screen">
      <Image src={Logo} alt="Holos logo" width={60} height={60} />
      <h1 className="text-header-1 text-center text-2xl sm:text-3xl font-medium mt-3">
        {message === "deleted"
          ? "Your profile was deleted"
          : "Something went wrong, we couldn't delete your profile"}
      </h1>
      <h2 className="text-header-2 text-center text-md sm:text-lg font-medium mt-1">
        {message === "deleted"
          ? "We're sad to see you go!"
          : "Please try again. If the problem persists, please contact us."}
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
