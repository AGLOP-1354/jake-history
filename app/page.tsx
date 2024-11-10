import { IconNoteOff } from "@tabler/icons-react";

import Navigation from "@/src/components/navigation";
import { getFetch } from "@/src/lib/customFetch";
import { HistoryType } from "@/src/lib/types/history";
import { TagType } from "@/src/lib/types/tag";
import History from "../components/history";

import classes from "./page.module.css";

type Props = {
  searchParams: Promise<{ tag?: string }>;
};

const Home = async ({ searchParams }: Props) => {
  const { tag } = await searchParams;

  const histories: HistoryType[] = await getFetch({
    url: "/api/history",
    queryParams: { tag: tag || "" },
    options: { next: { tags: ["histories"] } },
  });
  const tagList: TagType[] = await getFetch({ url: "/api/tag", options: { next: { tags: ["tagList"] } } });
  const historyCounts: number = await getFetch({
    url: "/api/history/count",
    options: { next: { tags: ["historyCounts"] } },
  });

  const hasHistories = !!histories && histories.length !== 0;

  return (
    <main style={{ position: "relative", height: "calc(100vh - 71px)" }}>
      {hasHistories ? (
        <div className={classes.Home}>
          {histories?.map((historyData) => <History key={historyData.id} {...historyData} />)}
        </div>
      ) : (
        <div className={classes.noResult}>
          <IconNoteOff width={128} height={128} />
          <span className={classes.noResultText}>조회 결과가 없습니다.</span>
        </div>
      )}
      <Navigation tagList={tagList} historyCounts={historyCounts} />
    </main>
  );
};

export default Home;
