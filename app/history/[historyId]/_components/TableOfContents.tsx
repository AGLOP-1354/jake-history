"use client";
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { IconMenuDeep, IconThumbUp, IconPencil } from "@tabler/icons-react";

import Divider from "@/src/components/display/divider";
import Button from "@/src/components/interactive/button";
import { revalidateTag } from "@/src/lib/actions/revalidTag";

import classes from "../_styles/tableOfContents.module.css";
import Link from "next/link";

type Props = {
  toc: {
    id: string;
    text: string;
    tag: string;
  }[];
  createdAt: Date;
  updatedAt?: Date;
  ammountOfLetters: number;
  likeCount: number;
  historyId: string;
  isLiked: boolean;
};

const TableOfContents = ({
  historyId,
  toc,
  createdAt,
  updatedAt,
  ammountOfLetters = 0,
  likeCount = 0,
  isLiked,
}: Props) => {
  const isClient = typeof window !== "undefined";

  const [isOpen, setIsOpen] = useState(false);
  const [clientWidth, setClientWidth] = useState(isClient ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setClientWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.scrollMarginTop = "20px";
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLike = async () => {
    await fetch("/api/like", {
      method: "POST",
      body: JSON.stringify({ historyId }),
    });
    await revalidateTag("history-by-id");
  };

  const handleUnlike = async () => {
    await fetch("/api/like", {
      method: "PUT",
      body: JSON.stringify({ historyId }),
    });
    await revalidateTag("history-by-id");
  };

  const isUpdated = !!updatedAt && dayjs(updatedAt).isAfter(dayjs(createdAt));

  const tableOfContents = (
    <>
      <div className={classes.tableOfContentsDate}>
        <div className={classes.tableOfContentsLikeAndEdit}>
          <div
            className={classNames(classes.tableOfContentsLike, { [classes.tableOfContentsLikeActive]: isLiked })}
            onClick={isLiked ? handleUnlike : handleLike}
          >
            {likeCount}
            <IconThumbUp className={classes.tableOfContentsLikeIcon} />
          </div>
          <div className={classes.tableOfContentsEdit}>
            <Link href={`/history/edit/${historyId}`}>
              <IconPencil />
            </Link>
          </div>
        </div>

        <div className={classes.tableOfContentsDateInfo}>
          <div>생성: {dayjs(createdAt).format("YYYY년 MM월 DD일")}</div>
          {isUpdated && <div>수정: {dayjs(updatedAt).format("YYYY년 MM월 DD일")}</div>}
          <div>분량: {ammountOfLetters}</div>
        </div>
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
            <Button type="text" onClick={() => scrollToSection(id)}>
              {text}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );

  if (clientWidth !== 0 && clientWidth <= 992) {
    return (
      <>
        <div className={classes.tableOfContentsMobile}>
          <IconMenuDeep
            className={classNames(classes.tableOfContentsMobileIcon, {
              [classes.tableOfContentsMobileIconActive]: isOpen,
            })}
            onClick={() => setIsOpen((prev) => !prev)}
          />

          <div
            className={classNames(classes.tableOfContentsMobileContent, {
              [classes.tableOfContentsMobileContentOpen]: isOpen,
            })}
          >
            {tableOfContents}
          </div>
        </div>

        <div
          className={classNames(classes.tableOfContentsMobileOverlay, {
            [classes.tableOfContentsMobileOverlayActive]: isOpen,
          })}
          onClick={() => setIsOpen(false)}
        />
      </>
    );
  }

  return <aside className={classes.TableOfContents}>{tableOfContents}</aside>;
};

export default TableOfContents;
