import classNames from "classnames";

import classes from "./divider.module.css";

type Props = {
  noMargin?: boolean;
  color?: string;
};

const Divider = ({ color, noMargin }: Props) => (
  <div
    className={classNames(classes.Divider, {
      [classes.noMargin]: noMargin,
    })}
    style={{ ...(color ? { backgroundColor: color } : {}) }}
  />
);

export default Divider;
