import NavItem from "./NavItem";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();

  return (
    <nav>
      <ul className="flex gap-3 items-center">
        <NavItem
          href="/packs"
          title="PACKS"
          active={router.pathname === "packs"}
        />
        <NavItem
          href="/trips"
          title="TRIPS"
          active={router.pathname === "trips"}
        />
        <NavItem
          href="/inventory"
          title="INVENTORY"
          active={router.pathname === "inventory"}
        />
        <NavItem
          href="/wishlist"
          title="WISHLIST"
          active={router.pathname === "wishlist"}
        />
      </ul>
    </nav>
  );
}

export default Navbar;
