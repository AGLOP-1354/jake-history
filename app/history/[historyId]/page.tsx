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

  try {
    postFetch({ url: "/api/log", queryParams: { historyId, ...getLogInfo() } });

    const [historyData, isLiked, accessLogs] = await Promise.all([
      getFetch<HistoryType>({
        url: "/api/history/one",
        queryParams: { id: historyId },
        options: {
          next: { tags: ["history-by-id"] },
          cache: "no-cache",
        },
      }),
      getFetch<boolean>({
        url: "/api/like/validate",
        queryParams: { historyId, guestToken },
        options: {
          cache: "no-cache",
        },
      }),
      getFetch<AccessLogType[]>({
        url: "/api/log/one",
        queryParams: { historyId },
        options: {
          cache: "no-cache",
        },
      }),
    ]);

    let historiesByCategory: HistoryType[] = [];
    if (historyData.category) {
      historiesByCategory = (await getFetch({
        url: "/api/history/category",
        queryParams: { categoryId: historyData.category?._id || historyData.category },
      })) as HistoryType[];
    }

    const { title, content, imageUrl, createdAt, updatedAt, likeCount } = historyData;

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
