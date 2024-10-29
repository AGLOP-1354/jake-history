import classes from './page.module.css';
import Button from "@/src/components/button";

const Header = () => {
  return (
    <header className={classes.Header}>
      <h1 className={classes.pageTitle}>Jake History</h1>

      <div>
        <Button>Create New History</Button>
      </div>
    </header>
  );
}

export default Header;
