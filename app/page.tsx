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
  const { t } = await searchParams;

  const histories: HistoryType[] = await getFetch("/api/history", { tag: tag || "" });
  const tagList: TagType[] = await getFetch("/api/tag");
  const historyCounts: number = await getFetch("/api/history/count");

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
