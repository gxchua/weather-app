import styles from './WeatherCard.module.scss';
import { ProcessedWeatherData } from '@/models';
import { dateTimeFormattingUtil, stringFormattingUtil } from '@/utils';
import { DateTimeFormats } from '@/constants';


type WeatherCardProp = {
    data: ProcessedWeatherData | null
}

const WeatherCard = ({ data }: WeatherCardProp) => {
    return (
        <div className={styles.weatherCard} >
            {!data && <div className={styles.title} style={{ minHeight: "21vh" }}>Please select a city or country.</div>}
            {data && <div className={styles.weather}>
                <span className={styles.title}>Today's Weather</span>
                <span className={styles.temperature}>{`${data.temp?.toFixed(0)}`}&deg;</span>
                <span className={styles.minMaxTemp}>H: {data.temp_max?.toFixed(0)}&deg; L: {data.temp_min.toFixed(0)}&deg;</span>
                <span className={styles.description}>{stringFormattingUtil.setFirstCharUpperCase(data?.weatherDescription)}</span>
                <span className={styles.text}>{data.name}, {data.countryCode}</span>
                <div className={styles.imageWrap}>
                    <img src="/images/sun.png"></img>
                </div>
            </div>}
            {data && <div className={styles.details}>
                <span className={styles.text}>{dateTimeFormattingUtil.formatUtcString(data.utcTimeStamp, DateTimeFormats.SHORT_DAY_FIRST_12_HOURS)}</span>
                <span className={styles.text}>Humidity: {data.humidity}%</span>
                <span className={styles.text}>{data?.weather}</span>
            </div>}

        </div>
    )
}

export default WeatherCard;