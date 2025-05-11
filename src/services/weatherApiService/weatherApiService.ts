import { RawWeatherResponse } from "@/models";
import axios from "axios";

//The function that retrieve the weather data by query
const fetchWeather = async (query: string): Promise<RawWeatherResponse | null> => {
    if (!query) return null;

    try {
        const queryString = query.trim();
        const encodedQuery = encodeURIComponent(queryString);
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

        const response = await axios.get<RawWeatherResponse>(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    q: encodedQuery,
                    appid: apiKey,
                    units: 'metric'
                }
            }
        );

        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            throw error;
        }
        else {
            throw new Error("Error on fetching weather data.")
        }
    }
};

export default { fetchWeather };

