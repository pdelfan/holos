"use client";

import NavItem from "./NavItem";
import { navAtom, tabs } from "@/store/store";
import { useSetAtom } from "jotai";
import { usePathname } from "next/navigation";

function Navbar() {
  const setActiveTab = useSetAtom(navAtom);
  const pathname = usePathname();

  return (
    <nav>
      <ul className="hidden items-center sm:flex">
        {tabs.map((tab) => (
          <NavItem
            key={tab.id}            
            isActive={pathname.includes(tab.id)}
            title={tab.title}
            href={tab.href}
            onClick={() => setActiveTab(tab)}
            motionID="navbar"
          />
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
