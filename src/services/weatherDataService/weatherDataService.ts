import { ProcessedWeatherData, RawWeatherResponse } from "@/models";
import dayjs from "dayjs";

const processWeatherData = (data: RawWeatherResponse): ProcessedWeatherData => {
    return {
        id: `${dayjs().toISOString()}:${data.name}`,
        name: data.name,
        countryCode: data.sys?.country,
        temp_min: data.main?.temp_min,
        temp_max: data.main?.temp_max,
        temp: data.main?.temp,
        humidity: data.main?.humidity,
        weather: data.weather[0]?.main,
        weatherDescription: data.weather[0]?.description || "",
        utcTimeStamp: dayjs().toISOString()
    }
}

export default { processWeatherData }