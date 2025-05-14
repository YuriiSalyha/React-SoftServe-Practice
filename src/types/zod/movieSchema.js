import { z } from "zod";

const movieSchema = z.object({
  poster: z.string(),
  title: z.string(),
  description: z.string(),
  trailerLink: z.string(),
  releaseDate: z.date(),
  country: z.string(),
  duration: z.number(),
  ageRestriction: z.number(),
  genres: z.array(z.string()),
  ratings: z.object({
    imdb: z.number(),
    rottenTomatoes: z.number(),
  }),
});

export const movieRegisterSchema = z.object({
  poster: z
    .string()
    .min(1, "Посилання на постер обовʼязкове")
    .url("Невірне посилання на постер"),

  title: z
    .string()
    .min(1, "Назва фільму обовʼязкова")
    .max(100, "Назва фільму занадто довга"),

  description: z
    .string()
    .min(1, "Опис фільму обовʼязковий")
    .max(1000, "Опис фільму занадто довгий"),

  trailerLink: z
    .string()
    .min(1, "Посилання на трейлер обовʼязкове")
    .url("Невірне посилання на трейлер"),

  releaseDate: z
    .date({ invalid_type_error: "Невірна дата релізу" }),

  country: z
    .string()
    .min(1, "Країна обовʼязкова")
    .max(100, "Назва країни занадто довга"),

  duration: z
    .number({ required_error: "Тривалість обовʼязкова" })
    .min(1, "Тривалість повинна бути більше 0"),

  ageRestriction: z
    .number({ required_error: "Вікове обмеження обовʼязкове" })
    .min(0, "Вік повинен бути 0 або більше"),

  genres: z
    .array(z.string().min(1, "Жанр не може бути порожнім"))
    .min(1, "Потрібно вказати хоча б один жанр"),

  ratings: z.object({
    imdb: z
      .number({ required_error: "Оцінка IMDb обовʼязкова" })
      .min(0, "Мінімальна оцінка IMDb — 0")
      .max(10, "Максимальна оцінка IMDb — 10"),

    rottenTomatoes: z
      .number({ required_error: "Оцінка Rotten Tomatoes обовʼязкова" })
      .min(0, "Мінімальна оцінка — 0")
      .max(100, "Максимальна оцінка — 100"),
  }),
});



export default movieSchema;