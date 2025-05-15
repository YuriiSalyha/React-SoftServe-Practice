import React from "react";
import styles from './field.module.css';

const Field = ({ error, children }) => {
  return (
    <div className={styles.field}>
      {children}
      {error && <p className={styles.field__error}>{error.message}</p>}
    </div>
  );
};

export default Field;
