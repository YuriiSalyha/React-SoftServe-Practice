import React from 'react';
import styles from '../styles/sessioncard.module.css';

// Placeholder image for movie posters (using a placeholder service or local asset)
const placeholderImage = 'https://via.placeholder.com/120x180.png?text=No+Image';

const SessionCard = ({ movie, sessions }) => {
  // Extract all session times for this movie (assuming sessions is an array of session objects for one movie on the selected date)
  const sessionTimes = sessions.map(s => s.time).sort().join(', ');

  return (
    <div className={styles.card}>
      {/* Movie Poster */}
      <img 
        className={styles.poster}
        src={movie.poster || placeholderImage}
        alt={movie.title}
      />
      {/* Movie Details */}
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p>Дата виходу: {movie.releaseDate}</p>
        <p>Країна: {movie.country}</p>
        <p>Тривалість: {movie.duration}</p>
        <p>Вікові обмеження: {movie.ageLimit}</p>
        <p>Жанр: {movie.genre}</p>
        <p>Сеанси: <span className={styles.times}>{sessionTimes}</span></p>
        <button className={styles.buyButton} type="button">Замовити квиток</button>
      </div>
    </div>
  );
};

export default SessionCard;
