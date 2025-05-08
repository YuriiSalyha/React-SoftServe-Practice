import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { createContext } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  status: "loading",
  login: () => {},
  register: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [status, setStatus] = useState("loading"); // loading, authorized, unauthenticated
  const [user, setUser] = useState(null); // дані користувача

  const isAuthenticated = status === "authorized"; // швидка перевірка на авторизацію користувача

  const login = async ({ usernameOrEmail, password }) => {
    let email = usernameOrEmail;

    try {
      const {
        data: authData,
        error: authError,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      setUser(authData.user);
      Cookies.set("access_token", authData.session.access_token, { expires: 1 });
      Cookies.set("refresh_token", authData.session.refresh_token, { expires: 30 });
      setStatus("authorized");

      return authData;
    } catch (error) {
      console.log(error.message);
      setStatus("unauthorized");
      setUser(null);
      return null;
    }
  };

  const register = async ({ email, username, password }) => {
    try {
      // логика для створення користувача
      setUser({ username });
      setStatus("authorized");
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setStatus("unauthenticated");
  };

  useEffect(() => {
    // Используем getSession() для получения текущей сессии
    const getSession = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setStatus("authorized");
        Cookies.set("access_token", session.access_token, { expires: 1 });
        Cookies.set("refresh_token", session.refresh_token, { expires: 30 });
      } else {
        setStatus("unauthenticated");
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          setUser(session.user);
          Cookies.set("access_token", session.access_token, { expires: 1 });
          Cookies.set("refresh_token", session.refresh_token, { expires: 30 });
          setStatus("authorized");
        }

        if (event === "SIGNED_OUT") {
          setUser(null);
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          setStatus("unauthenticated");
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe()
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ status, isAuthenticated, login, register, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
