import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

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

export const getDateTilSlettSøknadString = (dateString?: string): string | undefined => {
    if (dateString && isValidDate(dateString)) {
        return dayjs(dateString).add(72, 'hour').format('D.MM.YYYY [kl.] HH:mm');
    }
    return '';
};
