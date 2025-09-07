import { Button, Image } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { ExternalLink, Navigation, Share } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

import VoteButton from "./vote-button";
import SiteTags from "./site-tags";

import { Site } from "@/models/site";

interface SiteDetailProps {
  site: Site;
  currentUrl: string;
}

export default function SiteDetail({ site, currentUrl }: SiteDetailProps) {
  const t = useTranslations("site");

  // 构建Twitter分享URL
  const description = site.desceription || site.name;
  const shareText = site.shareText ? `${site.shareText}\n\n${currentUrl}` : `${description}\n\n${currentUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <header className="text-center mb-8">
        <Link
          className="inline-flex items-center justify-center cursor-pointer group"
          href={site.url}
          target="_blank"
        >
          <h1
            className={clsx(
              "inline-flex relative gap-3 px-4 py-2 items-center justify-center text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-800 transition-all duration-300",
              "after:content-[' '] after:overflow-hidden after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-primary-800 after:w-0 group-hover:after:w-full after:transition-all after:duration-300"
            )}
          >
            <span>{site.name}</span>
            <ExternalLink size={24} strokeWidth={2.5} className="group-hover:scale-110 transition-transform duration-300" />
          </h1>
        </Link>
      </header>
      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
        {/* Left Sidebar - Image and Tags */}
        <div className="lg:col-span-1 space-y-6">
          <div className="sticky top-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-primary-100">
              <Image
                isZoomed
                alt={site.name}
                classNames={{
                  wrapper: "w-full !max-w-full cursor-pointer",
                  img: "w-full aspect-video object-cover hover:scale-105 transition-transform duration-300",
                }}
                radius="none"
                src={site.snapshot}
              />
            </div>
            <SiteTags site={site} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-5">
          {/* Description */}
          {site.desceription && (
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-4 border border-primary-200">
              <p className="text-sm lg:text-base text-primary-700 leading-normal">
                {site.desceription}
              </p>
            </div>
          )}
          {/* Features Section */}
          {site.features.length > 0 && (
            <section className="bg-white rounded-xl p-4 shadow-sm border border-primary-100">
              <h2 className="flex items-center gap-2 mb-4 font-bold text-lg lg:text-xl text-primary-800">
                <div className="w-1 h-5 bg-primary-600 rounded-full"></div>
                {t("topFeatures")}
              </h2>
              <div className="grid gap-2">
                {site.features.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span className="text-sm text-primary-700 font-medium leading-normal">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
          {/* Use Cases Section */}
          {site.usecases.length > 0 && (
            <section className="bg-white rounded-xl p-4 shadow-sm border border-primary-100">
              <h2 className="flex items-center gap-2 mb-4 font-bold text-lg lg:text-xl text-primary-800">
                <div className="w-1 h-5 bg-primary-600 rounded-full"></div>
                {t("usecases")}
              </h2>
              <div className="grid gap-2">
                {site.usecases.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span className="text-sm text-primary-700 font-medium leading-normal">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
          {/* Links Section */}
          {site.links &&
            Object.values(site.links).filter(Boolean).length > 0 && (
              <section className="bg-white rounded-xl p-4 shadow-sm border border-primary-100">
                <h2 className="flex items-center gap-2 mb-4 font-bold text-lg lg:text-xl text-primary-800">
                  <div className="w-1 h-5 bg-primary-600 rounded-full"></div>
                  {t("links")}
                </h2>
                <div className="grid gap-3">
                  {site.links.login && (
                    <div className="flex items-center gap-2 p-3 rounded-lg border border-primary-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
                      <ExternalLink size={14} className="text-primary-600 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-sm text-primary-800">{t("loginPage")}</div>
                        <Link
                          className="text-primary-600 hover:text-primary-800 hover:underline text-xs break-all"
                          href={site.links.login}
                          target="_blank"
                        >
                          {site.links.login}
                        </Link>
                      </div>
                    </div>
                  )}
                  {site.links.register && (
                    <div className="flex items-center gap-2 p-3 rounded-lg border border-primary-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
                      <ExternalLink size={14} className="text-primary-600 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-sm text-primary-800">{t("registerPage")}</div>
                        <Link
                          className="text-primary-600 hover:text-primary-800 hover:underline text-xs break-all"
                          href={site.links.register}
                          target="_blank"
                        >
                          {site.links.register}
                        </Link>
                      </div>
                    </div>
                  )}
                  {site.links.documentation && (
                    <div className="flex items-center gap-2 p-3 rounded-lg border border-primary-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
                      <ExternalLink size={14} className="text-primary-600 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-sm text-primary-800">{t("docPage")}</div>
                        <Link
                          className="text-primary-600 hover:text-primary-800 hover:underline text-xs break-all"
                          href={site.links.documentation}
                          target="_blank"
                        >
                          {site.links.documentation}
                        </Link>
                      </div>
                    </div>
                  )}
                  {site.links.pricing && (
                    <div className="flex items-center gap-2 p-3 rounded-lg border border-primary-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
                      <ExternalLink size={14} className="text-primary-600 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-sm text-primary-800">{t("pricingPage")}</div>
                        <Link
                          className="text-primary-600 hover:text-primary-800 hover:underline text-xs break-all"
                          href={site.links.pricing}
                          target="_blank"
                        >
                          {site.links.pricing}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-4 border border-primary-200">
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
          <Link href={site.url} target="_blank" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-48 font-medium text-sm py-4 shadow-md hover:shadow-lg transition-all duration-300"
              color="primary"
              radius="lg"
              variant="solid"
              size="md"
            >
              <Navigation size={14} strokeWidth={2.5} />
              {t("visitSite")}
            </Button>
          </Link>
          <div className="w-full sm:w-auto">
            <VoteButton site={site} />
          </div>
          <div className="w-full sm:w-auto">
            <Link href={twitterUrl} target="_blank" className="w-full sm:w-auto">
              <Button
                className="w-full sm:w-48 font-medium text-sm py-4 shadow-md hover:shadow-lg transition-all duration-300"
                color="secondary"
                radius="lg"
                variant="bordered"
                size="md"
              >
                <Share size={14} strokeWidth={2.5} />
                {t("shareToX")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
