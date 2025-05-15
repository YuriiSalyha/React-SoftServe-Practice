import { useState, useEffect, useRef,  } from 'react';
import { Link, useLocation} from 'react-router-dom';
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
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;
  const genreRef = useRef(null);
  const yearRef = useRef(null);
  const ageRef = useRef(null);
  const countryRef = useRef(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search")?.toLowerCase() || ""; 

  useEffect(() => {
    setCurrentPage(1); 
  }, [query]);

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
        console.error("Error fetching movies data:", error);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        genreRef.current && !genreRef.current.contains(event.target) &&
        yearRef.current && !yearRef.current.contains(event.target) &&
        ageRef.current && !ageRef.current.contains(event.target) &&
        countryRef.current && !countryRef.current.contains(event.target)
      ) {
        setGenreDropdownOpen(false);
        setYearDropdownOpen(false);
        setAgeDropdownOpen(false);
        setCountryDropdownOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  const toggleGenreDropdown = () => {
    setGenreDropdownOpen(!isGenreDropdownOpen);
    setYearDropdownOpen(false);
    setAgeDropdownOpen(false);
    setCountryDropdownOpen(false);
  };

  const toggleYearDropdown = () => {
    setYearDropdownOpen(!isYearDropdownOpen);
    setGenreDropdownOpen(false);
    setAgeDropdownOpen(false);
    setCountryDropdownOpen(false);
  };

  const toggleAgeDropdown = () => {
    setAgeDropdownOpen(!isAgeDropdownOpen);
    setGenreDropdownOpen(false);
    setYearDropdownOpen(false);
    setCountryDropdownOpen(false);
  };

  const toggleCountryDropdown = () => {
    setCountryDropdownOpen(!isCountryDropdownOpen);
    setGenreDropdownOpen(false);
    setYearDropdownOpen(false);
    setAgeDropdownOpen(false);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setGenreDropdownOpen(false);
    setCurrentPage(1);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setYearDropdownOpen(false);
    setCurrentPage(1);
  };

  const handleAgeSelect = (age) => {
    setSelectedAge(age);
    setAgeDropdownOpen(false);
    setCurrentPage(1);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCountryDropdownOpen(false);
    setCurrentPage(1);
  };

  const resetGenre = () => {
    setSelectedGenre('');
    setGenreDropdownOpen(false);
    setCurrentPage(1);
  };

  const resetYear = () => {
    setSelectedYear('');
    setYearDropdownOpen(false);
    setCurrentPage(1);
  };

  const resetAge = () => {
    setSelectedAge('');
    setAgeDropdownOpen(false);
    setCurrentPage(1);
  };

  const resetCountry = () => {
    setSelectedCountry('');
    setCountryDropdownOpen(false);
    setCurrentPage(1);
  };

  const filteredMovies = movies.filter(movie => {
    const matchQuery = query ? movie.title.toLowerCase().includes(query) : true;
    const matchGenre = selectedGenre ? movie.genres.includes(selectedGenre) : true;
    const matchYear = selectedYear ? new Date(movie.releaseDate).getFullYear() === selectedYear : true;
    const matchAge = selectedAge ? movie.ageRestriction === selectedAge : true;
    const matchCountry = selectedCountry ? movie.country === selectedCountry : true;
    return matchQuery && matchGenre && matchYear && matchAge && matchCountry;
  });

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <h2 className={styles.header}>Search result: {query.toUpperCase()}</h2>

        {/* Блок із фільтрами */}
        <div className={styles.filtersContainer}>

          {/* Жанр */}
          <div className={styles.dropdownContainer} ref={genreRef}>
            <button className={styles.dropdownButton} onClick={toggleGenreDropdown}>
              {selectedGenre || 'Genre'}
            </button>
            {isGenreDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li><button onClick={resetGenre}>All movies</button></li>
                {genres.map((genre, index) => (
                  <li key={index}>
                    <button onClick={() => handleGenreSelect(genre)}>{genre}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Рік виходу */}
          <div className={styles.dropdownContainer} ref={yearRef}>
            <button className={styles.dropdownButton} onClick={toggleYearDropdown}>
              {selectedYear || 'Release year'}
            </button>
            {isYearDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li><button onClick={resetYear}>All years</button></li>
                {years.map((year, index) => (
                  <li key={index}>
                    <button onClick={() => handleYearSelect(year)}>{year}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Вікова категорія */}
          <div className={styles.dropdownContainer} ref={ageRef}>
            <button className={styles.dropdownButton} onClick={toggleAgeDropdown}>
              {selectedAge || 'Age categorys'}
            </button>
            {isAgeDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li><button onClick={resetAge}>All categories</button></li>
                {ages.map((age, index) => (
                  <li key={index}>
                    <button onClick={() => handleAgeSelect(age)}>{age}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Країна */}
          <div className={styles.dropdownContainer} ref={countryRef}>
            <button className={styles.dropdownButton} onClick={toggleCountryDropdown}>
              {selectedCountry || 'Country'}
            </button>
            {isCountryDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li><button onClick={resetCountry}>All countries</button></li>
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
          {filteredMovies.length > 0 ? (
            currentMovies.map((movie, index) => (
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
            ))
          ) : (
            <p className={styles.notFound}>No movies found</p>
          )}
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          {currentPage > 1 && (
            <button 
              onClick={handlePrevPage} 
              className={styles.paginationButton}
            >
              🡠
            </button>
          )}

          {[...Array(totalPages)].map((_, index) => (
            <button 
              key={index} 
              onClick={() => handlePageSelect(index + 1)} 
              className={`${styles.paginationButton} ${currentPage === index + 1 ? styles.active : ''}`}
            >
              {index + 1}
            </button>
          ))}

          {currentPage < totalPages && (
            <button 
              onClick={handleNextPage} 
              className={styles.paginationButton}
            >
              🡢
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchresultPage;
