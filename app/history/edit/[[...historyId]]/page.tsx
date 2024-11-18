import type { CategoryType } from "@/src/lib/types/category";
import type { HistoryType } from "@/src/lib/types/history";

import { getHistoryById } from "@/src/lib/utils/queries/historyQueries";
import { getAllCategories } from "@/src/lib/utils/queries/categoryQueries";

import HistoryEditor from "../../create/_components/HistoryEditor";

type Props = {
  params: Promise<{ historyId: string }>;
};

const Edit = async ({ params }: Props) => {
  const { historyId } = await params;

  const history: HistoryType = await getHistoryById(historyId);

  const categories: CategoryType[] = (await getAllCategories()) ?? [];

  return <HistoryEditor categories={categories} history={history} isEditMode />;
};

export default Edit;
