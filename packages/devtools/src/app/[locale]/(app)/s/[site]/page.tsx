import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

import Container from "@/components/common/container";
import SiteGroup from "@/components/common/sites-group";
import NavBar from "@/components/common/nav-bar";
import SiteDetail from "@/components/site/site-detail";
import { getSiteDetailByKey, getSiteMetadata } from "@/lib/actions";

export async function generateMetadata({
  params,
}: {
  params: { site: string; locale: string };
}): Promise<Metadata> {
  const site = await getSiteMetadata(params.site);

  return {
    title: `${site?.title}`,
    description: site?.description,
    keywords: site?.keywords,
    openGraph: {
      title: `${site?.title}`,
      description: site?.description,
      images: site?.snapshot ? [{
        url: site.snapshot,
        width: 800,
        height: 450,
        alt: site?.title || 'Website Screenshot',
      }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site?.title}`,
      description: site?.description,
      images: site?.snapshot ? [site.snapshot] : undefined,
    },
  };
}

export default async function Page({ params }: { params: { site: string; locale: string } }) {
  const t = await getTranslations("site");
  const site = await getSiteDetailByKey(params.site);

  if (!site) {
    return null;
  }

  // 构建当前页面的URL
  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.shipnowkit.com'}/${params.locale}/s/${params.site}`;

  return (
    <Container className="mt-4">
      <NavBar name={site.site.name} />
      <SiteDetail site={site.site} currentUrl={currentUrl} />
      {site.suggests.length > 0 && (
        <SiteGroup sites={site.suggests} title={t("relatedTools")} />
      )}
    </Container>
  );
}
