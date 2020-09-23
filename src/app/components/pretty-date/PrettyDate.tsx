import React from 'react';
import moment from 'moment';

type FormatType = 'date' | 'dateAndTime';

interface Props {
    date: string | Date;
    format?: 'date' | 'dateAndTime';
}

const getFormatString = (format: FormatType): string => {
    switch (format) {
        case 'date':
            return 'D. MMMM YYYY';
        case 'dateAndTime':
            return 'D. MMMM YYYY, HH:mm';
    }
};

const PrettyDate = ({ date, format = 'date' }: Props) => <span>{moment(date).format(getFormatString(format))}</span>;

export default PrettyDate;
