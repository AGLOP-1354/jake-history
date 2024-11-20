import { notFound } from "next/navigation";

import { getHistoryById, getHistoriesByCategory } from "@/src/lib/utils/queries/historyQueries";
import { validateLike } from "@/src/lib/utils/queries/likeQueries";
import { insertAccessLog, getAccessLogsByHistoryId } from "@/src/lib/utils/queries/logQueries";
import { getLogInfo } from "@/src/lib/utils/getLogInfo";
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

  const guestToken = getGuestToken() as string;
  const { guestToken: logGuestToken, ipAddress, userAgent } = getLogInfo();

  try {
    if (logGuestToken && ipAddress && userAgent) {
      await insertAccessLog({ guestToken: logGuestToken, ipAddress, userAgent, historyId });
    }

    const historyData = await getHistoryById(historyId);
    if (!historyData) {
      notFound();
    }

    const { category } = historyData;
    const [likeValidation, accessLogsResponse, categorizedHistories] = await Promise.all([
      validateLike(historyId, guestToken),
      getAccessLogsByHistoryId(historyId),
      category ? getHistoriesByCategory(category.id || category) : Promise.resolve([]),
    ]);

    const isLiked = typeof likeValidation === "boolean" ? likeValidation : likeValidation.success;
    const accessLogs = Array.isArray(accessLogsResponse) ? accessLogsResponse : [];
    const historiesByCategory = Array.isArray(categorizedHistories) ? categorizedHistories : [];
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
          ipAddress={ipAddress}
        />
      </div>
    );
  } catch {
    notFound();
  }
};

export default HistoryDetailWrapper;
