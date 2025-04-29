import React from "react";
import styles from "../../styles/search.module.css";
const Search = () => {
  return (
    <form className={styles.search}>
      {/* icon */}
      <div className={styles.search__icon}></div>
      {/* input field */}
      <input
        className={styles.search__field}
        placeholder="search..."
        type="text"
      />
      {/* submit button */}
      <button type="button" className={styles.search__submit}>
        <img src="/icons/search_icon.svg" alt="search" />
      </button>
    </form>
  );
};

export default Search;
