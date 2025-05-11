//A service that consists of functions to retrieve or store the historial weather data to the local storage

const retrieveDataFromLocalStorage = (key: string): string | null => {
    return localStorage.getItem(key);
}

const setStringToStorage = (value: string, key: string): void => {
    localStorage.setItem(key, value);
}

const setDataToLocalStorage = <T>(data: T, key: string): void => {
    const stringifyData = JSON.stringify(data);
    localStorage.setItem(key, stringifyData);
};

export default { retrieveDataFromLocalStorage, setDataToLocalStorage, setStringToStorage }