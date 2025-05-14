import React from "react";
import styles from "./submitButton.module.css";

const SubmitButton = ({ text }) => {
  return (
    <button className={styles.btn__submit} type="submit">
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default SubmitButton;
