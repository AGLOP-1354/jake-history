"use client";
import classNames from "classnames";

import Divider from "@/src/components/display/divider";

import classes from "../_styles/tableOfContents.module.css";
import dayjs from "dayjs";

type Props = {
  toc: {
    id: string;
    text: string;
    tag: string;
  }[];
  createdAt: Date;
  ammountOfLetters: number;
};

const TableOfContents = ({ toc, createdAt, ammountOfLetters = 0 }: Props) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.scrollMarginTop = "20px";
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className={classes.TableOfContents}>
      <div className={classes.tableOfContentsDate}>
        <div>생성: {dayjs(createdAt).format("YYYY년 MM월 DD일")}</div>
        <div>분량: {ammountOfLetters}</div>
      </div>

      <h3 className={classes.tableOfContentsTitle}>목차</h3>

      <Divider noMargin color="var(--bg-200)" />

      <ul className={classes.tableOfContentsList}>
        {toc.map(({ id, text, tag }) => (
          <li
            key={id}
            className={classNames(classes.tableOfContentsItem, {
              [classes.tableOfContentsItemH3]: tag === "H3",
            })}
          >
            <button onClick={() => scrollToSection(id)}>{text}</button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default TableOfContents;
