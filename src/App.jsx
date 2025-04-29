import React from "react";
import {
  BrowserRouter as Router
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FavoritesPage from "./pages/FavoredPage";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import SessionsPage from "./pages/SessionsPage";
// import SearchPage from "./pages/SearchPage";
// import AdminPanel from "./pages/AdminPanel";
// import NotFoundPage from "./pages/NotFoundPage";

import "./styles/App.css";

import Header from "./components/Header/Header";
import Wrapper from "./components/Wrapper";

import SignInPage from "./pages/SignInPage";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Wrapper>
        <Header />
        <Router>
          <Routes>
            {/* За замовчуванням перенаправимо на /sessions */}
            <Route path="/" element={<Navigate to="/sessions" replace />} />

            {/* Сторінка сеансів */}
            <Route path="/sessions" element={<SessionsPage />} />

            {/* інші сторінки поки закоментовані */}
            <Route path="/signIn" element={<SignInPage />} />

            {/* Сторінка одного фільму */}
            <Route path="/movie/:id" element={<MoviePage />} />
            {/* Сторінка обраного */}
            {/* <Route path="/favorites" element={<FavoritesPage />} /> */}
            {/* Сторінка сеансів */}
            {/* <Route path="/search" element={<SearchPage />} /> */}
            {/* Адмін панель */}
            {/* <Route path="/admin" element={<AdminPanel />} /> */}
            {/* 404 сторінка */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </Router>
      </Wrapper>
    </AuthProvider>
  );
}

export default App;
