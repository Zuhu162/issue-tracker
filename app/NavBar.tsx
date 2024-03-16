"use client";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { signOut, useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import Spinner from "./components/Spinner";

const NavBar = () => {
  const currentPath = usePathname();

  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-3 items-center">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <FaBug />
            </Link>
            <div className="flex space-x-6">
              {links.map((l) => (
                <Link
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
          </Flex>
          <Box>
            {status === "loading" && <Spinner />}
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback={""}
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user!.email!}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item className="cursor-pointer">
                    <Text onClick={() => signOut({ callbackUrl: "/" })}>
                      Log out
                    </Text>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <>
                <Button
                  onClick={() =>
                    signIn("google", {
                      callbackUrl: "/",
                    })
                  }
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
