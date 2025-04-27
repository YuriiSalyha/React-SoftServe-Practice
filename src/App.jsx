import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import MoviePage from "./pages/MoviePage";
// import FavoritesPage from "./pages/FavoritesPage";
import SessionsPage from "./pages/SessionsPage";
// import SearchPage from "./pages/SearchPage";
// import AdminPanel from "./pages/AdminPanel";
// import NotFoundPage from "./pages/NotFoundPage";

import "./styles/App.css";

import Header from "./components/Header/Header";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <Wrapper>
      <Header />
      <Router>
        <Routes>
          {/* За замовчуванням перенаправимо на /sessions */}
          <Route path="/" element={<Navigate to="/sessions" replace />} />

          {/* Сторінка сеансів */}
          <Route path="/sessions" element={<SessionsPage />} />

          {/* інші сторінки поки закоментовані */}
          {/*
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFoundPage />} />
          */}
        </Routes>
      </Router>
    </Wrapper>
  );
}

export default App;
