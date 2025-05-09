import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import styles from "../../styles/IsSigned.module.css";
import ProfileModal from "../ProfileModal"; // імпорт модалки

const IsSigned = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProfileModal = (e) => {
    e.preventDefault(); // щоб не переходити за посиланням
    setIsModalOpen(true);
  };

  const closeProfileModal = () => setIsModalOpen(false);

  if (isAuthenticated) {
    return (
      <>
        <div className={styles.wrapper}>
          {/* favorites */}
          <div className={styles.col}>
            <a className={styles.col__link} href="/favorite">
              <div className={styles.col__icon}>
                <img src="/icons/heart_icon.svg" alt="favor" />
              </div>
              <h3 className={styles.col__text}>Favorites</h3>
            </a>
          </div>
          {/* profile */}
          <div className={styles.col}>
            <a className={styles.col__link} href="#" onClick={openProfileModal}>
              <div className={styles.col__icon}>
                <img src="/icons/user_icon.svg" alt="user" />
              </div>
              <h3 className={styles.col__text}>Profile</h3>
            </a>
          </div>
        </div>
        <ProfileModal isOpen={isModalOpen} onClose={closeProfileModal} />
      </>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.col}>
        <a className={styles.col__link} href="/signIn">
          <div className={styles.col__icon}>
            <img src="/icons/user_icon.svg" alt="user" />
          </div>
          <h3 className={styles.col__text}>Sign in</h3>
        </a>
      </div>
    </div>
  );
};

export default IsSigned;
