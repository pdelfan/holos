import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  title: string;
  isActive: boolean;
  href: string;
  motionID: string;
  onClick: () => void;
}

function NavItem(props: Props) {
  const { title, href, isActive, motionID, onClick } = props;
  const selectedClass =
    isActive === true
      ? " relative text-white"
      : " relative text-orange hover:text-orange-dark";

  return (
    <li className="relative px-3 py-2 font-semibold text-sm" onClick={onClick}>
      {isActive && (
        <motion.div
          layoutId={motionID}
          className="absolute inset-0 bg-orange rounded-full"
          transition={{ duration: 0.25 }}          
        />
      )}
      <Link href={href} className={selectedClass}>
        {title}
      </Link>
    </li>
  );
}

export default NavItem;
