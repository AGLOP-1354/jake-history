"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { IconBrandGithubFilled, IconEdit } from "@tabler/icons-react";

import Button from "@/src/components/interactive/button";
import useViewport from "@/src/lib/hooks/useViewport";

import classes from "./page.module.css";

const NOT_RENDERED_PATHNAME = ["/history/create"];

const Header = () => {
  const pathname = usePathname();
  const { isMobile } = useViewport()

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
          <Link href="https://github.com/AGLOP-1354" target="_blank" className={classNames(classes.githubLink, classes.headerRightItem)}>
            <IconBrandGithubFilled width="1rem" height="1rem" />
          </Link>

          {!isMobile && (
          <Link href="/history/create" className={classNames(classes.writeHistory, classes.headerRightItem)}>
              <Button type="text" style={{ padding: 0 }}>
                <IconEdit />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
