import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import styles from '../styles/Home.module.css';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch('/data/movies.json')
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  // Функція для попереднього слайду
  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };

  // Функція для наступного слайду
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 60000); // 3 секунди зміна слайдера

    // Очищення інтервалу при виході з компонента
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>NOW IN THE CINEMA</h1>
        </header>

        <div className={styles.sliderWrapper}>
          <div
            className={styles.sliderTrack}
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            <div className={styles.slide}>
              <img src="img/posters/image1.png" alt="MISSION IMPOSSIBLE" className={styles.slideImage} />
              <h2 className={styles.slideTitle}>MISSION IMPOSSIBLE: FINAL PAYOFF COMING SOON TO THE MOVIES</h2>
            </div>
            <div className={styles.slide}>
              <img src="img/posters/image2.png" alt="LILO AND STITCH" className={styles.slideImage} />
              <h2 className={styles.slideTitle}>LILO AND STITCH COMING SOON TO THE MOVIES</h2>
            </div>
            <div className={styles.slide}>
              <img src="img/posters/image3.png" alt="HOW TO TRAIN YOUR DRAGON" className={styles.slideImage} />
              <h2 className={styles.slideTitle}>HOW TO TRAIN YOUR DRAGON COMING SOON TO THE MOVIE</h2>
            </div>
            <div className={styles.slide}>
              <img src="img/posters/image4.png" alt="Bal" className={styles.slideImage} />
              <h2 className={styles.slideTitle}>HOW TO TRAIN YOUR DRAGON COMING SOON TO THE MOVIE</h2>
            </div>
          </div>

          <div className={styles.sliderNavigation}>
            <div className={styles.scrollbarLeftArrow} onClick={handlePrev}>
              <img className={styles.arrowImage} src="/Arrow-L.svg" alt="Стрілка вліво" />
            </div>
            <div className={styles.scrollbarRightArrow} onClick={handleNext}>
              <img className={styles.arrowImage} src="/Arrow-R.svg" alt="Стрілка вправо" />
            </div>
          </div>
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

export default HomePage;
