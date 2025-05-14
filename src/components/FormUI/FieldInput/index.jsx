import React from "react";
import styles from "./field.module.css";
import { Field } from "../index";

const FieldInput = ({ error, ...props }) => {
  return (
    <Field error={error}>
      <input className={styles.field__input} {...props} />
    </Field>
  );
};

export default FieldInput;
