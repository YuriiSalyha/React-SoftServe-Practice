import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "../styles/auth.module.css";
import useAuth from "../hooks/useAuth";

const signInSchema = z.object({
  login: z
    .string()
    .min(3, "Login must be at least 3 characters long")
    .nonempty("Login is required"),
  password: z
    .string()
    .min(3, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

const SignInPage = () => {
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

      alert("success!");
    } catch (error) {
      console.error(error);
      setError("general", {
        type: "manual",
        message: "Сталася помилка. Спробуйте ще раз пізніше.",
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Вхід</h1>

      {errors.general && (
        <p className={styles.field__error}>{errors.general.message}</p>
      )}

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <input
            id="login"
            className={styles.field__input}
            type="text"
            placeholder="Ваш логін"
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
            placeholder="Ваш пароль"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.field__error}>{errors.password.message}</p>
          )}
        </div>

        <button className={styles.btn__submit} type="submit">
          ВІЙТИ НА САЙТ
        </button>
      </form>

      <div className={styles.text}>
        Не маєте аккауту? <a href="/">Регистрація</a>
      </div>
    </div>
  );
};

export default SignInPage;
