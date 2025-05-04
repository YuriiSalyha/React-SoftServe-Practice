// src/components/Footer/Footer.jsx
import React from "react";
import styles from "../../styles/footer.module.css";
import logo from "/logo.svg";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerColumn} ${styles.footerLogoCol}`}>
        <img src={logo} alt="КіноХмара" className={styles.footerLogo} />
        <div className={styles.footerCopy}>
          © 2025 "Cinemaverse" SoftServe Practice
        </div>
      </div>

      <div className={`${styles.footerColumn} ${styles.footerBookingCol}`}>
        <h4>ORDER A TICKET</h4>
        <a href="tel:+380632223898">+38 (063) 222 38 98</a>
        <a href="tel:+380981116154">+38 (098) 111 61 54</a>
      </div>

      <div className={`${styles.footerColumn} ${styles.footerContactsCol}`}>
        <div className={styles.contactRow}>
          <h4>Our Contacts:</h4>
          <a href="mailto:lorem.ipsum@gmail.com">lorem.ipsum@gmail.com</a>
        </div>
        <ul className={styles.teamList}>
          <li>Yurii Salyha</li>
          <li>Anton Boicheniuk</li>
          <li>Bohdan Vakulenko</li>
          <li>Dmytrii Zenko</li>
          <li>Olesia Synchuk</li>
          <li>Emilia Terada</li>
        </ul>
      </div>
    </footer>
  );
}
