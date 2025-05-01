import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import styles from '../styles/searchresult.module.css';

function SearchresultPage() {
  const [isGenreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [isAgeDropdownOpen, setAgeDropdownOpen] = useState(false);
  const [isCountryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);
  const [ages, setAges] = useState([]);
  const [countries, setCountries] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    fetch('/data/movies.json')
      .then(response => response.json())
      .then(data => {
        const genreSet = new Set();
        const yearSet = new Set();
        const ageSet = new Set();
        const countrySet = new Set();

        data.forEach(movie => {
          movie.genres.forEach(genre => genreSet.add(genre));
          const year = new Date(movie.releaseDate).getFullYear();
          yearSet.add(year);
          ageSet.add(movie.ageRestriction);
          countrySet.add(movie.country);
        });

        setGenres([...genreSet]);
        setYears([...yearSet].sort((a, b) => b - a));
        setAges([...ageSet]);
        setCountries([...countrySet]);
        setMovies(data);
      })
      .catch(error => {
        console.error('Помилка при завантаженні даних:', error);
      });
  }, []);

  const toggleGenreDropdown = () => setGenreDropdownOpen(!isGenreDropdownOpen);
  const toggleYearDropdown = () => setYearDropdownOpen(!isYearDropdownOpen);
  const toggleAgeDropdown = () => setAgeDropdownOpen(!isAgeDropdownOpen);
  const toggleCountryDropdown = () => setCountryDropdownOpen(!isCountryDropdownOpen);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setGenreDropdownOpen(false);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setYearDropdownOpen(false);
  };

  const handleAgeSelect = (age) => {
    setSelectedAge(age);
    setAgeDropdownOpen(false);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCountryDropdownOpen(false);
  };

  // Окремі функції скидання
  const resetGenre = () => {
    setSelectedGenre('');
    setGenreDropdownOpen(false);
  };

  const resetYear = () => {
    setSelectedYear('');
    setYearDropdownOpen(false);
  };

  const resetAge = () => {
    setSelectedAge('');
    setAgeDropdownOpen(false);
  };

  const resetCountry = () => {
    setSelectedCountry('');
    setCountryDropdownOpen(false);
  };

  const filteredMovies = movies.filter(movie => {
    const matchGenre = selectedGenre ? movie.genres.includes(selectedGenre) : true;
    const matchYear = selectedYear ? new Date(movie.releaseDate).getFullYear() === selectedYear : true;
    const matchAge = selectedAge ? movie.ageRestriction === selectedAge : true;
    const matchCountry = selectedCountry ? movie.country === selectedCountry : true;
    return matchGenre && matchYear && matchAge && matchCountry;
  });

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <h2 className={styles.header}>Search result:</h2>

        {/* Блок із фільтрами */}
        <div className={styles.filtersContainer}>

          {/* Жанр */}
          <div className={styles.dropdownContainer}>
            <button className={styles.dropdownButton} onClick={toggleGenreDropdown}>
              {selectedGenre || 'Жанр'}
            </button>
            {isGenreDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li><button onClick={resetGenre}>Всі фільми</button></li>
                {genres.map((genre, index) => (
                  <li key={index}>
                    <button onClick={() => handleGenreSelect(genre)}>{genre}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Рік виходу */}
          <div className={styles.dropdownContainer}>
            <button className={styles.dropdownButton} onClick={toggleYearDropdown}>
              {selectedYear || 'Рік виходу'}
            </button>
            {isYearDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li><button onClick={resetYear}>Всі роки</button></li>
                {years.map((year, index) => (
                  <li key={index}>
                    <button onClick={() => handleYearSelect(year)}>{year}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Вікова категорія */}
          <div className={styles.dropdownContainer}>
            <button className={styles.dropdownButton} onClick={toggleAgeDropdown}>
              {selectedAge || 'Вікова категорія'}
            </button>
            {isAgeDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li><button onClick={resetAge}>Всі категорії</button></li>
                {ages.map((age, index) => (
                  <li key={index}>
                    <button onClick={() => handleAgeSelect(age)}>{age}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Країна */}
          <div className={styles.dropdownContainer}>
            <button className={styles.dropdownButton} onClick={toggleCountryDropdown}>
              {selectedCountry || 'Країна'}
            </button>
            {isCountryDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li><button onClick={resetCountry}>Всі країни</button></li>
                {countries.map((country, index) => (
                  <li key={index}>
                    <button onClick={() => handleCountrySelect(country)}>{country}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Вивід фільмів */}
        <div className={styles.movieDetails}>
          {filteredMovies.length > 0 ? filteredMovies.map((movie, index) => (
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
              <p><strong>Рік:</strong> {new Date(movie.releaseDate).getFullYear()}</p>
              <p><strong>Країна:</strong> {movie.country}</p>
            </div>
          )) : <p>Фільмів не знайдено</p>}
        </div>
      </div>
    </div>
  );
}

export default SearchresultPage;
