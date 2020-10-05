import React from 'react';
import moment from 'moment-timezone';

type FormatType = 'date' | 'dateAndTime' | 'dayDateAndTime';

interface Props {
    date: string | Date;
    format?: FormatType;
    useNorwegianTime?: boolean;
}

const getFormatString = (format: FormatType): string => {
    switch (format) {
        case 'date':
            return 'D. MMMM YYYY';
        case 'dateAndTime':
            return 'D. MMMM YYYY, HH:mm';
        case 'dayDateAndTime':
            return 'dddd D. MMMM YYYY, [kl.] HH:mm';
    }
};

export const getPrettyDate = (date: Date | string, format: FormatType = 'date'): string => {
    return moment(date).format(getFormatString(format));
};

export const getPrettyDateNorwegianTime = (date: Date | string, format: FormatType = 'date'): string => {
    return moment(date).tz('Europe/Oslo').format(getFormatString(format));
};

const PrettyDate = ({ date, format = 'date', useNorwegianTime }: Props) => (
    <span>{useNorwegianTime ? getPrettyDate(date, format) : getPrettyDateNorwegianTime(date, format)}</span>
);

export default PrettyDate;
