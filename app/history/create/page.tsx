import { getAllCategories } from "@/src/lib/utils/queries/categoryQueries";
import HistoryEditor from "./_components/HistoryEditor";

export const dynamic = "force-dynamic";

const CreateHistoryPage = async () => {
  const categories = await getAllCategories();

  if (!categories) {
    return null;
  }

  return <HistoryEditor categories={categories} />;
};

export default CreateHistoryPage;
