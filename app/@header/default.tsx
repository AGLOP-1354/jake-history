"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IconSearch } from "@tabler/icons-react";

import Button from "@/src/components/interactive/button";

import classes from "./page.module.css";

const NOT_RENDERED_PATHNAME = ["/history/create"];

const Header = () => {
  const pathname = usePathname();

  if (NOT_RENDERED_PATHNAME.includes(pathname)) return <></>;

  return (
    <header className={classes.Header}>
      <Link href="/" className={classes.link}>
        <h1 className={classes.pageTitle}>Jake History</h1>
      </Link>

      <div className={classes.headerRightItems}>
        <IconSearch className={classes.searchIcon} onClick={() => console.log("a")} width={20} height={20} />

        <Link href="/history/create">
          <Button type="default" style={{ border: "2px solid var(--text-200)" }}>
            Create New History
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
