import React from "react";
import ModalWrapper from "../../../ModalWrapper";
import styles from "./alertModal.module.css";

const AlertModal = ({
  handleAccept,
  handleRefuse,
  title = "delete?",
  msg = "Ви впевнені, що хочете видалить цей фільм?",
}) => {
  return (
    <ModalWrapper handleClose={handleRefuse}>
      <div className={styles.box}>
        <div className={styles.text__wrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="42px"
            viewBox="0 -960 960 960"
            width="42px"
            fill="#fff"
          >
            <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" />
          </svg>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.msg}>{msg}</p>
        </div>
        <div className={styles.btns__wrapper}>
          <button
            className={`${styles.btn} ${styles.refuse}`}
            onClick={handleRefuse}
            type="button"
          >
            Ні
          </button>

          <button
            className={`${styles.btn} ${styles.accept}`}
            onClick={handleAccept}
            type="button"
          >
            Так
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AlertModal;
