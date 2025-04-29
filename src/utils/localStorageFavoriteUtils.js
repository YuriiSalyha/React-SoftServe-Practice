// Функція для збереження улюблених фільмів у Local Storage
export const saveFavoritesToLocalStorage = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

// Функція для отримання улюблених фільмів з Local Storage
export const getFavoritesFromLocalStorage = () => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

// Функція для додавання фільму до улюблених
export const addFavoriteToLocalStorage = (movie) => {
  const currentFavorites = getFavoritesFromLocalStorage();
  const updatedFavorites = [...currentFavorites, movie];
  saveFavoritesToLocalStorage(updatedFavorites);
};

// Функція для видалення фільму з улюблених
export const removeFavoriteFromLocalStorage = (movieId) => {
  const currentFavorites = getFavoritesFromLocalStorage();
  const updatedFavorites = currentFavorites.filter(
    (movie) => movie.id !== movieId
  );
  saveFavoritesToLocalStorage(updatedFavorites);
};

// Додані тестові улюблені фільми (ID фільмів)
export const addTestFavorites = () => {
  const testMovies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Массив ID фільмів для тестування

  // Зберігаємо ці ID фільмів у Local Storage
  saveFavoritesToLocalStorage(testMovies);
};

// Функція для отримання повних даних фільмів, використовуючи ID з Local Storage
export const getFullFavorites = async () => {
  const favoriteIds = getFavoritesFromLocalStorage(); // Отримуємо ID з Local Storage
  const response = await fetch("/data/movies.json"); // Завантажуємо JSON з public/data/movies.json
  const moviesData = await response.json(); // Парсимо JSON

  // Фільтруємо фільми по ID, які є в Local Storage
  const favoriteMovies = moviesData.filter((movie) =>
    favoriteIds.includes(parseInt(movie.id))
  );

  // Форматуємо дані для виведення
  const formattedMovies = favoriteMovies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster,
    duration: movie.duration,
    ageRestriction: movie.ageRestriction,
    genres: movie.genres.join(", "), // Перетворюємо масив жанрів в строку
  }));

  return formattedMovies;
};
