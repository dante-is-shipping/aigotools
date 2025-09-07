"use client";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function SignInForm() {
  const t = useTranslations("signin");

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">{t("title")}</h1>

      <div className="space-y-4">
        <Button
          className="w-full"
          variant="bordered"
          onClick={() => signIn("google")}
        >
          <Image src="/social-icons/google.svg" alt="Google" width={20} height={20} />
          {t("continueWithGoogle")}
        </Button>
      </div>
    </div>
  );
}