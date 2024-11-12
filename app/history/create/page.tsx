import { getFetch } from "@/src/lib/customFetch";
import type { CategoryType } from "@/src/lib/types/category";

import HistoryEditor from "./_components/HistoryEditor";

const CreateHistoryPage = async () => {
  const categories: CategoryType[] = await getFetch({
    url: "/api/category/all",
    options: { next: { tags: ["categories"] } },
  });

  return <HistoryEditor categories={categories} />;
};

export default CreateHistoryPage;
