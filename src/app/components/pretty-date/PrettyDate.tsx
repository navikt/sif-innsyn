import React from 'react';
import moment from 'moment';

type FormatType = 'date' | 'dateAndTime' | 'dayDateAndTime';

interface Props {
    date: string | Date;
    format?: FormatType;
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

const PrettyDate = ({ date, format = 'date' }: Props) => <span>{getPrettyDate(date, format)}</span>;

export default PrettyDate;
