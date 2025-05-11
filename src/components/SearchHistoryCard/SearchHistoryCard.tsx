import { ProcessedWeatherData } from "@/models";
import { List } from '@/components';
import { dateTimeFormattingUtil } from "@/utils";
import { DateTimeFormats } from "@/constants";
import { Column } from "../List/List";
import styles from './SearchHistoryCard.module.scss';

type SearchHistoryProp = {
    historyData: ProcessedWeatherData[]
    onListDeleteClicked: (listId: string) => void
    onListSearchClicked: (query: string) => void
}

//Define the config here, and pass it to the list component
const setListConfig = (
    data: ProcessedWeatherData,
    onDelete: (id: string) => void,
    onSearchClicked: (query: string) => void): Column[] => {

    return [{
        item: <div className={styles.columnContent}>
            <span>{`${data.name}, ${data.countryCode}`}</span>
            <span>{`${dateTimeFormattingUtil.formatUtcString(data.utcTimeStamp, DateTimeFormats.SHORT_DAY_FIRST_12_HOURS)}`}</span>
        </div>,
        class: styles.listFirstColumn
    },
    {
        item: <button className={styles.subButton} onClick={() => onSearchClicked(data.name)}>
            <img src="images/search.png"></img>
        </button>,
        class: styles.listButtonColumn
    },
    {
        item: <button className={styles.subButton} onClick={() => onDelete(data.id)}>
            <img src="images/delete.png"></img>
        </button>,
        class: styles.listButtonColumn
    }]
}

const SearchHistoryCard = ({ historyData, onListDeleteClicked, onListSearchClicked }: SearchHistoryProp) => {
    //32px+ 15vh + 2.5rem + 194.46 (can change) + 60px?
    //--> pass in method api screen sizes. theme and unit test last
    return (
        <div className={styles.searchHistoryCard}>
            <h5 className={styles.title}>Search History</h5>
            <div className={styles.listContainer}>
                <div className={styles.listWrap}>
                    {historyData.map((dt) => <List id={dt.id} config={setListConfig(dt, onListDeleteClicked, onListSearchClicked)} />)}
                </div>
            </div>
        </div>
    )
}

export default SearchHistoryCard;