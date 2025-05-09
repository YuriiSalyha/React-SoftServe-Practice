import React from "react";
import styles from "../styles/ProfileModal.module.css";

const ProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.header}>
          <div className={styles.avatar}>
            <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="User" />
          </div>
          <div>
            <div className={styles.username}>Pufic2005</div>
            <div className={styles.role}>Група користувача: Адмін</div>
          </div>
        </div>

        <div className={styles.buttonGrid}>
          <button className={styles.actionButton}>
            ⚙️ Редагувати профіль
          </button>
          <button className={styles.actionButton}>
            🛠️ Адмінка
          </button>
          <button className={styles.actionButton}>
            ↩️ Вийти
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
