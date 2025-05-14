import React from "react";
import styles from "./fieldRow.module.css";

const FieldRow = ({ children }) => {
  return <div className={styles.form_row_box}>{children}</div>;
};

export default FieldRow;
