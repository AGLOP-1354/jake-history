import { getFetch } from "@/src/lib/customFetch";
import { HistoryType } from "@/src/lib/types/history";

import History from "../components/history";

import classes from "./page.module.css";

const Home = async () => {
  const histories: HistoryType[] = await getFetch("/api/history");

  if (!histories || histories.length === 0) {
    return <div>히스토리가 없어!</div>;
  }

  return (
    <main className={classes.Home}>
      {histories?.map((historyData) => <History key={historyData.id} {...historyData} />)}
    </main>
  );
};

export default Home;
