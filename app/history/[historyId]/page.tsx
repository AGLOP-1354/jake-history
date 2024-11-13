import { notFound } from "next/navigation";

import { getFetch } from "@/src/lib/customFetch";
import { HistoryType } from "@/src/lib/types/history";

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

  let historiesByCategory: HistoryType[] = [];

  const { title, content, imageUrl, createdAt, category }: HistoryType = await getFetch({
    url: "/api/history/one",
    queryParams: { id: historyId },
  });

  if (category) {
    const _historiesByCategory = await getFetch({
      url: "/api/history/category",
      queryParams: { categoryId: category?._id || category },
    });
    historiesByCategory = _historiesByCategory as HistoryType[];
  }

  return (
    <div className={classes.HistoryDetail}>
      <Navbar historiesByCategory={historiesByCategory} />

      <HistoryDetail content={content} title={title} imageUrl={imageUrl} createdAt={createdAt} />
    </div>
  );
};

export default HistoryDetailWrapper;
