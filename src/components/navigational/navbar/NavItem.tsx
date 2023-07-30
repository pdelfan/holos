import Link from "next/link";

interface Props {
  href: string;
  title: string;
  active: boolean;
}

function NavItem(props: Props) {
  const { href, title, active } = props;
  const selectedClass =
    active === true
      ? " font-semibold text-sm bg-orange text-white px-4 py-2 rounded-full"
      : " font-semibold text-sm text-orange hover:text-orange-dark";

  return (
    <li>
      <Link className={selectedClass} href={href}>
        {title}
      </Link>
    </li>
  );
}

export default NavItem;
