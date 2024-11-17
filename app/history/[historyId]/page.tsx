import { notFound } from "next/navigation";

import { getFetch, postFetch } from "@/src/lib/customFetch";
import { getLogInfo } from "@/src/lib/utils/getLogInfo";
import { HistoryType } from "@/src/lib/types/history";
import { AccessLogType } from "@/src/lib/types/accessLog";
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

  try {
    postFetch({ url: "/api/log", queryParams: { historyId, ...getLogInfo() } });

    const { title, content, imageUrl, createdAt, updatedAt, category, likeCount }: HistoryType = await getFetch({
      url: "/api/history/one",
      queryParams: { id: historyId },
      options: {
        next: { tags: ["history-by-id"] },
        cache: "no-cache",
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

    const accessLogs: AccessLogType[] = await getFetch({
      url: "/api/log/one",
      queryParams: { historyId },
      options: {
        cache: "no-cache",
      },
    });

    return (
      <div className={classes.HistoryDetail}>
        <Navbar historiesByCategory={historiesByCategory} historyId={historyId} />

        <HistoryDetail
          historyId={historyId}
          content={content}
          title={title}
          imageUrl={imageUrl}
          createdAt={createdAt}
          updatedAt={updatedAt}
          likeCount={likeCount}
          isLiked={isLiked}
          accessLogs={accessLogs}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    notFound();
  }
};

export default HistoryDetailWrapper;
