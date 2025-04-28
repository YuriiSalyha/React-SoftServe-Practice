import React from "react";
import { Link } from "react-router-dom"; // Імпортуємо Link
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
          <Link to="/">сеанси</Link>
        </li>
        <li className={styles.list__item}>
          <Link to="/favored">Фільми</Link>
        </li>
      </ul>
      <Search />

      <IsSigned />
    </div>
  );
};

export default Header;
