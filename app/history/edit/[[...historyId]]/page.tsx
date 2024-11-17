import { getFetch } from "@/src/lib/customFetch";
import type { CategoryType } from "@/src/lib/types/category";
import type { HistoryType } from "@/src/lib/types/history";

import HistoryEditor from "../../create/_components/HistoryEditor";

type Props = {
  params: Promise<{ historyId: string }>;
};

const Edit = async ({ params }: Props) => {
  const { historyId } = await params;

  const history: HistoryType = await getFetch({ url: `/api/history/one`, queryParams: { id: historyId } });

  const categories: CategoryType[] = await getFetch({
    url: "/api/category/all",
    options: { next: { tags: ["categories"] } },
  });

  return <HistoryEditor categories={categories} history={history} isEditMode />;
};

export default Edit;
