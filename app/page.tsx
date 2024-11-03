import { IconNoteOff } from "@tabler/icons-react";

import Navigation from "@/src/components/navigation";
import { getFetch } from "@/src/lib/customFetch";
import { HistoryType } from "@/src/lib/types/history";

import History from "../components/history";

import classes from "./page.module.css";

type Props = {
  searchParams: {
    tag?: string;
  };
};

const Home = async ({ searchParams }: Props) => {
  const { tag } = await searchParams;
  const histories: HistoryType[] = await getFetch("/api/history", { tag: tag || "" });

  const hasHistories = !!histories && histories.length !== 0;

  return (
    <main style={{ position: "relative", height: "calc(100vh - 70px)" }}>
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
      <Navigation />
    </main>
  );
};

export default Home;
