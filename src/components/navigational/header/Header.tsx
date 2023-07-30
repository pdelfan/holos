"use client";

import Image from "next/image";
import Logo from "@/assets/logo.svg";
import Avatar from "../../dataDisplay/avatar/Avatar";
import Navbar from "../navbar/Navbar";
import Dropdown from "../../actions/dropdown/Dropdown";
import DropdownItem from "../../actions/dropdown/DropdownItem";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Header() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const onSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.reload();
    }
  };

  const navigateToSettings = () => {
    router.push("/dashboard/settings");
  };

  return (
    <header className="sticky z-50 top-0 left-0 right-0 flex items-center justify-between bg-white px-3 py-2 border-b">
      <Link href="/dashboard">
        <Image src={Logo} alt="HOLOS logo" width={40} height={40} />
      </Link>
      <Navbar />
      <Dropdown button={<Avatar name="Pouria" />}>
        <DropdownItem onClick={navigateToSettings}>Settings</DropdownItem>
        <DropdownItem onClick={onSignOut}>Sign Out</DropdownItem>
      </Dropdown>
    </header>
  );
}

export default Header;
