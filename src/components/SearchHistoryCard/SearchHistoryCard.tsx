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

//Define the config of the list here, and pass it to the list component
const setListConfig = (
    data: ProcessedWeatherData,
    onDelete: (id: string) => void,
    onSearchClicked: (query: string) => void): Column[] => {

    return [{
        item: <div className={styles.columnContent}>
            <span className={styles.name}>{`${data.name}, ${data.countryCode}`}</span>
            <span className={styles.date}>{`${dateTimeFormattingUtil.formatUtcString(data.utcTimeStamp, DateTimeFormats.SHORT_DAY_FIRST_12_HOURS)}`}</span>
        </div>,
        class: styles.listFirstColumn
    },
    {
        item: <button className={`${styles.subButton} ${styles.search}`} onClick={() => onSearchClicked(data.name)}>  </button>,
        class: styles.listButtonColumn
    },
    {
        item: <button className={`${styles.subButton} ${styles.delete}`} onClick={() => onDelete(data.id)}> </button>,
        class: styles.listButtonColumn
    }]
}

const SearchHistoryCard = ({ historyData, onListDeleteClicked, onListSearchClicked }: SearchHistoryProp) => {
    return (
        <div className={styles.searchHistoryCard}>
            <div className={styles.title}>Search History</div>
            <div className={styles.listContainer}>
                <div className={styles.listWrap}>
                    {historyData.map((dt, index) => <List key={`${dt.id}-${index}`} id={dt.id} config={setListConfig(dt, onListDeleteClicked, onListSearchClicked)} />)}
                </div>
            </div>
        </div>
    )
}

export default SearchHistoryCard;