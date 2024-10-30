import Button from "@/src/components/interactive/button";

import classes from './page.module.css';
import Link from "next/link";

const Header = () => {
  return (
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
  );
}

export default Header;
