//A service that consists of function to retrieve or store the historial weather data to the local storage
const dataKey = "weatherhistoricaldata";

const retrieveDataFromLocalStorage = (): string | null => {
    return localStorage.getItem(dataKey);
}

const setDataToLocalStorage = <T>(data: T): void => {
    const stringifyData = JSON.stringify(data);
    localStorage.setItem(dataKey, stringifyData);
};

export default { retrieveDataFromLocalStorage, setDataToLocalStorage }