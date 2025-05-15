import React, { useState, useEffect } from "react";
// components
import { Movie, AlertModal } from "../../components/Admin/Panel/index";
import ModalWrapper from "../../components/ModalWrapper";
// api
import MovieApi from "../../api/Movies";

const AdminPanel = () => {
  const { findAll, deleteOne } = MovieApi();
  const [movies, setMovies] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editMovie, setEditMovie] = useState(null);

  const handleChangeIsDeleting = (active) => {
    setIsDeleting((prev) => active ?? !prev);
  };

  const handleCloseIsDeleting = () => {
    setIsDeleting(false);
    setEditMovie(null);
  };

  const handleDeleteMovie = async () => {
    if (editMovie?.id) {
      await deleteOne(editMovie.id);
      setMovies((prev) => prev.filter((m) => m.id !== editMovie.id));
      handleCloseIsDeleting();
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await findAll();
      setMovies(movies);
    };
    fetchMovies();
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{
        display:"flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "25px"
      }}>
        {movies.length > 0 &&
          movies.map((movie) => (
            <Movie
              key={movie.id}
              data={movie}
              deleteAction={() => {
                setEditMovie(movie);
                handleChangeIsDeleting(true);
              }}
            />
          ))}
      </div>

      {isDeleting && (
        <ModalWrapper handleClose={handleCloseIsDeleting}>
          <AlertModal
            handleAccept={handleDeleteMovie}
            handleRefuse={handleCloseIsDeleting}
          />
        </ModalWrapper>
      )}
    </div>
  );
};

export default AdminPanel;
