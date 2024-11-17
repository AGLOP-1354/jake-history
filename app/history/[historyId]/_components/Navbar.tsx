"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import classNames from "classnames";
import { IconMenu2 } from "@tabler/icons-react";

import Divider from "@/src/components/display/divider";
import Input from "@/src/components/interactive/input";
import { HistoryType } from "@/src/lib/types/history";

import classes from "../_styles/navbar.module.css";

type Props = {
  historiesByCategory: HistoryType[];
  historyId: string;
};

const Navbar = ({ historiesByCategory, historyId }: Props) => {
  const isClient = typeof window !== "undefined";

  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [clientWidth, setClientWidth] = useState(isClient ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setClientWidth(window.innerWidth);
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredHistories = useMemo(() => {
    return historiesByCategory.filter((history) => history.title.includes(searchValue));
  }, [searchValue, historiesByCategory]);

  const navbarContent = (
    <>
      <div className={classes.Navbar__search}>
        <Input
          placeholder="검색어를 입력해주세요."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <Divider color="var(--bg-300)" />

      <div className={classes.Navbar__list}>
        {filteredHistories.map((history) => (
          <Link
            href={`/history/${history.id}`}
            key={history.id}
            className={classNames(classes.Navbar__listItem, {
              [classes.Navbar__listItemActive]: history.id === historyId,
            })}
            onClick={() => setIsOpen(false)}
          >
            {history.title}
          </Link>
        ))}
      </div>
    </>
  );

  if (clientWidth <= 1580) {
    return (
      <>
        <div className={classes.Navbar__mobile}>
          <IconMenu2
            className={classNames(classes.Navbar__mobileIcon, {
              [classes.Navbar__mobileIconActive]: isOpen,
            })}
            onClick={() => setIsOpen(!isOpen)}
          />

          <div
            className={classNames(classes.Navbar__mobileContent, {
              [classes.Navbar__mobileContentOpen]: isOpen,
            })}
          >
            {navbarContent}
          </div>
        </div>

        <div
          className={classNames(classes.Navbar__mobileOverlay, {
            [classes.Navbar__mobileOverlayActive]: isOpen,
          })}
          onClick={() => setIsOpen(false)}
        />
      </>
    );
  }

  return <div className={classes.Navbar}>{navbarContent}</div>;
};

export default Navbar;
