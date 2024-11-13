"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { HistoryType } from "@/src/lib/types/history";
import Divider from "@/src/components/display/divider";
import Input from "@/src/components/interactive/input";

import classes from "../_styles/navbar.module.css";

type Props = {
  historiesByCategory: HistoryType[];
};

const Navbar = ({ historiesByCategory }: Props) => {
  const [searchValue, setSearchValue] = useState("");

  const filteredHistories = useMemo(() => {
    return historiesByCategory.filter((history) => history.title.includes(searchValue));
  }, [searchValue, historiesByCategory]);

  return (
    <div className={classes.Navbar}>
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
          <Link href={`/history/${history.id}`} key={history.id} className={classes.Navbar__listItem}>
            {history.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
