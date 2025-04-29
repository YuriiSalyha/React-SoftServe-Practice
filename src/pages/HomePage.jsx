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

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

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
      <img src="img\posters/image1.png" alt="Стражі Галактики" className={styles.slideImage} />
      <h2 className={styles.slideTitle}>GUARDIANS OF THE GALAXY IS NOW IN THE MOVIES</h2>
    </div>
    <div className={styles.slide}>
      <img src="img\posters/image2.png" alt="Майнкрафт" className={styles.slideImage} />
      <h2 className={styles.slideTitle}>MINECRAFT NOW IN THE CINEMA</h2>
    </div>
    <div className={styles.slide}>
      <img src="img\posters/image3.png" alt="Опенгеймер" className={styles.slideImage} />
      <h2 className={styles.slideTitle}>OPPENGEIMER IS NOW IN THE CINEMA</h2>
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
