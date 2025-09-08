"use client";
import { useTranslations, useLocale } from "next-intl";
import { Github, LogOut } from "lucide-react";
import clsx from "clsx";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";

import Container from "./container";
import Logo from "./logo";
import { ThemeSwitcher } from "./theme-switcher";
import LanguageSwitcher from "./language-switcher";

import { AppConfig } from "@/lib/config";
import { Link } from "@/navigation";

export default function Header({ className }: { className?: string }) {
  const t = useTranslations("header");
  const locale = useLocale();
  const { data: session, status } = useSession();

  const isManager =
    session?.user?.id && AppConfig.manageUsers.includes(session.user.id);

  const handleSignIn = () => {
    signIn(undefined, { callbackUrl: `/${locale}/submit` });
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Container
      className={clsx(
        "flex items-center justify-between h-20 sm:h-24",
        className
      )}
    >
      <Logo />
      <div className="flex items-center gap-2 sm:gap-4">
        <Link href={"https://github.com/dante-is-shipping/devtools"} target="_blank">
          <Github className="text-primary cursor-pointer" size={16} />
        </Link>
        <LanguageSwitcher />
        <ThemeSwitcher />
        {status === "loading" ? (
          <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full" />
        ) : !session ? (
          <>
            <Button
              className="font-semibold"
              color="primary"
              size="sm"
              onClick={handleSignIn}
            >
              {t("submit")}
            </Button>
            <Button
              className="font-semibold"
              size="sm"
              variant="bordered"
              onClick={() => signIn()}
            >
              {t("login")}
            </Button>
          </>
        ) : (
          <>
            <Link href={"/submit"}>
              <Button className="font-semibold" color="primary" size="sm">
                {t("submit")}
              </Button>
            </Link>
            {isManager && (
              <Link href={"/dashboard"} target="_blank">
                <Button
                  className="font-semibold"
                  color="primary"
                  size="sm"
                  variant="bordered"
                >
                  {t("dashboard")}
                </Button>
              </Link>
            )}
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  alt={session.user?.name || ""}
                  className="cursor-pointer"
                  size="sm"
                  src={session.user?.image || undefined}
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="logout"
                  className="text-danger-400 hover:!text-danger-500"
                  startContent={<LogOut size={14} strokeWidth={3} />}
                  onClick={handleSignOut}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        )}
      </div>
    </Container>
  );
}
