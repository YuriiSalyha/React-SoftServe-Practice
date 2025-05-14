import React, { useState } from "react";
import { useEffect } from "react";
import MovieApi from "../../../../api/Movies";
import styles from "./LoadJsonFile.module.css";

const SendingStatus = (status) => {
  switch (status) {
    case "fail":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#FFF"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      );
    case "success":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#FFF"
        >
          <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
      );
    case null:
    default:
      return "Додати";
  }
};

const LoadJsonFile = () => {
  const [isSuccess, setIsSuccess] = useState(null); // success, fail, loading
  const [file, setFile] = useState(null);

  const {insertMany} = MovieApi();
  const handleChangeFile = (e) => {
    let file = e.target.files;

    if (file && file[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          setFile(json);
        } catch (error) {
          setIsSuccess("fail");
          console.log(error);
        }
      };
      reader.readAsText(file[0]);
    }
  };
  const handleClearFile = () => {
    setFile(null);
  };

  const onSubmit = () => {
    setIsSuccess("loading");
    // перед відправкой показати повідомлення, і в повідомленні можна буде переглянуть те, що було додано
    // Може якщо буде час зробити перевірку
    console.log(file);

    if (file) {
      insertMany(file);
      setIsSuccess("success");
    }
  };

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div className={styles.box}>
      <div className={styles.form}>
        <label className={styles.label} htmlFor="choosen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="152px"
            viewBox="0 -960 960 960"
            width="152px"
            fill="#fff"
          >
            <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
          </svg>
        </label>

        <p className={styles.subtitle}>Файл має бути у форматі .json</p>

        <input
          className={styles.input}
          type="file"
          onChange={handleChangeFile}
          id="choosen"
          accept=".json"
        />
      </div>

      <button
        className={styles.btn__submit}
        disabled={!file}
        onClick={onSubmit}
        type="button"
      >
        {SendingStatus(isSuccess)}
      </button>
    </div>
  );
};

export default LoadJsonFile;
