import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/search.module.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    fetch("/data/movies.json")
      .then((response) => response.json())
      .then((data) => setAllMovies(data));
  }, []);

  // Фільтрація фільмів на основі введеної букви
  useEffect(() => {
    if (query.trim()) {
      const filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered.slice(0, 4));
      setShowSuggestions(true);
    } else {
      setFilteredMovies([]);
      setShowSuggestions(false);
    }
  }, [query, allMovies]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?search=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  const handleMovieSelect = (movieId) => {
    navigate(`/movie/${movieId}`);
    setShowSuggestions(false);
    setQuery("");
  };

  // Закриття меню при натисканні поза контейнером або на Enter
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Закриття меню при натисканні Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div ref={searchRef}>
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
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown} 
        />
        <button type="submit" className={styles.search__submit}>
          <img src="/icons/search_icon.svg" alt="search" />
        </button>
      </form>

      {showSuggestions && filteredMovies.length > 0 && (
        <div className={styles.suggestions}>
          <div className={styles.movieList}>
            {filteredMovies.map((movie, index) => (
              <div key={index} className={styles.movieItem}>
                <button
                  onClick={() => handleMovieSelect(movie.id)}
                  className={styles.movieLink}
                >
                  <img src={movie.poster} alt={movie.title} />
                  <h4>{movie.title}</h4>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
