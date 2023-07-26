"use client";

import Image from "next/image";
import Logo from "@/assets/logo.svg";
import Avatar from "../avatar/Avatar";
import Navbar from "../navbar/Navbar";
import Dropdown from "../dropdown/Dropdown";
import DropdownItem from "../dropdown/DropdownItem";
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

  const navigateToHome = () => {
    router.push("/dashboard");
  };

  return (
    <header className="flex items-center justify-between bg-white p-3">
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
