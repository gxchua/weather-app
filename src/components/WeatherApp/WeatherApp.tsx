
import { SearchBar, SearchHistoryCard, WeatherCard } from "@/components";
import { useRef, useState, useEffect } from "react";
import { weatherApiService, weatherDataService, cacheService } from "@/services";
import { LocalStorageKeys } from "@/constants";
import { ProcessedWeatherData } from "@/models";
import styles from './WeatherApp.module.scss';

const Themes = {
    dark: "dark",
    light: "light"
}

const WeatherApp = () => {
    const searchInput = useRef<string>("");
    const [theme, setTheme] = useState<string>("");
    const [currentData, setCurrentData] = useState<ProcessedWeatherData | null>(null);
    const [historicalData, setHistoricalData] = useState<ProcessedWeatherData[]>([]);
    const [showError, setErrorMessage] = useState<string>("");

    useEffect(() => {
        retrieveCacheData();
    }, [])

    useEffect(() => {
        //Set the document theme attribute
        if (!theme) return;
        document.documentElement.setAttribute('data-theme', theme);
        //Stores the updated theme value to local storage
        cacheService.setStringToStorage(theme, LocalStorageKeys.themeKey);
    }, [theme])

    //Retrieve the search history and theme data from local storage
    const retrieveCacheData = (): void => {
        const historicalData: string | null = cacheService.retrieveDataFromLocalStorage(LocalStorageKeys.dataKey);
        const theme: string | null = cacheService.retrieveDataFromLocalStorage(LocalStorageKeys.themeKey);

        if (historicalData) {
            setHistoricalData(JSON.parse(historicalData));
        }

        if (theme) {
            setTheme(theme);
        }
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
            console.error(err);
            setErrorMessage("Failed to retrieve weather data.");
            //Remove the error message after 3 seconds
            setTimeout(() => setErrorMessage(""), 3000);
        }
    };

    //Integrate the enter key for search
    const onEnter = (value: string): void => {
        onSearchClicked(value);
    }

    const storeAndUpdateSearchHistory = (data: ProcessedWeatherData): void => {
        const latestList: ProcessedWeatherData[] = [data, ...historicalData];
        setHistoricalData(latestList);
        cacheService.setDataToLocalStorage(latestList, LocalStorageKeys.dataKey);
    }

    const onInputChanged = (val: string): void => {
        searchInput.current = val;
    }

    const onListDeleted = (id: string): void => {
        const itemIndex = historicalData.findIndex((dt: ProcessedWeatherData) => dt.id === id);
        if (itemIndex !== -1) {
            //Clone the array objects and remove the item from it. Then, update the cache and also the state
            const updatedLists = [...historicalData];
            updatedLists.splice(itemIndex, 1);
            setHistoricalData(updatedLists);
            cacheService.setDataToLocalStorage(updatedLists, LocalStorageKeys.dataKey);
        }
    }

    const toggleTheme = (): void => {
        setTheme(prev => prev === Themes.light ? Themes.dark : Themes.light);
    }

    return (
        <div className={styles.weatherApp}>
            <div className={styles.weatherAppWrap}>
                <div className={styles.header}>
                    <SearchBar onChange={onInputChanged} onEnter={onEnter} id="weathersearch" label="City or Country" className={styles.searchBarCustomClass} />
                    <button className={`${styles.searchButton} ${styles.mainButton}`} onClick={() => onSearchClicked()}></button>
                    <button className={`${styles.mainButton} ${styles.themeToggle}`} onClick={toggleTheme}></button>
                </div>
                {showError && <span className={styles.error}>The country or city is invalid</span>}
                <div className={styles.content}>
                    <WeatherCard data={currentData} />
                    <SearchHistoryCard historyData={historicalData} onListDeleteClicked={onListDeleted} onListSearchClicked={onSearchClicked} />
                </div>
            </div>

        </div>)
}

export default WeatherApp;