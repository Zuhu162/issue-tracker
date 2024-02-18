import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 mb-5 border-b px-5 h-14 items-center">
      <Link href="/">
        <FaBug />
      </Link>
      <div className="flex space-x-6">
        {links.map((l) => (
          <Link
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
            key={l.label}
            href={l.href}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
