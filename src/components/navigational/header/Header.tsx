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
import useGetUser from "@/hooks/useGetUser";
import useGetUserData from "@/hooks/useGetUserData";

function Header() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const { user } = useGetUser();
  const { userData } = useGetUserData();

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
    <header className="sticky z-50 top-0 left-0 right-0 flex items-center justify-between bg-white px-3 py-2 border-b dark:bg-neutral-800 dark:border-neutral-700">
      <Link href="/dashboard/packs">
        <Image src={Logo} alt="HOLOS logo" width={40} />
      </Link>
      <Navbar />
      <Dropdown
        button={
          <span className="hover:brightness-95">
            <Avatar name={user?.email ?? null} image={userData?.avatar_url} />
          </span>
        }
      >
        <DropdownItem onClick={navigateToSettings}>Settings</DropdownItem>
        <DropdownItem onClick={onSignOut}>Sign Out</DropdownItem>
      </Dropdown>
    </header>
  );
}

export default Header;
