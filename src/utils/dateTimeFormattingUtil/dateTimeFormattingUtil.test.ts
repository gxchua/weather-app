import dateTimeFormattingUtil from "./dateTimeFormattingUtil";
import { DateTimeFormats } from "@/constants";

describe('FormatDateTime function', () => {
    it('should format a date using the default format', () => {
        const date = new Date('2023-10-17T12:00:00');
        const formattedDate = dateTimeFormattingUtil.formatDateTime(date);
        const expectedFormattedDate = '17 10 2023';
        expect(formattedDate).toEqual(expectedFormattedDate);
    });

    it('should format a date using the custom format', () => {
        const date = new Date('2023-10-17T12:00:00');
        const customFormat = DateTimeFormats.TIME_24_HOURS;
        const formattedDate = dateTimeFormattingUtil.formatDateTime(date, customFormat);
        const expectedFormattedDate = '12:00'
        expect(formattedDate).toEqual(expectedFormattedDate);
    });
})

