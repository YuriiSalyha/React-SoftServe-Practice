import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "../styles/auth.module.css";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const signUpSchema = z
  .object({
    email: z.string().email(),
    login: z
      .string()
      .min(3, "Login must be at least 3 characters long")
      .nonempty("Login is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpPage = () => {
  const navigate = useNavigate();

  const { register: authRegister } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await authRegister({
        email: data.email,
        username: data.login,
        password: data.password,
      });

      if (!response.success) {
        setError("login", {
          type: "manual",
          message: response?.error,
        });
        return;
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      setError("general", {
        type: "manual",
        message: "There was an error. Please try again later.",
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Registration</h1>

      {errors.general && (
        <p className={styles.field__error}>{errors.general.message}</p>
      )}

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <input
            id="email"
            className={styles.field__input}
            type="email"
            placeholder="Your mail"
            {...register("email")}
          />
          {errors.email && (
            <p className={styles.field__error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <input
            id="login"
            className={styles.field__input}
            type="text"
            placeholder="Your login"
            {...register("login")}
          />
          {errors.login && (
            <p className={styles.field__error}>{errors.login.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <input
            id="password"
            className={styles.field__input}
            placeholder="Your password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.field__error}>{errors.password.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <input
            id="confirmPassword"
            className={styles.field__input}
            placeholder="Repeat the password"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className={styles.field__error}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button className={styles.btn__submit} type="submit">
          Register
        </button>
      </form>

      <div className={styles.text}>
        Do you have an account? <a href="/signIn">Login</a>
      </div>
    </div>
  );
};

export default SignUpPage;
