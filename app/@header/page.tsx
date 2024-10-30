import Button from "@/src/components/interactive/button";

import classes from './page.module.css';

const Header = () => {
  return (
    <header className={classes.Header}>
      <h1 className={classes.pageTitle}>Jake History</h1>

      <div>
        <span>검색</span>
        <Button type="default">
          Create New History
        </Button>
      </div>
    </header>
  );
}

export default Header;
