"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { IconBrandGithubFilled, IconEdit, IconTimeline } from "@tabler/icons-react";

import Button from "@/src/components/interactive/button";
import useViewport from "@/src/lib/hooks/useViewport";
import { CREATABLE_IP_ADDRESS } from "@/src/lib/constants/creatableIpAdress";

import classes from "../page.module.css";

const NOT_RENDERED_PATHNAME = ["/history/create"];

const Header = ({ ipAddress }: { ipAddress: string | null }) => {
  const pathname = usePathname();
  const { isMobile } = useViewport();

  const isCreatable = CREATABLE_IP_ADDRESS.includes(ipAddress || "");

  if (NOT_RENDERED_PATHNAME.includes(pathname)) return <></>;

  return (
    <header className={classes.HeaderWrapper}>
      <div className={classes.Header}>
        <Link href="/" className={classes.link}>
          <Image
            src="/images/jake-history.png"
            alt="Jake History"
            width={56}
            height={56}
            quality={100}
            className={classes.logo}
          />
          <h1 className={classes.pageTitle}>
            Jake
            <br />
            History
          </h1>
        </Link>

        <div className={classes.headerRightItems}>
          <Link href="/analytics" className={classNames(classes.headerRightItem, classes.analyticsLink)}>
            <IconTimeline width="1.5rem" height="1.5rem" />
          </Link>

          <Link
            href="https://github.com/AGLOP-1354"
            target="_blank"
            className={classNames(classes.githubLink, classes.headerRightItem)}
          >
            <IconBrandGithubFilled width="1rem" height="1rem" />
          </Link>

          {!isMobile && isCreatable && (
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
