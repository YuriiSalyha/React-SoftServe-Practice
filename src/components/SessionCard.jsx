import React from 'react';
import styles from '../styles/sessioncard.module.css';

// Placeholder image for movie posters
const placeholderImage = 'https://via.placeholder.com/120x180.png?text=No+Image';

const SessionCard = ({ movie, sessions, onOrder }) => {
  // Compile all session times into a comma-separated string
  const sessionTimes = sessions.map(s => s.time).sort().join(', ');

  return (
    <div className={styles.card}>
      {/* Movie poster */}
      <img
        className={styles.poster}
        src={movie.poster || placeholderImage}
        alt={movie.title}
      />

      {/* Movie details */}
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p>Release Date: {movie.releaseDate}</p>
        <p>Country: {movie.country}</p>
        <p>Duration: {movie.duration}</p>
        <p>Age Limit: {movie.ageLimit}</p>
        <p>Genre: {movie.genre}</p>
        <p>
          Sessions: <span className={styles.times}>{sessionTimes}</span>
        </p>

        {/* Order ticket button */}
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
