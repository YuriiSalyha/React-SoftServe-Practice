import { supabase } from '../supabaseClient';

const SessionApi = () => {
    const tableName = 'MovieSessions';

    const findAll = async (movieId) => {
        try {
            const { data, error } = await supabase.from(tableName)
                .select('*').eq("movieId", Number.parseInt(movieId));

            if (error) {
                throw new Error(error.message);
            }

            return data;

        } catch (error) {
            console.error(error);
            return [];
        }
    }

    const findOne = (sessionId) => {
        try {
            const { data, error } = supabase.from(tableName)
                .select('*').eq("id", sessionId);

            if (error) {
                throw new Error(error);
            }

            return movieSession;

        } catch (error) {
            console.error(error);
        }

    }
    const addNewSession = async ({ session, movieId }) => {
        try {
            const { data, error } = await supabase
                .from(tableName)
                .insert({
                    movieId: Number.parseInt(movieId),
                    ...session,
                });

            if (error) {
                throw new Error(error.message); // `.message` — чтобы не выбрасывать объект
            }

            return data;
        } catch (error) {
            console.error("Error adding new session:", error);
            return null;
        }
    };

    const updateOne = (sessionId) => { }
    const removeOne = (sessionId) => { }

    return {
        findAll,
        findOne,
        addNewSession
    }
}

export default SessionApi