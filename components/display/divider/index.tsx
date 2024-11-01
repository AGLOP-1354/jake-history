import classNames from "classnames";

import classes from "./divider.module.css";

type Props = {
  noMargin?: boolean;
};

const Divider = ({ noMargin }: Props) => (
  <div
    className={classNames(classes.Divider, {
      [classes.noMargin]: noMargin,
    })}
  />
);

export default Divider;
