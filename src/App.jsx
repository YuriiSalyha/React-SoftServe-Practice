import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavoredPage from "./pages/FavoredPage"; // Імпортуємо FavoredPage

import "./styles/App.css";

import Header from "./components/Header/Header";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <Router>
      <Wrapper>
        <Header />
        <Routes>
          {/* Головна сторінка */}
          <Route path="/" element={<HomePage />} />
          {/* Сторінка обраного */}
          <Route path="/favored" element={<FavoredPage />} />
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;
