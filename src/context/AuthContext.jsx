import React, { useState, useEffect, useCallback } from "react";
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
  const [user, setUser] = useState(null);

  const isAuthenticated = status === "authorized";

  const login = async ({ usernameOrEmail, password }) => {
    let email = usernameOrEmail;

    try {
      if (!usernameOrEmail.includes("@")) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("user_id")
          .eq("username", usernameOrEmail)
          .single();

        if (profileError || !profile) {
          throw new Error("Username not found");
        }

        const { data: authUser, error: authUserError } = await supabase
          .from("auth.users")
          .select("email")
          .eq("id", profile.user_id)
          .single();

        if (authUserError || !authUser) {
          throw new Error("User data not found");
        }

        email = authUser.email;
      }

      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) throw authError;

      setUser(authData.user);

      Cookies.set("access_token", authData.session.access_token, {
        expires: 1,
      });
      Cookies.set("refresh_token", authData.session.refresh_token, {
        expires: 30,
      });
      setStatus("authorized");

      return { success: true };
    } catch (error) {
      console.log(error.message);
      setStatus("unauthorized");
      setUser(null);
      return { success: false, error: error.message };
    }
  };

  const register = async ({ email, username, password }) => {
    try {
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signUpError) {
        console.log("signUp", signUpError);
        throw new Error(signUpError);
      }

      const { error } = await supabase
        .from("Profiles")
        .insert([{ user_id: signUpData.user.id, username }]);

      if (error) {
        console.log("profile: ", error);
        throw new Error(error);
      }

      setUser(signUpData.user);
      setStatus("authorized");

      Cookies.set("access_token", signUpData.session.access_token, {
        expires: 1,
      });
      Cookies.set("refresh_token", signUpData.session.refresh_token, {
        expires: 30,
      });

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

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
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
      authListener?.subscription?.unsubscribe();
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
