import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/search.module.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/movies?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      className={styles.search}
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <div className={styles.search__icon}></div>
      <input
        className={styles.search__field}
        placeholder="search..."
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className={styles.search__submit}
      >
        <img src="/icons/search_icon.svg" alt="search" />
      </button>
    </form>
  );
};

export default Search;
