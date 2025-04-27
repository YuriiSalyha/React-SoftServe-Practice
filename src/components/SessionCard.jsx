import React from 'react';
import styles from '../styles/sessioncard.module.css';

// Placeholder image for movie posters
const placeholderImage = 'https://via.placeholder.com/120x180.png?text=No+Image';

const SessionCard = ({ movie, sessions, onOrder }) => {
  // Збираємо всі часи сеансів у строку
  const sessionTimes = sessions.map(s => s.time).sort().join(', ');

  return (
    <div className={styles.card}>
      {/* Постер */}
      <img
        className={styles.poster}
        src={movie.poster || placeholderImage}
        alt={movie.title}
      />

      {/* Деталі фільму */}
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p>Дата виходу: {movie.releaseDate}</p>
        <p>Країна: {movie.country}</p>
        <p>Тривалість: {movie.duration}</p>
        <p>Вікові обмеження: {movie.ageLimit}</p>
        <p>Жанр: {movie.genre}</p>
        <p>
          Сеанси: <span className={styles.times}>{sessionTimes}</span>
        </p>

        {/* Оновлена кнопка: викликає onOrder з пропсів */}
        <button
          className={styles.buyButton}
          type="button"
          onClick={onOrder}
        >
          Замовити квиток
        </button>
      </div>
    </div>
  );
};

export default SessionCard;
