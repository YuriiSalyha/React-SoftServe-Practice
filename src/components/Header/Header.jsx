import React from "react";
import styles from "../../styles/header.module.css";
import IsSigned from "./IsSigned";
import Search from "./Search";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo.svg" alt="logo" />
      </div>

      <ul className={styles.list}>
        <li className={styles.list__item}>
          <a href="/sessions">Sessions</a>
        </li>
        <li className={styles.list__item}>
          <a href="/">Movies</a>
        </li>
      </ul>
      <Search />

      <IsSigned />
    </div>
  );
};

export default Header;
