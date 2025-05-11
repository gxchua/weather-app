import { DateTimeFormats } from "@/constants";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const formatDateTime = (date: Date, format: string = DateTimeFormats.SHORT_DAY_FIRST): string => {
    return dayjs(date).format(format);
}

const formatUtcString = (dateString: string, format: string = DateTimeFormats.SHORT_DAY_FIRST): string => {
    return dayjs.utc(dateString).local()?.format(format);
}


export default { formatDateTime, formatUtcString };