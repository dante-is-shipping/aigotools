"use client";
import { Button } from "@nextui-org/react";
import { ThumbsUpIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession, signIn } from "next-auth/react";
import clsx from "clsx";

import { Site } from "@/models/site";
import { isUserUpVoteSite, triggerUpvoteSite } from "@/lib/actions";

export default function VoteButton({ site }: { site: Site }) {
  const t = useTranslations("site");
  const { data: session } = useSession();
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [voteCount, setVoteCount] = useState(site.voteCount);
  const [isLoading, setIsLoading] = useState(false);

  const triggerUpvote = async () => {
    try {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      const { count, upvoted } = await triggerUpvoteSite(site._id);

      setIsUpvoted(upvoted);
      setVoteCount(count);
    } catch {
      toast.error(t("voteFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const update = async () => {
      setVoteCount(site.voteCount);
      if (session?.user?.id) {
        setIsUpvoted(await isUserUpVoteSite(site._id));
      }
    };

    update().finally(() => {
      setIsLoading(false);
    });
  }, [session, site]);

  const button = (
    <Button
      className={clsx("w-56 font-semibold", {
        "!text-primary-50": isUpvoted,
      })}
      color="success"
      isLoading={isLoading}
      radius="sm"
      variant={isUpvoted ? "solid" : "bordered"}
      onClick={session ? triggerUpvote : () => signIn()}
    >
      <ThumbsUpIcon size={14} strokeWidth={3} />
      {t("upvote")}
      {voteCount > 0 && <span>{voteCount}</span>}
    </Button>
  );

  return button;
}
