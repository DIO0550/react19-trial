import { memo } from "react";
import { Outlet } from "react-router";

import { NavLink } from "react-router";
import styles from "./layouts.module.scss";

const Layout = memo(() => (
  <div className={styles.layout}>
    <header className={styles.header}>
      <NavLink to={"/"} end>
        ホームに戻る
      </NavLink>
    </header>
    <Outlet />
    <footer className={styles.footer}>フッター</footer>
  </div>
));

export default Layout;
