import classNames from "classnames";

import classes from "./verticalDivider.module.css";

type Props = {
  height?: number | string;
  noMargin?: boolean;
  margin?: number;
};

const VerticalDivider = ({ height, noMargin, margin }: Props) => {
  return (
    <div
      style={{ ...(height ? { height } : {}), ...(margin ? { margin: `0 ${margin}px` } : {}) }}
      className={classNames(classes.VerticalDivider, {
        [classes.noMargin]: noMargin,
      })}
    />
  );
};

export default VerticalDivider;
