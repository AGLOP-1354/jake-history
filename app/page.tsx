import classNames from "classnames";
import { IconNoteOff } from "@tabler/icons-react";

import { getFetch } from "@/src/lib/customFetch";
import { HistoryType } from "@/src/lib/types/history";
import HistoryCard from "../components/historyCard";

import classes from "./page.module.css";
import Button from "../components/interactive/button";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    sortKey: string;
  }>;
};

const SORT_INFOS = [
  { key: "latest", label: "최신생성순" },
  { key: "name", label: "이름순" },
];

const Home = async ({ searchParams }: Props) => {
  const { sortKey } = await searchParams;
  const _sortKey = sortKey || SORT_INFOS[0].key;

  const histories: HistoryType[] = await getFetch({
    url: "/api/history",
    queryParams: { sortKey: _sortKey },
    options: { next: { tags: ["histories"] } },
  });

  const hasHistories = !!histories && histories.length !== 0;

  return (
    <main className={classes.Wrapper}>
      {hasHistories ? (
        <div className={classes.Home}>
          <div className={classes.sortWrapper}>
            {SORT_INFOS.map(({ key, label }) => (
              <Link href={`/?sortKey=${key}`} key={key}>
                <Button
                  type="text"
                  className={classNames(classes.sortButton, { [classes.activeSortButton]: key === _sortKey })}
                >
                  {label}
                </Button>
              </Link>
            ))}
          </div>

          <div className={classes.historyCardList}>
            {histories?.map((historyData) => <HistoryCard key={historyData.id} {...historyData} />)}
          </div>
        </div>
      ) : (
        <div className={classes.noResult}>
          <IconNoteOff width={128} height={128} />
          <span className={classes.noResultText}>조회 결과가 없습니다.</span>
        </div>
      )}
    </main>
  );
};

export default Home;
