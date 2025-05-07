import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/moviePage.Module.css";
import imdbLogo from "/imbd_logo.png";
import rtLogo from "/rt.jpg";
import Modal from "../components/Modal/Modal.jsx";

function getWeekDates() {
  const today = new Date();
  const dayIndex = (today.getDay() + 6) % 7; // Monday=0 … Sunday=6
  const monday = new Date(today);
  monday.setDate(today.getDate() - dayIndex);
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [sessionsByDate, setSessionsByDate] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/data/movies.json").then((r) => r.json()),
      fetch("/data/sessions.json").then((r) => r.json()),
    ])
      .then(([movies, sessions]) => {
        const found = movies.find((m) => String(m.id) === id);
        setMovie(found || null);

        const week = getWeekDates();
        const grouped = week.map((date) => {
          const key = date.toISOString().split("T")[0];
          const times = sessions
            .filter((s) => String(s.movieId) === id && s.date === key)
            .map((s) => s.time);
          return { date, times };
        });
        setSessionsByDate(grouped);
      })
      .catch(console.error);
  }, [id]);

  if (!movie) {
    return <div className="loading">Loading...</div>;
  }

  const {
    poster,
    title,
    releaseDate,
    country,
    duration,
    ageRestriction,
    genres,
    ratings,
    description,
    trailerLink,
  } = movie;

  const ytId = new URL(trailerLink).searchParams.get("v");
  const nonEmpty = sessionsByDate.filter((g) => g.times.length > 0);

  // ✅ Динамічно знаходимо hall з sessions.json
  function handleOrderClick() {
    fetch("/data/sessions.json")
      .then((res) => res.json())
      .then((data) => {
        const sessionsForThisMovie = data.filter(
          (s) => String(s.movieId) === id
        );
        if (sessionsForThisMovie.length === 0) return;

        const hall = sessionsForThisMovie[0].hall;
        setSelectedSession({
          poster,
          title,
          hall,
        });
      })
      .catch(console.error);
  }

  const week = getWeekDates();
  const start = week[0];
  const end = week[week.length - 1];
  const fmt = (d) => `${d.getMonth() + 1}.${d.getDate()}`;
  const rangeLabel = `${fmt(start)}-${fmt(end)}`; // e.g. "4.28-5.04"

  return (
    <div className="movie-page">
      {/* Верхній блок */}
      <div className="movie-header">
        <img className="movie-poster" src={poster} alt={`${title} poster`} />
        <div className="movie-basic-info">
          <h1 className="movie-title">
            {title} ({new Date(releaseDate).getFullYear()})
          </h1>
          <p><strong>Premiere:</strong> {releaseDate}</p>
          <p><strong>Country:</strong> {country}</p>
          <p><strong>Duration:</strong> {duration} min</p>
          <p><strong>Age Restriction:</strong> {ageRestriction}+</p>
          <p><strong>Genres:</strong> {genres.join(", ")}</p>
          <div className="ratings-inline">
            <div className="rating-inline-item">
              <img className="rating-logo" src={imdbLogo} alt="IMDb" />
              <span className="rating-value">{ratings.imdb}</span>
            </div>
            <div className="rating-inline-item">
              <img className="rating-logo" src={rtLogo} alt="RT" />
              <span className="rating-value">{ratings.rottenTomatoes}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Нижній блок */}
      <div className="movie-body">
        <aside className="sessions-sidebar">
          <h2>Sessions this week ({rangeLabel})</h2>
          <ul className="sessions-list">
            {nonEmpty.map(({ date, times }) => (
              <li key={date.toISOString()} className="session-item">
                <div className="session-day">
                  {date.toLocaleDateString("en-US", { weekday: "long" })}
                </div>
                <div className="session-times">
                  {times.map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <button className="book-button" onClick={handleOrderClick}>
            Order a ticket
          </button>
        </aside>

        <div className="movie-details">
          <section className="movie-description">
            <h2>Description</h2>
            <p>{description}</p>
          </section>

          <section className="movie-trailer">
            <h2>Trailer</h2>
            <div className="video-container">
              <iframe
                title={`${title} Trailer`}
                src={`https://www.youtube.com/embed/${ytId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        </div>
      </div>

      {/* Модальне вікно бронювання */}
      {selectedSession && (
        <Modal
          isOpen
          onClose={() => setSelectedSession(null)}
          poster={selectedSession.poster}
          title={selectedSession.title}
          hall={selectedSession.hall}
        />
      )}
    </div>
  );
}
