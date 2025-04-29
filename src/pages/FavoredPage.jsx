import React, { useEffect, useState } from "react";
import {
  addTestFavorites,
  getFullFavorites,
} from "../utils/localStorageFavoriteUtils";
import styles from "../styles/Favored.module.css";

function FavoredPage() {
  const [movies, setMovies] = useState([]);

  // Тест
  useEffect(() => {
    addTestFavorites(); // Додаємо тестові ID фільмів
    const fetchMovies = async () => {
      const favoriteMovies = await getFullFavorites(); // Отримуємо повні дані фільмів
      setMovies(favoriteMovies);
    };
    fetchMovies(); // Викликаємо функцію для отримання фільмів
  }, []);

  return (
    <div className={styles.favoredPage}>
      <h2 className={styles.headerTitle}>Added to favorites:</h2>
      <div className={styles.moviesGrid}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <img src={movie.poster} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>
              {movie.duration} | {movie.ageRestriction}
            </p>
            <p>{movie.genres}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoredPage;
