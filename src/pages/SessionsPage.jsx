/* src/pages/SessionsPage.jsx */
import React, { useState, useEffect } from 'react';
import SessionCard from '../components/SessionCard';
import styles from '../styles/sessionspage.module.css';

export default function SessionsPage() {
  const [sessionsData, setSessionsData] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/data/sessions.json').then(res => res.json()),
      fetch('/data/movies.json').then(res => res.json())
    ]).then(([sessions, movies]) => {
      setSessionsData(sessions);
      setMoviesData(movies);
      // встановимо дефолтну дату — сьогоднішню, якщо є дані
      const today = new Date().toISOString().slice(0,10);
      setSelectedDate(sessions.some(s => s.date === today) ? today : sessions[0]?.date || today);
    });
  }, []);

  // з унікальних дат формуємо таби
  const dateTabs = Array.from(new Set(sessionsData.map(s => s.date))).sort();

  // фільтруємо сесії під обрану дату
  const sessionsOnDate = sessionsData.filter(s => s.date === selectedDate);

  // групуємо по movieId
  const sessionsByMovie = sessionsOnDate.reduce((acc, sess) => {
    (acc[sess.movieId] = acc[sess.movieId]||[]).push(sess);
    return acc;
  }, {});

  // формуємо масив {movie, sessions}
  let moviesToShow = Object.entries(sessionsByMovie).map(([movieId, sessions])=>{
    const movie = moviesData.find(m=>String(m.id)===movieId);
    return { movie, sessions };
  }).slice(0,6); // не більше 6 карток

  return (
    <div className={styles.sessionsPage}>
      <h1 className={styles.pageTitle}>СЕАНСИ</h1>

      <div className={styles.tabs}>
        {dateTabs.map(date=>{
          const label = new Date(date).toLocaleDateString('uk-UA', {
            day:'2-digit', month:'long'
          }).toUpperCase();
          return (
            <button
              key={date}
              className={`${styles.tab} ${date===selectedDate?styles.activeTab:''}`}
              onClick={()=>setSelectedDate(date)}
            >
              {label}
            </button>
          );
        })}

        {/* Ось він — вибір довільної дати */}
        <div className={styles.datePickerWrapper}>
          <input
            type="date"
            className={styles.datePicker}
            value={selectedDate}
            onChange={e=>setSelectedDate(e.target.value)}
          />
          <span className={styles.arrow}>▾</span>
        </div>
      </div>

      <div className={styles.sessionsGrid}>
        {moviesToShow.length
          ? moviesToShow.map(({movie,sessions})=>(
              <SessionCard key={movie.id} movie={movie} sessions={sessions}/>
            ))
          : <p className={styles.noSessions}>Немає сеансів на цю дату.</p>
        }
      </div>
    </div>
  );
}
