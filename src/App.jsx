import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import FavoritesPage from './pages/FavoritesPage';
import SessionsPage from './pages/SessionsPage';
import AdminPanel from './pages/AdminPanel';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Головна сторінка */}
        <Route path="/" element={<HomePage />} />

        {/* Сторінка одного фільму */}
        <Route path="/movie/:id" element={<MoviePage />} />

        {/* Сторінка обраного */}
        <Route path="/favorites" element={<FavoritesPage />} />

        {/* Сторінка сеансів */}
        <Route path="/sessions" element={<SessionsPage />} />

        {/* Сторінка пошуку */}
        <Route path="/search" element={<SearchPage />} />

        {/* Адмін панель */}
        <Route path="/admin" element={<AdminPanel />} />

        {/* 404 сторінка */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
