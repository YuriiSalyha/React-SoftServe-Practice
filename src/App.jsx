import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FavoritesPage from "./pages/FavoredPage";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import SessionsPage from "./pages/SessionsPage";
import SearchPage from "./pages/SearchPage";
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
      <Router> 
        <Wrapper>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/movie/:id" element={<MoviePage />} />

            {/* Тут буде виводитися результат пошуку */}
            <Route path="/result" element={<SearchPage />} />

            {/* Можна розкоментувати інші сторінки пізніше */}
            {/* <Route path="/favorites" element={<FavoritesPage />} /> */}
            {/* <Route path="/admin" element={<AdminPanel />} /> */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </Wrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
