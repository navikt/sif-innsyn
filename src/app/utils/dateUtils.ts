import dayjs from 'dayjs';

export const mindreTimerEtterInnsendtEnnMaxAntallTimer = (søknadOpprettet: Date, maxAntallTimer: number): boolean => {
    return dayjs().diff(søknadOpprettet, 'hours') <= maxAntallTimer;
};
