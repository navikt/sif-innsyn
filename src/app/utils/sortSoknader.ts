import { Søknad } from '../types/apiTypes/søknadTypes';
import dayjs from 'dayjs';

export const sortSoknad = (a: Søknad, b: Søknad): number => {
    const dateA: Date = new Date(a.opprettet);
    const dateB: Date = new Date(b.opprettet);
    if (dateA < dateB) return 1;
    else return -1;
};

export const sortSoknadbyYear = (a: GroppertSøknader, b: GroppertSøknader): number =>
    parseInt(a.år) < parseInt(b.år) ? 1 : -1;

export interface GroppertSøknader {
    år: string;
    søknader: Søknad[];
}

export const groupByYear = (søknader: Søknad[], filter?: number): GroppertSøknader[] => {
    const filtrertSøknader = filter ? søknader.filter((søknad, index) => index <= filter - 1) : søknader;

    const objGruppertSøknaderEtterÅr: Record<string, Søknad[]> = filtrertSøknader.reduce(
        (gruppertSøknaderEtterÅr, søknad) => {
            const år = dayjs(søknad.opprettet).year().toString();
            gruppertSøknaderEtterÅr[år] = (gruppertSøknaderEtterÅr[år] || []).concat(søknad);
            return gruppertSøknaderEtterÅr;
        },
        {} as Record<string, Søknad[]>
    );

    return Object.entries(objGruppertSøknaderEtterÅr)
        .map(([år, søknader]) => ({ år, søknader }))
        .sort(sortSoknadbyYear);
};
