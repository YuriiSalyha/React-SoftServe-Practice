import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FavoritesPage from "./pages/FavoritePage";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import SessionsPage from "./pages/SessionsPage";
import SearchPage from "./pages/SearchPage";

import "./styles/App.css";

import Header from "./components/Header/Header";
import Wrapper from "./components/Wrapper";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

import AuthProvider from "./context/AuthContext";
import Footer from "./components/Footer/Footer";
// admin
import { AdminLayout, AdminMiddleware } from "./components/Admin";
import AdminPanel from "./pages/admin/AdminPanel";
import AdminMovieEdit from "./pages/admin/AdminMovieEdit";
import AdminMovieAdd from "./pages/admin/AdminMovieAdd";

function App() {
  return (
    <AuthProvider>
      <Wrapper>
        <Router>
          <Header />
          <Routes>
            {/* За замовчуванням перенаправимо на /sessions */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Говна сторінка */}
            <Route path="/home" element={<HomePage />} />

            {/* Сторінка сеансів */}
            <Route path="/sessions" element={<SessionsPage />} />

            {/* інші сторінки поки закоментовані */}
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />

            {/* Сторінка одного фільму */}
            <Route path="/movie/:id" element={<MoviePage />} />

            {/* Сторінка результат пошуку */}
            <Route path="/search" element={<SearchPage />} />
            {/* Сторінка обраного */}
            <Route path="/favorite" element={<FavoritesPage />} />

            <Route
              path="/admin"
              element={
                <AdminMiddleware>
                  <AdminLayout />
                </AdminMiddleware>
              }
            >
              <Route path="panel" element={<AdminPanel />} />
              <Route path="movie/add" element={<AdminMovieAdd />} />
              <Route path="movie/:id" element={<AdminMovieEdit />} />
            </Route>

            {/* Сторінка сеансів */}
            {/* <Route path="/search" element={<SearchPage />} /> */}
            {/* Адмін панель */}
            {/* <Route path="/admin" element={<AdminPanel />} /> */}
            {/* 404 сторінка */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
          <Footer />
        </Router>
      </Wrapper>
    </AuthProvider>
  );
}

export default App;
