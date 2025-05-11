
import { SearchBar, SearchHistoryCard, WeatherCard } from "@/components";
import { useRef, useState, useEffect } from "react";
import { weatherApiService, weatherDataService, cacheService } from "@/services";
import { ProcessedWeatherData } from "@/models";
import styles from './WeatherApp.module.scss';

const WeatherApp = () => {
    const searchInput = useRef<string>("");
    const [currentData, setCurrentData] = useState<ProcessedWeatherData | null>(null);
    const [historicalData, setHistoricalData] = useState<ProcessedWeatherData[]>([]);
    const [showError, setErrorMessage] = useState<string>("");

    useEffect(() => {
        const cache = cacheService.retrieveDataFromLocalStorage();
        if (cache) {
            setHistoricalData(JSON.parse(cache));
        }
    }, [])

    const onInputChanged = (val: string): void => {
        searchInput.current = val;
        console.log(searchInput)
    }

    const storeAndUpdateSearchHistory = (data: ProcessedWeatherData): void => {
        const latestList: ProcessedWeatherData[] = [data, ...historicalData];
        setHistoricalData(latestList);
        cacheService.setDataToLocalStorage(latestList);
    }

    const onSearchClicked = async (query: string = ""): Promise<void> => {
        //If there is no external query or the searchbar is empty, do not call the api
        if (!searchInput.current && !query) { return; }

        try {
            const result = await weatherApiService.fetchWeather(query ? query : searchInput.current)
            if (result) {
                const processedData = weatherDataService.processWeatherData(result);
                setCurrentData(processedData);
                storeAndUpdateSearchHistory(processedData);
            }
        }
        catch (err) {
            setErrorMessage("Failed to retrieve weather data.")
        }
    };

    const onListDeleted = (id: string): void => {
        const itemIndex = historicalData.findIndex((dt: ProcessedWeatherData) => dt.id === id);
        if (itemIndex !== -1) {
            //Clone the array objects and remove the item from it. Then, update the cache and also the state
            const updatedLists = [...historicalData];
            updatedLists.splice(itemIndex, 1);
            setHistoricalData(updatedLists);
            cacheService.setDataToLocalStorage(updatedLists)
        }
    }

    console.log(currentData)

    return (
        <div className={styles.weatherApp}>
            <div className={styles.weatherAppWrap}>
                <div className={styles.header}>
                    <SearchBar onChange={onInputChanged} id="weathersearch" label="City or Country" />
                    <button onClick={() => onSearchClicked()}>Search</button>
                </div>
                {showError && <div>The country or city is invalid</div>}
                <div className={styles.content}>
                    {currentData && <WeatherCard data={currentData} />}
                    <SearchHistoryCard historyData={historicalData} onListDeleteClicked={onListDeleted} onListSearchClicked={onSearchClicked} />
                </div>
            </div>

        </div>)
}

export default WeatherApp;