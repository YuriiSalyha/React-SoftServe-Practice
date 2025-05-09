import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "../styles/auth.module.css";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const signInSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(3, "Login must be at least 3 characters long")
    .nonempty("Login is required")
    .refine(
      (val) => {
        if (val.includes("@")) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(val);
        }
        return true;
      },
      {
        message: "Invalid email format",
      }
    ),
  password: z
    .string()
    .min(3, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const {isAuthenticated}= useAuth();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await login({
        usernameOrEmail: data.usernameOrEmail,
        password: data.password,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      setError("general", {
        type: "manual",
        message: "An error occurred. Please try again later.",
      });
    }
  };

  if (isAuthenticated) {
    navigate("/");
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Login</h1>

      {errors.general && (
        <p className={styles.field__error}>{errors.general.message}</p>
      )}

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <input
            id="usernameOrEmail"
            className={styles.field__input}
            type="text"
            placeholder="Your username or email"
            {...register("usernameOrEmail")}
          />
          {errors.usernameOrEmail && (
            <p className={styles.field__error}>{errors.login.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <input
            id="password"
            className={styles.field__input}
            placeholder="Your Password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.field__error}>{errors.password.message}</p>
          )}
        </div>

        <button className={styles.btn__submit} type="submit">
          Sign in
        </button>
      </form>

      <div className={styles.text}>
        Don’t have an account? <a href="/signUp">Sign up</a>
      </div>
    </div>
  );
};

export default SignInPage;
