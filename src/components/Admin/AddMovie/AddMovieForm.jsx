import React from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// types
import { movieRegisterSchema } from "../../../types/zod/movieSchema";

// components
import {
  FieldInput,
  FieldArray,
  FieldTextarea,
  FieldRow,
  SubmitButton,
} from "../../FormUI/index";
import { MovieForm } from "../Forms/index";

const AddMovieForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(movieRegisterSchema),
    defaultValues: {
      genres: [],
    },
  });

  const posterWatcher = watch("poster");
  const genres = watch("genres");
  console.log(getValues());

  const onSubmit = (e) => {
    try {
      console.log("submit", e);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddGenre = (genre) => {
    if (!genre || genres.includes(genre)) return;
    setValue("genres", [...genres, genre]);
  };

  const handleRemoveGenre = (index) => {
    const updated = [...genres];
    updated.splice(index, 1);
    setValue("genres", updated);
  };

  return (
    <MovieForm
      posterWatcher={posterWatcher}
      handleSubmit={handleSubmit(onSubmit)}
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
        type="text"
        {...register("releaseDate", { valueAsDate: true })}
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
        {...register("duration", { valueAsNumber: true })}
      />
      <FieldInput
        error={errors.ageRestriction}
        // input props
        id="ageRestriction"
        type="text"
        placeholder="Вік для перегляду"
        {...register("ageRestriction", { valueAsNumber: true })}
      />
      <FieldArray
        items={genres}
        onAdd={handleAddGenre}
        onRemove={handleRemoveGenre}
        error={errors.genres}
      />
      <FieldRow>
        <FieldInput
          error={errors.ratings?.imdb}
          // input props
          id="ratings.imdb"
          type="text"
          placeholder="Оцінка на imdb"
          style={{
            width: "100%",
          }}
          {...register("ratings.imdb", { valueAsNumber: true })}
        />
        <FieldInput
          error={errors.ratings?.rottenTomatoes}
          // input props
          id="rating.rottenTomatoes"
          type="text"
          placeholder="Оцінка на Rotten Tomatoes"
          style={{
            width: "100%",
          }}
          {...register("ratings.rottenTomatoes", { valueAsNumber: true })}
        />
      </FieldRow>

      <SubmitButton text={"Додати фільм"} />
    </MovieForm>
  );
};

export default AddMovieForm;
