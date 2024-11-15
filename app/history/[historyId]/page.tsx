import { notFound } from "next/navigation";

import { getFetch } from "@/src/lib/customFetch";
import { HistoryType } from "@/src/lib/types/history";
import { getGuestToken } from "@/src/lib/utils/token";

import HistoryDetail from "./_components/HistoryDetail";
import Navbar from "./_components/Navbar";

import classes from "./page.module.css";

type Props = {
  params: Promise<{ historyId: string }>;
};

const HistoryDetailWrapper = async ({ params }: Props) => {
  const { historyId } = await params;
  if (!historyId) {
    notFound();
  }

  const guestToken = getGuestToken();
  let historiesByCategory: HistoryType[] = [];

  const { title, content, imageUrl, createdAt, category, likeCount }: HistoryType = await getFetch({
    url: "/api/history/one",
    queryParams: { id: historyId },
    options: {
      next: { tags: ["history-by-id"] },
    },
  });

  if (category) {
    const _historiesByCategory = await getFetch({
      url: "/api/history/category",
      queryParams: { categoryId: category?._id || category },
    });
    historiesByCategory = _historiesByCategory as HistoryType[];
  }

  const isLiked = (await getFetch({
    url: "/api/like/validate",
    queryParams: { historyId, guestToken },
    options: {
      cache: "no-cache",
    },
  })) as boolean;

  return (
    <div className={classes.HistoryDetail}>
      <Navbar historiesByCategory={historiesByCategory} historyId={historyId} />

      <HistoryDetail
        historyId={historyId}
        content={content}
        title={title}
        imageUrl={imageUrl}
        createdAt={createdAt}
        likeCount={likeCount}
        isLiked={isLiked}
      />
    </div>
  );
};

export default HistoryDetailWrapper;
