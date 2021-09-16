import dayjs from 'dayjs';
import 'dayjs/locale/nb';

export const mindreTimerEtterInnsendtEnnMaxAntallTimer = (søknadOpprettet: Date, maxAntallTimer: number): boolean => {
    return dayjs().diff(søknadOpprettet, 'hours') <= maxAntallTimer;
};

export const isValidDate = (dateString: string): boolean => dayjs(dateString).isValid();

export const getDateStringFromApiDateString = (dateString?: string): string | undefined => {
    return dateString && isValidDate(dateString) ? dayjs(dateString).locale('nb').format('dddd D.MMMM') : undefined;
};

export const getTimeStringFromApiDateString = (dateString?: string): string | undefined => {
    return dateString && isValidDate(dateString) ? dayjs(dateString).format('HH:mm') : undefined;
};
