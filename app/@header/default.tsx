'use client';

import { usePathname } from 'next/navigation';
import Link from "next/link";

import Button from "@/src/components/interactive/button";

import classes from './page.module.css';
import React from "react";

const NOT_RENDERED_PATHNAME = ['/history/create']

const Header = () => {
  const pathname = usePathname();

  if (NOT_RENDERED_PATHNAME.includes(pathname)) return <></>;

  return (
    <>
      <header className={classes.Header}>
        <h1 className={classes.pageTitle}>Jake History</h1>

        <div>
          <span>검색</span>

          <Link href="/history/create">
            <Button type="default">
              Create New History
            </Button>
          </Link>
        </div>
      </header>
      <div style={{ height: 1, width: '100svw', background: '#9e9e9e' }} />
    </>
  );
}

export default Header;
