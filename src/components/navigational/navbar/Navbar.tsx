"use client";

import NavItem from "./NavItem";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="hidden gap-5 items-center sm:flex">
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
