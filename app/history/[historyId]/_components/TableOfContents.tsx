"use client";
import { useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { IconMenuDeep } from "@tabler/icons-react";

import Divider from "@/src/components/display/divider";
import Button from "@/src/components/interactive/button";
import useViewport from "@/src/lib/hooks/useViewport";

import classes from "../_styles/tableOfContents.module.css";

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
  const [isOpen, setIsOpen] = useState(false);

  const { width } = useViewport();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.scrollMarginTop = "20px";
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const tableOfContents = (
    <>
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
            <Button type="text" onClick={() => scrollToSection(id)}>{text}</Button>
          </li>
        ))}
      </ul>
    </>
  )

  if (width <= 992) {
    return (
      <>
        <div className={classes.tableOfContentsMobile}>
          <IconMenuDeep className={classNames(classes.tableOfContentsMobileIcon, {
            [classes.tableOfContentsMobileIconActive]: isOpen,
          })} onClick={() => setIsOpen(prev => !prev)} />

          <div className={classNames(classes.tableOfContentsMobileContent, {
            [classes.tableOfContentsMobileContentOpen]: isOpen,
          })}>
            {tableOfContents}
          </div>
        </div>

        <div className={classNames(classes.tableOfContentsMobileOverlay, {
          [classes.tableOfContentsMobileOverlayActive]: isOpen,
        })} onClick={() => setIsOpen(false)} />
      </>
    );
  }

  return (
    <aside className={classes.TableOfContents}>
      {tableOfContents}
    </aside>
  );
};

export default TableOfContents;
