// Функція для збереження улюблених фільмів у Local Storage
export const saveFavoritesToLocalStorage = (favorites) => {
  // Переконуємось, що зберігаємо лише унікальні числові значення
  const uniqueFavorites = [...new Set(favorites.map(Number))];
  localStorage.setItem("favorites", JSON.stringify(uniqueFavorites));
};

// Функція для отримання улюблених фільмів з локального сховища
export const getFavoritesFromLocalStorage = () => {
  const favorites = localStorage.getItem("favorites");
  const parsed = favorites ? JSON.parse(favorites) : [];

  // Повертаємо тільки числа, ігноруючи інші рядки
  return parsed
    .filter((id) => typeof id === "number" || /^\d+$/.test(id))
    .map(Number);
};

// Функція для додавання фільму до улюблених
export const addFavoriteToLocalStorage = (movie) => {
  const currentFavorites = getFavoritesFromLocalStorage();
  const movieId = parseInt(movie.id);

  if (!currentFavorites.includes(movieId)) {
    const updatedFavorites = [...currentFavorites, movieId];
    saveFavoritesToLocalStorage(updatedFavorites);
  }
};

// Функція для видалення фільму з улюблених
export const removeFavoriteFromLocalStorage = (movieId) => {
  const currentFavorites = getFavoritesFromLocalStorage();
  const updatedFavorites = currentFavorites.filter(
    (id) => id !== parseInt(movieId)
  );
  saveFavoritesToLocalStorage(updatedFavorites);
};

// Функція для отримання повних даних фільмів, використовуючи ID з Local Storage
export const getFullFavorites = async () => {
  const favoriteIds = getFavoritesFromLocalStorage();
  if (favoriteIds.length === 0) return [];

  const response = await fetch("/data/movies.json");
  const moviesData = await response.json();

  const favoriteMovies = moviesData.filter((movie) =>
    favoriteIds.includes(parseInt(movie.id))
  );

  const formattedMovies = favoriteMovies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster,
    duration: movie.duration,
    ageRestriction: movie.ageRestriction,
    genres: movie.genres.join(", "),
  }));

  return formattedMovies;
};
