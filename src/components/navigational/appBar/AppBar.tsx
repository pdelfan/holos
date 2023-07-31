"use client";

import NavItem from "../navbar/NavItem";
import { navAtom, tabs } from "@/store/store";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";

function AppBar() {
  const [activeTab, setActiveTab] = useAtom(navAtom);
  const pathname = usePathname();

  return (
    <nav>
      <ul className="fixed bottom-0 left-0 right-0 p-2 flex items-center justify-center bg-white border-t overflow-x-scroll sm:hidden">
        {tabs.map((tab) => (
          <NavItem
            key={tab.id}
            isActive={pathname.includes(tab.id)}
            title={tab.title}
            href={tab.href}
            onClick={() => setActiveTab(tab)}
            motionID="appBar"
          />
        ))}
      </ul>
    </nav>
  );
}

export default AppBar;
