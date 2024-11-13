"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IconEdit } from "@tabler/icons-react";

import Button from "@/src/components/interactive/button";

import classes from "./page.module.css";

const NOT_RENDERED_PATHNAME = ["/history/create"];

const Header = () => {
  const pathname = usePathname();

  if (NOT_RENDERED_PATHNAME.includes(pathname)) return <></>;

  return (
    <header className={classes.HeaderWrapper}>
      <div className={classes.Header}>
        <Link href="/" className={classes.link}>
          <Image src="/images/jake-history.png" alt="Jake History" width={56} height={56} quality={100} className={classes.logo} />
          <h1 className={classes.pageTitle}>
            Jake
            <br />
            History
          </h1>
        </Link>

        <div className={classes.headerRightItems}>
          <Link href="/history/create">
            <Button type="text">
              <IconEdit />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
