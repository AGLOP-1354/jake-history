import classes from "../_styles/analytics.module.css";
import StatisticsItem from "./StatisticsItem";

type Props = {
  totalAccessLogs: number;
  totalUsers: number;
  maximumHits: { count: number };
  maximumHitsByHistoryId: { count: number };
  maximumHitsByHistoryIdTitle?: string;
};

const StatisticsPanel = ({
  totalAccessLogs,
  totalUsers,
  maximumHits,
  maximumHitsByHistoryId,
  maximumHitsByHistoryIdTitle,
}: Props) => (
  <div className={classes.hitsContainer}>
    <StatisticsItem title="history hits" value={totalAccessLogs} description="previous 28days" />
    <StatisticsItem title="hits users" value={totalUsers} description="previous 28days" />
    <StatisticsItem title="all time history hits" value={maximumHits.count} description="previous all time" />
    <StatisticsItem
      title="max hits history"
      value={maximumHitsByHistoryId.count}
      description={maximumHitsByHistoryIdTitle}
    />
    <StatisticsItem />
    <StatisticsItem />
  </div>
);

export default StatisticsPanel;
