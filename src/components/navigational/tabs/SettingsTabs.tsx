"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function SettingsTabs() {
  const segment = useSelectedLayoutSegment();
  return (
    <div className="flex max-w-xs mx-auto items-center justify-center gap-3 p-2 mt-10 border-2 dark:border-neutral-700 rounded-full">
      <Link
        className={`${
          segment === null
            ? "bg-neutral-500 text-neutral-100 dark:bg-neutral-300 dark:text-neutral-700"
            : "bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-300"
        } px-4 py-2.5 rounded-full grow text-center font-medium text-button-text hover:brightness-95 `}
        href="/dashboard/settings"
      >
        General
      </Link>
      <Link
        className={`${
          segment === "advanced"
            ? "bg-neutral-500 text-neutral-100 dark:bg-neutral-300 dark:text-neutral-700"
            : "bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-300"
        } px-4 py-2.5 rounded-full grow text-center font-medium text-button-text hover:brightness-95 `}
        href="/dashboard/settings/advanced"
      >
        Advanced
      </Link>
    </div>
  );
}
