import React, { useState, useEffect } from "react";
import { createContext } from "react";

export const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
  const [status, setStatus] = useState("loading"); // loading, authorized, unauthenticated
  const [user, setUser] = useState(null); // дані користувача

  const isAuthenticated = status === "authorized"; // швидка перевірка на авторизацію користувача

  const login = async ({ username, password }) => {
    try {
      const response = await fetch("/data/users.json");
      const res_data = await response.json();

      const findOne = res_data.find((user) => user.username == username);

      if (!findOne) {
        throw new Error("Користувача не знайдено");
      }

      localStorage.setItem("user", JSON.stringify(findOne));
      setUser(findOne);
      setStatus("authorized");

      return { success: true, user: findOne };
    } catch (error) {
      console.error(error);
      setStatus("unauthenticated");
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setStatus("unauthenticated");
  };

  useEffect(() => {
    const userDataString = localStorage.getItem("user");

    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        setUser(userData);
      } catch (error) {
        setStatus("unauthenticated");
        logout();
      } finally {
        setStatus("authorized");
      }
    } else {
      setStatus("unauthenticated");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ status, isAuthenticated, login, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
