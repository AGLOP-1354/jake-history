import classNames from "classnames";
import { IconNoteOff } from "@tabler/icons-react";
import Link from "next/link";

import { getLogInfo } from "@/src/lib/utils/getLogInfo";
import { getHistories } from "@/src/lib/utils/queries/historyQueries";
import { insertAccessLog } from "@/src/lib/utils/queries/logQueries";

import Button from "../components/interactive/button";
import HistoryCard from "../components/historyCard";

import classes from "./page.module.css";

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

  const { data: histories, error } = await getHistories(_sortKey);

  if (error) {
    console.error("Error fetching histories:", error);
    throw error;
  }

  const logInfo = getLogInfo();
  if (logInfo.guestToken && logInfo.ipAddress && logInfo.userAgent) {
    insertAccessLog({
      guestToken: logInfo.guestToken,
      ipAddress: logInfo.ipAddress,
      userAgent: logInfo.userAgent,
      historyId: undefined,
    });
  }

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
