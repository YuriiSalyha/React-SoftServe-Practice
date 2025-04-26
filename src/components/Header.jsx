import React from "react";
import styles from "../styles/header.module.css";
import IsSigned from "./IsSigned";
import Search from "./Search";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>logo</div>

      <ul className={styles.list}>
        <li className={styles.list__item}>сеанси</li>
        <li className={styles.list__item}>Фільми</li>
      </ul>
      <Search />

      <IsSigned />
    </div>
  );
};

export default Header;
