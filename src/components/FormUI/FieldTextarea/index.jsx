import React from "react";
import styles from "./fieldTextarea.module.css";
import { Field } from "../index";

const FieldTextarea = ({ error, ...props }) => {
  return (
    <Field error={error}>
      <textarea className={styles.field__textarea} {...props} />
    </Field>
  );
};

export default FieldTextarea;
