import { notFound } from "next/navigation";

import { getFetch } from "@/src/lib/customFetch";
import { HistoryType } from "@/src/lib/types/history";

import HistoryDetail from "./_components/HistoryDetail";

import classes from "./page.module.css";

type Props = {
  params: Promise<{ historyId: string }>;
};

const HistoryDetailWrapper = async ({ params }: Props) => {
  const { historyId } = await params;
  if (!historyId) {
    notFound();
  }

  const { title, content, imageUrl, createdAt }: HistoryType = await getFetch({
    url: "/api/history/one",
    queryParams: { id: historyId },
  });

  return (
    <div className={classes.HistoryDetail}>
      <HistoryDetail content={content} title={title} imageUrl={imageUrl} createdAt={createdAt} />
    </div>
  );
};

export default HistoryDetailWrapper;
