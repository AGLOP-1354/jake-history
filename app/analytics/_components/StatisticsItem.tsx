import classes from "../_styles/analytics.module.css";

type Props = {
  title?: string;
  value?: number | string;
  description?: string;
};

const StatisticsItem = ({ title = "-", value = "-", description = "-" }: Props) => {
  return (
    <div className={classes.hitsItem}>
      <span className={classes.hitsItemTitle}>{title}</span>
      <span className={classes.hitsItemValue}>{value}</span>
      <span className={classes.hitsItemDescription}>{description}</span>
    </div>
  );
};

export default StatisticsItem;
