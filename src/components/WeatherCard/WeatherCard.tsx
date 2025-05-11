import styles from './WeatherCard.module.scss';
import { ProcessedWeatherData } from '@/models';
import { dateTimeFormattingUtil, stringFormattingUtil } from '@/utils';
import { DateTimeFormats } from '@/constants';


type WeatherCardProp = {
    data: ProcessedWeatherData
}

const WeatherCard = ({ data }: WeatherCardProp) => {
    return (
        <div className={styles.weatherCard}>
            <div >
                <h5>Today's Weather</h5>
                <h1>{`${data.temp?.toFixed(0)}`}&deg;</h1>
                <h3>{stringFormattingUtil.setFirstCharUpperCase(data?.weatherDescription)}</h3>
                <h4>H: {data.temp_max?.toFixed(0)}&deg; L: {data.temp_min.toFixed(0)}&deg;</h4>
                <span>{data.name}, {data.countryCode}</span>
                <div className={styles.imageWrap}>
                    <img src="images/sun.png"></img>
                </div>
            </div>
            <div className={styles.details}>
                <span>{dateTimeFormattingUtil.formatUtcString(data.utcTimeStamp, DateTimeFormats.SHORT_DAY_FIRST_12_HOURS)}</span>
                <span>Humidity: {data.humidity}%</span>
                <span>{data?.weather}</span>
            </div>

        </div>
    )
}

export default WeatherCard;