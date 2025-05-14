import React from "react";
import styles from "../styles/modalWrapper.module.css";
import useClickoutSide from "../hooks/useClickoutSide";

const ModalWrapper = ({ handleClose, children }) => {
  const { ref } = useClickoutSide({ handleClose });

  return (
    <div className={styles.block__wrapper}>
      <div ref={ref} className={styles.block}>
        {children}

        {/* close button */}
        <button
          onClick={handleClose}
          className={`${styles.btn} ${styles.close}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#fff"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ModalWrapper;
