import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieApi from "../../api/Movies";
import EditMovieForm from "../../components/Admin/EditMovie/EditMovieForm";
import EditSession from "../../components/Admin/EditMovie/EditSession";

const AdminMovieEdit = () => {
  const { id } = useParams();
  const { findOne } = MovieApi();
  const [movie, setMovie] = useState(null);
  const [section, setSection] = useState("movie");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await findOne(id);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <p>Не вдалося знайти фільм</p>;
  }

  return (
    <div>
      <div style={{justifyContent:"center", gap: "20px"}} className="btns__wrapper">
        {[
          { label: "Фільм", key: "movie" },
          { label: "Сесії", key: "sessions" },
        ].map(({ label, key }) => {
          const isActive = section.includes(key);
          return (
            <button
              key={key}
              style={{
                background: "inherit",
                border: "none",
                outline: "none",
                color: isActive ? "#FE9800" : "#FFFFFF",
                fontSize: "18px",
                fontWeight: 400,
                cursor: "pointer",
              }}
              type="button"
              onClick={() => setSection(key)}
            >
              {label}
            </button>
          );
        })}
      </div>

      {section === "movie" ? (
        <EditMovieForm data={movie} movieId={id} />
      ) : (
        <EditSession movieId={id} />
      )}
    </div>
  );
};

export default AdminMovieEdit;
