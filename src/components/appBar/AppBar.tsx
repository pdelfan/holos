"use client";

import { usePathname } from "next/navigation";
import NavItem from "../navbar/NavItem";

function Navbar() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="fixed bottom-0 left-0 right-0 p-3 flex gap-5 items-center justify-center bg-white border-t overflow-x-scroll sm:hidden">
        <NavItem
          href="/dashboard/packs"
          title="PACKS"
          active={pathname.includes("packs")}
        />
        <NavItem
          href="/dashboard/trips"
          title="TRIPS"
          active={pathname.includes("trips")}
        />
        <NavItem
          href="/dashboard/inventory"
          title="INVENTORY"
          active={pathname.includes("inventory")}
        />
        <NavItem
          href="/dashboard/wishlist"
          title="WISHLIST"
          active={pathname.includes("wishlist")}
        />
      </ul>
    </nav>
  );
}

export default Navbar;
