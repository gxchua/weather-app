export type RawWeatherResponse = {
    weather: WeatherDetails[],
    main: {
        temp: number
        temp_min: number
        temp_max: number
        humidity: number
    },
    sys: {
        country: string,
    }
    name: string
}

type WeatherDetails = {
    id: string
    description: string
    main: string
}

export type ProcessedWeatherData = {
    id: string
    name: string
    countryCode: string
    temp_min: number
    temp_max: number
    humidity: number
    temp: number
    weatherDescription: string
    weather: string
    utcTimeStamp: string
}