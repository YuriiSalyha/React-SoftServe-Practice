import styles from "../styles/Favored.module.css";

const movies = [
  {
    id: 1,
    title: "Minecraft: Movie",
    duration: "101 Minute.",
    ageLimit: "12+",
    genres: "Adventures, Action, Comedy",
    image: "./img/posters/minecraft.jpg",
  },
  {
    id: 2,
    title: "SuperBaby",
    duration: "103 Minute.",
    ageLimit: "3+",
    genres: "Adventures, Comedy, Drama",
    image: "./img/posters/superbaby.jpg",
  },
  {
    id: 3,
    title: "UNTIL DAWN",
    duration: "142 Minute.",
    ageLimit: "16+",
    genres: "Lorem, ipsum",
    image: "./img/posters/unteldown.jpg",
  },
  {
    id: 4,
    title: "UNTIL DAWN",
    duration: "142 Minute.",
    ageLimit: "16+",
    genres: "Lorem, ipsum",
    image: "./img/posters/unteldown.jpg",
  },
  {
    id: 5,
    title: "UNTIL DAWN",
    duration: "142 Minute.",
    ageLimit: "16+",
    genres: "Lorem, ipsum",
    image: "./img/posters/unteldown.jpg",
  },
  {
    id: 6,
    title: "SuperBaby",
    duration: "103 Minute.",
    ageLimit: "3+",
    genres: "Adventures, Comedy, Drama",
    image: "./img/posters/superbaby.jpg",
  },
  {
    id: 7,
    title: "Minecraft: Movie",
    duration: "101 Minute.",
    ageLimit: "12+",
    genres: "Adventures, Action, Comedy",
    image: "./img/posters/minecraft.jpg",
  },
  {
    id: 7,
    title: "Minecraft: Movie",
    duration: "101 Minute.",
    ageLimit: "12+",
    genres: "Adventures, Action, Comedy",
    image: "./img/posters/minecraft.jpg",
  },
];

function FavoredPage() {
  return (
    <div className={styles.favoredPage}>
      <h2 className={styles.headerTitle}>Added to favorites:</h2>
      <div className={styles.moviesGrid}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <img src={movie.image} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>
              {movie.duration} {movie.ageLimit}
            </p>
            <p>{movie.genres}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoredPage;
