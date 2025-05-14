import React from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
// components
import {
  FieldInput,
  FieldArray,
  FieldTextarea,
  FieldRow,
  SubmitButton,
  Form,
} from "../../FormUI/index";
import { MovieForm } from "../Forms/index";
// types
import { movieSchema } from "../../../types/zod/index";
import MovieApi from "../../../api/Movies";

const EditMovieForm = ({ data, movieId }) => {
  const navigate = useNavigate();
  const { updateOne } = MovieApi();
  const {
    register,
    control,
    handleSubmit: handleMovieSubmit,
    watch: movieWatch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(movieSchema),
    defaultValues: data,
  });

  const genres = movieWatch("genres");
  const posterWatcher = movieWatch("poster");

  const handleAddGenre = (genre) => {
    if (!genre || genres.includes(genre)) return;
    setValue("genres", [...genres, genre]);
  };

  const handleRemoveGenre = (index) => {
    const updated = [...genres];
    updated.splice(index, 1);
    setValue("genres", updated);
  };

  const onSubmitMovie = (newData) => {
    const deepCompare = (newObj, oldObj) => {
      if (Array.isArray(newObj) && Array.isArray(oldObj)) {
        return (
          newObj.length !== oldObj.length ||
          newObj.some((item, index) => item !== oldObj[index])
        );
      }

      if (
        typeof newObj === "object" &&
        typeof oldObj === "object" &&
        newObj !== null &&
        oldObj !== null
      ) {
        return Object.entries(newObj).some(([key, value]) =>
          deepCompare(value, oldObj[key])
        );
      }

      return newObj !== oldObj;
    };

    const updatedData = Object.entries(newData)
      .filter(([key, value]) => deepCompare(value, data[key]))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    updateOne(movieId, updatedData);
  };

  return (
    <div>
      <MovieForm
        posterWatcher={posterWatcher}
        handleSubmit={handleMovieSubmit(onSubmitMovie)}
      >
        <FieldInput
          error={errors.title}
          // input props
          id="poster"
          type="text"
          placeholder="Посилання на постер фільму"
          {...register("poster")}
        />
        <FieldInput
          error={errors.title}
          // input props
          id="title"
          type="text"
          placeholder="Назва фільму"
          {...register("title")}
        />
        <FieldTextarea
          error={errors.description}
          // input props
          id="description"
          type="text"
          placeholder="Опис фільму"
          {...register("description")}
        />
        <FieldInput
          error={errors.trailerLink}
          // input props
          id="trailerLink"
          type="text"
          placeholder="Посилання на трейлер фільму"
          {...register("trailerLink")}
        />
        <FieldInput
          error={errors.releaseDate}
          // input props
          id="releaseDate"
          type="date"
          {...register("releaseDate")}
        />
        <FieldInput
          error={errors.country}
          // input props
          id="country"
          type="text"
          placeholder="Країна"
          {...register("country")}
        />
        <FieldInput
          error={errors.duration}
          // input props
          id="duration"
          type="text"
          placeholder="Тривалість фільму"
          {...register("duration")}
        />
        <FieldInput
          error={errors.ageRestriction}
          // input props
          id="ageRestriction"
          type="text"
          placeholder="Вік для перегляду"
          {...register("ageRestriction")}
        />
        <FieldArray
          items={genres}
          onAdd={handleAddGenre}
          onRemove={handleRemoveGenre}
          error={errors.genres}
        />

        <FieldRow>
          <FieldInput
            error={errors.rating}
            // input props
            id="rating.imdb"
            type="text"
            placeholder="Оцінка на imdb"
            style={{
              width: "100%",
            }}
            {...register("ratings.imdb")}
          />
          <FieldInput
            error={errors.rating}
            // input props
            id="rating.rottenTomatoes"
            type="text"
            placeholder="Оцінка на Rotten Tomatoes"
            style={{
              width: "100%",
            }}
            {...register("ratings.rottenTomatoes")}
          />
        </FieldRow>

        <SubmitButton text={"Змінити"} />
      </MovieForm>
    </div>
  );
};

export default EditMovieForm;
