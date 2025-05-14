import React from "react";
import styles from "./movieForm.module.css";
import { Form } from "../../../FormUI/index";
const AddMovieForm = ({ handleSubmit, posterWatcher, children }) => {
  return (
    <div className={styles.wrapper}>
      {/* poster preview */}
      <div className={styles.poster_preview__wrapper}>
        {posterWatcher ? (
          <img
            className={styles.poster_preview__img}
            src={posterWatcher}
            alt="poster"
          />
        ) : (
          <p className={styles.poster_preview__text}>Вигляд постеру</p>
        )}
      </div>
      <Form className={styles.form} onSubmit={handleSubmit}>
        {children}
      </Form>
    </div>
  );
};

export default AddMovieForm;
