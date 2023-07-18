import Image from "next/image";
import Logo from "@/assets/logo.svg";
import Avatar from "../avatar/Avatar";
import Navbar from "../navbar/Navbar";

function Header() {
  return (
    <header className="flex items-center justify-between bg-white p-2">
      <Image src={Logo} alt="HOLOS logo" width={40} height={40} />
      <Navbar />
      <Avatar name="Pouria" />
    </header>
  );
}

export default Header;
