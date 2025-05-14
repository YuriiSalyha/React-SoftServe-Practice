import React from "react";
import styles from "./label.module.css";

const Label = ({ children, ...props }) => {
  return (
    <label className={styles.label} {...props}>
      {children}
    </label>
  );
};

export default Label;
