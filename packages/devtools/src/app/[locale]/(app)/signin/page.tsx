import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Container from "@/components/common/container";
import SignInForm from "@/components/auth/signin-form";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "signin",
  });

  return {
    title: t("title"),
  };
}

export default async function SignIn() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <Container>
      <SignInForm />
    </Container>
  );
}