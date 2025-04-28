import React from "react";
import styles from "../styles/IsSigned.module.css";
const IsSigned = () => {
  const auth = true;

  if (auth) {
    return (
      <div className={styles.profile}>
        <div className={styles.icon}>
          <img src="/user_icon.svg" alt="user" />
        </div>
        <h3 className={styles.text}>Профіль</h3>
      </div>
    );
  }

  return <div>Увійти</div>;
};

export default IsSigned;
