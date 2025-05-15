// src/components/Footer/Footer.jsx
import React from "react";
import styles from "../../styles/footer.module.css";
import logo from "/logo.svg";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerMain}>
          <div className={styles.footerBrand}>
            <img src={logo} alt="Cinemaverse" className={styles.footerLogo} />
            <p className={styles.footerDescription}>
              Your ultimate destination for online movie streaming. Watch the
              latest releases and classic films in high quality.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <FaFacebook />
              </a>
              <a href="#" className={styles.socialLink}>
                <FaTwitter />
              </a>
              <a href="#" className={styles.socialLink}>
                <FaInstagram />
              </a>
              <a href="#" className={styles.socialLink}>
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.footerSection}>
              <h4>Navigation</h4>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/SessionsPage">Sessions</a>
                </li>
                <li>
                  <a href="/SignInPage">Sign In</a>
                </li>
                <li>
                  <a href="/SignUp">Sign Up</a>
                </li>
                <li>
                  <a href="/FavoritePae">Favourites</a>
                </li>
              </ul>
            </div>

            <div className={styles.footerSection}>
              <h4>Contact Info</h4>
              <ul className={styles.contactInfo}>
                <li>
                  <MdLocationOn />
                  <span>123 Cinema Street, Kyiv, Ukraine</span>
                </li>
                <li>
                  <MdPhone />
                  <span>+38 (063) 222 38 98</span>
                </li>
                <li>
                  <MdEmail />
                  <span>support@cinemaverse.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            © 2025 "Cinemaverse" SoftServe Practice .
          </div>
          <div className={styles.teamCredits}>
            <span>Created by: </span>
            <ul>
              <li>Yurii Salyha</li>
              <li>Yurii Flysnyk</li>
              <li>Anton Boicheniuk</li>
              <li>Bohdan Vakulenko</li>
              <li>Dmytrii Zenko</li>
              <li>Olesia Synchuk</li>
              <li>Emiliia Terada</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
