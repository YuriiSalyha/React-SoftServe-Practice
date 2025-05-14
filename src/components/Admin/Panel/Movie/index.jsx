import React from "react";
import { Link } from "react-router-dom";
import styles from "./movie.module.css";

const Movie = ({ data, isEditable = true, deleteAction }) => {

  return (
    <div className={styles.movie}>
      {isEditable && (
        <div className={styles.block}>
          <button type="button" onClick={deleteAction} className={`${styles.btn} ${styles.delete}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#fff"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
        </div>
      )}

      <Link to={`/admin/movie/${data.id}`}>
        <img className={styles.image} src={data.poster} alt={data.title} />
      </Link>

      <h2 className={styles.title}>{data.title}</h2>
      <p className={styles.info}>
        {data.duration} {data.ageRestriction}
      </p>
      <p className={styles.info}>{data.genres.join(", ")}</p>
    </div>
  );
};

export default Movie;
