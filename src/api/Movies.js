import { supabase } from '../supabaseClient';

const MovieApi = () => {

    const tableName = "Movies"

    const findAll = async () => {
        try {
            let { data: Movies, error } = await supabase.from(tableName).select("*");
            if (error) {
                const errorMsg = new Error("Не вдалось дістати фільми")
                throw errorMsg;
            }

            return Movies;
        } catch (error) {
            console.error(error)
            return null;
        }
    };

    const findOne = async (movieId) => {

        try {
            let { data: Movies, error } = await supabase.from(tableName).select("*").eq("id", movieId).single();
            if (error) {
                const errorMsg = new Error("Не вдалось дістати фільми")
                throw errorMsg;
            }
            const { id, ...rest } = Movies;

            return rest;
        } catch (error) {
            console.error(error)
            return null;
        }
    };
    const insertOne = async (movie) => {

    };

    const insertMany = async (movies) => {
        for (const movie of movies) {
            const { data, error } = await supabase
              .from(tableName)
              .insert([movie])
              .select();
        
            if (error) {
              console.error("Error inserting movie:", error);
            }
          }
    };

    const deleteOne = async (id) => {
        try {
            const { error } = await supabase
                .from(tableName)
                .delete()
                .eq('id', id);

            if (error) {
                throw new Error(error);
            }

            return 'deleted';
        } catch (error) {
            console.error(error)
            return null;
        }
    };
    const updateOne = async (id, updates) => {

        try {
            const { data, error } = await supabase
                .from(tableName)
                .update(updates)
                .eq('id', id)
                .select()

            if (error) {
                throw new Error(error);
            }

            return "success"
        } catch (error) {
            console.error(error)
            return null;
        }
    };


    return { findAll, findOne, insertOne, deleteOne, updateOne,insertMany };

}

export default MovieApi