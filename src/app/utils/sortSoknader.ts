import { Søknad } from '../types/apiTypes/søknadTypes';

export const sortSoknad = (a: Søknad, b: Søknad): number => {
    const dateA: Date = new Date(a.opprettet);
    const dateB: Date = new Date(b.opprettet);
    if (dateA < dateB) return 1;
    else return -1;
};
