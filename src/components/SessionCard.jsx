// src/components/SessionCard.jsx
import React from 'react';
import styles from '../styles/sessioncard.module.css';

// Заглушка для постера, якщо його немає
const PLACEHOLDER = 'https://via.placeholder.com/120x180.png?text=No+Image';

const SessionCard = ({ movie = {}, sessions = [], onOrder }) => {
  // Деструктуруємо властивості фільму з фолбеками
  const {
    title              = 'No Title',
    poster             = PLACEHOLDER,
    releaseDate        = '—',
    country            = '—',
    duration           = '—',
    ageRestriction     = '—',      // ось воно
    genre,
    genres
  } = movie;

  // Підтримка масиву або рядка жанрів
  const genreText = Array.isArray(genres)
    ? genres.join(', ')
    : genre || '—';

  // Склеюємо часи сеансів
  const sessionTimes = sessions
    .map(s => s.time)
    .sort()
    .join(', ') || '—';

  return (
    <div className={styles.card}>
      {/* Постер фільму */}
      <img
        className={styles.poster}
        src={poster}
        alt={title}
      />

      {/* Деталі */}
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>

        <p>Release Date: <strong>{releaseDate}</strong></p>
        <p>Country: <strong>{country}</strong></p>
        <p>Duration: <strong>{duration} min</strong></p>

        {/* Використовуємо ageRestriction */}
        <p>Age Restriction: <strong>{ageRestriction}</strong></p>
        <p>Genre: <strong>{genreText}</strong></p>

        <p>
          Sessions:&nbsp;
          <span className={styles.times}>{sessionTimes}</span>
        </p>

        <button
          className={styles.buyButton}
          type="button"
          onClick={onOrder}
        >
          Order Ticket
        </button>
      </div>
    </div>
  );
};

export default SessionCard;
