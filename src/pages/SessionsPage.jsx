/* src/pages/SessionsPage.jsx */
import React, { useState, useEffect } from 'react';
import SessionCard from '../components/SessionCard';
import Modal from '../components/Modal/Modal.jsx';  
import styles from '../styles/sessionspage.module.css';

export default function SessionsPage() {
  const [sessionsData, setSessionsData] = useState([]);
  const [moviesData, setMoviesData]     = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('/data/sessions.json').then(res => res.json()),
      fetch('/data/movies.json').then(res => res.json())
    ]).then(([sessions, movies]) => {
      setSessionsData(sessions);
      setMoviesData(movies);
      const today = new Date().toISOString().slice(0,10);
      setSelectedDate(
        sessions.some(s => s.date === today)
          ? today
          : sessions[0]?.date || today
      );
    });
  }, []);

  // Унікальні дати
  const dateTabs = Array.from(new Set(sessionsData.map(s => s.date)))
                        .sort();

  // Сеанси на обрану дату
  const sessionsOnDate = sessionsData.filter(s => s.date === selectedDate);

  // Групування за фільмом
  const sessionsByMovie = sessionsOnDate.reduce((acc, sess) => {
    (acc[sess.movieId] = acc[sess.movieId] || []).push(sess);
    return acc;
  }, {});

  // Масив { movie, sessions }
  const moviesToShow = Object.entries(sessionsByMovie)
    .map(([movieId, sessions]) => ({
      movie:    moviesData.find(m => String(m.id) === movieId),
      sessions
    }))
    .slice(0,6);

  // Клік на кнопку "Order Ticket"
  const handleOrderClick = ({ movie, sessions }) => {
    const sess = sessions[0];
    setSelectedSession({
      poster: movie.poster,
      title:  movie.title,
      date:   sess.date,
      time:   sess.time,
      hall:   sess.hall
    });
  };

  const handleCloseModal = () => {
    setSelectedSession(null);
  };

  return (
    <div className={styles.sessionsPage}>
      <h1 className={styles.pageTitle}>SESSIONS</h1>

      <div className={styles.tabs}>
        {dateTabs.map(date => {
          const label = new Date(date).toLocaleDateString('en-US', {
            day:   '2-digit',
            month: 'long'
          }).toUpperCase();

          return (
            <button
              key={date}
              className={`${styles.tab} ${date === selectedDate ? styles.activeTab : ''}`}
              onClick={() => setSelectedDate(date)}
            >
              {label}
            </button>
          );
        })}

        <div className={styles.datePickerWrapper}>
          <input
            type="date"
            className={styles.datePicker}
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
          />
          <span className={styles.arrow}>▾</span>
        </div>
      </div>

      <div className={styles.sessionsGrid}>
        {moviesToShow.length ? (
          moviesToShow.map(({ movie, sessions }) => (
            <SessionCard
              key={movie.id}
              movie={movie}
              sessions={sessions}
              onOrder={() => handleOrderClick({ movie, sessions })}
            />
          ))
        ) : (
          <p className={styles.noSessions}>
            No sessions available for this date.
          </p>
        )}
      </div>

      {selectedSession && (
        <Modal
          isOpen={true}
          onClose={handleCloseModal}
          poster={selectedSession.poster}
          title={selectedSession.title}
          date={selectedSession.date}
          time={selectedSession.time}
          hall={selectedSession.hall}
        />
      )}
    </div>
  );
}
