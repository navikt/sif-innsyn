import moment from 'moment';

export const apiDateFormat = 'YYYY-MM-DD';

export const apiStringDateToDate = (date: string): Date => moment.utc(date, apiDateFormat).toDate();

const dateStringToDateObjectMapper = (_: string, value: string) => {
    if (moment(value, moment.ISO_8601).isValid()) {
        return new Date(value);
    }
    if (value && value.match && value.match(/dddd-dd-dd/) && moment(apiStringDateToDate(value)).isValid()) {
        return apiStringDateToDate(value);
    }
    return value;
};

const transformResponse = (storageResponse: string) => {
    if (storageResponse) {
        return JSON.parse(storageResponse, dateStringToDateObjectMapper);
    }
};

export default {
    withCredentials: true,
    transformResponse,
};
