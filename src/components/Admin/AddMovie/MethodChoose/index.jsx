import React, { useState } from "react";
import { LoadJsonFile, AddMovieForm } from "../index";
import styles from "./methodChoose.module.css";

const MethodChoose = () => {
  const [method, setMethod] = useState(null);

  const handleChangeMethod = (value) => {
    setMethod(value);
  };

  const handleClearMethod = () => {
    setMethod(null);
  };

  return (
    <div>
      {method && (
        <button
          className={`${styles.btn}`}
          onClick={handleClearMethod}
          type="button"
        >
          Змінити метод
        </button>
      )}

      {!method && (
        <div className={styles.choose_box}>
          <h1 className={styles.title}>Виберіть метод для заповнення даних</h1>

          <div className={styles.btns__wrapper}>
            <button
              className={`${styles.btn}`}
              onClick={() => handleChangeMethod("load")}
              type="button"
            >
              Завантажити дані
            </button>
            <button
              className={`${styles.btn}`}
              onClick={() => handleChangeMethod("self")}
              type="button"
            >
              Заповнити самостійно
            </button>
          </div>
        </div>
      )}

      <div>
        {method === "load" && <LoadJsonFile />}
        {method === "self" && <AddMovieForm />}
      </div>
    </div>
  );
};

export default MethodChoose;
