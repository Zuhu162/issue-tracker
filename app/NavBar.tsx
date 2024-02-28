"use client";
import { Box } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const currentPath = usePathname();

  const { status, data: session } = useSession();

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
            // className="text-zinc-500 "
            className={classNames({
              "text-zinc-800": l.href === currentPath,
              "text-zinc-500": l.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            key={l.label}
            href={l.href}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Log out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
