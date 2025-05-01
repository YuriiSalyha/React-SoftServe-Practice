import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import styles from '../styles/searchresult.module.css';

function SearchresultPage() {
  const [isDropdownOpen, setDropdownOpen] = useState(false); 
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]); 


  useEffect(() => {
    fetch('/data/movies.json')
      .then(response => response.json())
      .then(data => {
        const allGenres = new Set();
        data.forEach(movie => {
          movie.genres.forEach(genre => {
            allGenres.add(genre);
          });
        });
        setGenres([...allGenres]); 
        setMovies(data); 
      })
      .catch(error => {
        console.error('Помилка при завантаженні даних:', error);
      });
  }, []); 

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen); 
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <h2 className={styles.header}>Search result:</h2>

        <div className={styles.dropdownContainer}>
          <button className={styles.dropdownButton} onClick={toggleDropdown}>
            Жанр
          </button>

          {isDropdownOpen && (
            <ul className={styles.dropdownMenu}>
              {genres.map((genre, index) => (
                <li key={index}>
                  <Link to={`/genre/${genre.toLowerCase()}`}>{genre}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.movieDetails}>
          {movies.length > 0 && movies.map((movie, index) => (
            <div key={index} className={styles.moviePosterWrapper}>
              <Link to={`/movie/${movie.id}`}> 
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className={styles.moviePoster}
                />
              </Link>
              <h2>{movie.title}</h2>
              <p>{movie.duration} {movie.ageRestriction}</p>
              <p>{movie.genres.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchresultPage;
