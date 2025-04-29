
import React from "react";
import "../styles/moviePage.Module.css";
import posterImg from "../assets/Oppenheimer.jpg";
import imdbLogo from "../assets/imbd_logo.png";
import rtLogo from "../assets/rt.jpg";

const MoviePage = () => {
  const movie = {
    title: "Oppenheimer",
    releaseYear: 2023,
    premiereDate: "2023-07-21",
    country: "USA",
    duration: 180,
    ageRestriction: 16,
    genre: ["Drama", "Biography", "History"],
    rating: 8.3,
    imdbScore: 8,
    rtScore: "97%",
    description:
      "Oppenheimer (2023) is a biographical film directed by Christopher Nolan that explores the life of theoretical physicist J. Robert Oppenheimer, known as the 'father of the atomic bomb'. During WWII, he led the Manhattan Project, changing the course of history. The film depicts both scientific triumphs and personal turmoil as Oppenheimer confronts the moral implications of his creation.",
    trailerId: "uYPbbksJxIg",
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const normalized = movie.rating / 2;
  const fullStars = Math.floor(normalized);
  const halfStar = normalized - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="movie-page">
      {/* 1) Верхній блок */}
      <div className="movie-header">
        <img
          className="movie-poster"
          src={posterImg}
          alt={`${movie.title} poster`}
        />
        <div className="movie-basic-info">
          <h1 className="movie-title">
            {movie.title} ({movie.releaseYear})
          </h1>
          <p>
            <strong>Premiere:</strong> {movie.premiereDate}
          </p>
          <p>
            <strong>Country:</strong> {movie.country}
          </p>
          <p>
            <strong>Duration:</strong> {movie.duration} min
          </p>
          <p>
            <strong>Age Restriction:</strong> {movie.ageRestriction}+
          </p>
          <p>
            <strong>Genres:</strong> {movie.genre.join(", ")}
          </p>
          <p>
            <strong>Rating:</strong> {movie.rating}/10
          </p>
          <div className="ratings-inline">
            <div className="rating-inline-item">
              <img className="rating-logo" src={imdbLogo} alt="IMDb Logo" />
              <span className="rating-value">{movie.imdbScore}</span>
            </div>
            <div className="rating-inline-item">
              <img className="rating-logo" src={rtLogo} alt="RT Logo" />
              <span className="rating-value">{movie.rtScore}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2) Нижній блок */}
      <div className="movie-body">
        <aside className="sessions-sidebar">
          <h2>Session</h2>
          <ul className="sessions-list">
            {days.map((day) => (
              <li key={day} className="session-item">
                <div className="session-day">{day}</div>
                <div className="session-times">
                  <span>12:00</span>
                  <span>15:25</span>
                </div>
              </li>
            ))}
          </ul>
          <button className="book-button">Order a ticket</button>
        </aside>

        <div className="movie-details">
          <section className="movie-description">
            <h2>Description</h2>
            <p className="movie-details-text">{movie.description}</p>
          </section>

          <section className="movie-trailer">
            <h2>Trailer</h2>
            <div className="video-container">
              <iframe
                title="Oppenheimer Trailer"
                src={`https://www.youtube.com/embed/${movie.trailerId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>

          <section className="movie-rating">
            <div className="rating-header">
              <span className="rating-score">
                {(movie.rating / 2).toFixed(1)}/5
              </span>
              <span className="rate-text">Rate this film</span>
            </div>
            <div className="rating-stars">
              {Array.from({ length: fullStars }).map((_, i) => (
                <span key={i} className="star full">
                  ★
                </span>
              ))}
              {halfStar && <span className="star half">★</span>}
              {Array.from({ length: emptyStars }).map((_, i) => (
                <span key={i} className="star empty">
                  ★
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;