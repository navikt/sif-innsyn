import dayjs from 'dayjs';

export const mindreTimerEtterInnsendtEnnMaxAntallTimer = (søknadOpprettet: Date, maxAntallTimer: number): boolean => {
    return dayjs().diff(søknadOpprettet, 'hours') <= maxAntallTimer;
};

export const isValidDate = (dateString: string): boolean => dayjs(dateString).isValid();

export const getDatoOgTidTilSlettSøknadString = (dateString?: string): string | undefined => {
    if (dateString && isValidDate(dateString)) {
        return dayjs(dateString).add(72, 'hour').format('D. MMMM YYYY [kl.] HH:mm');
    }
    return '';
};
