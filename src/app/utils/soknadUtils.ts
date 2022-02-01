import dayjs from 'dayjs';
import _ from 'lodash';
import { Søknad, Søknadstype } from '../types/apiTypes/søknadTypes';

export const erPleiepenger = (søknad: Søknad): boolean => {
    return (
        søknad.søknadstype == Søknadstype.PP_ETTERSENDING ||
        søknad.søknadstype == Søknadstype.PP_SYKT_BARN ||
        søknad.søknadstype == Søknadstype.PP_SYKT_BARN_ENDRINGSMELDING
    );
};

export const søknadstypeErPleiepenger = (type: Søknadstype): boolean => {
    return (
        type === Søknadstype.PP_ETTERSENDING ||
        type === Søknadstype.PP_SYKT_BARN ||
        type === Søknadstype.PP_SYKT_BARN_ENDRINGSMELDING
    );
};

export const getSøknadTitle = (søknad: Søknad, shortVersion?: boolean): string => {
    switch (søknad.søknadstype) {
        case Søknadstype.PP_SYKT_BARN:
            return shortVersion ? 'Søknad' : 'Søknad om pleiepenger';
        case Søknadstype.PP_ETTERSENDING:
            return shortVersion ? 'Ettersending' : 'Melding om ettersending for pleiepenger';
        case Søknadstype.PP_SYKT_BARN_ENDRINGSMELDING:
            return shortVersion ? 'Endringsmelding' : 'Endringsmelding pleiepenger';
    }
};

export const sortSoknad = (a: Søknad, b: Søknad): number => {
    const dateA: Date = new Date(a.opprettet);
    const dateB: Date = new Date(b.opprettet);
    if (dateA < dateB) return 1;
    else return -1;
};

export interface GruppertSøknader {
    år: string;
    søknader: Søknad[];
}

export const sortGruppertSøknaderbyYear = (a: GruppertSøknader, b: GruppertSøknader): number =>
    parseInt(a.år, 10) < parseInt(b.år, 10) ? 1 : -1;

export const groupByYear = (søknader: Søknad[], visAlle: boolean): GruppertSøknader[] =>
    _(søknader)
        .slice(0, visAlle ? undefined : 11)
        .groupBy((søknad: Søknad) => dayjs(søknad.opprettet).year().toString())
        .map((søknader, år) => {
            return {
                år,
                søknader,
            };
        })
        .value()
        .sort(sortGruppertSøknaderbyYear);

export const getSøknadMottattDato = (søknad: Søknad): Date | string => {
    switch (søknad.søknadstype) {
        case Søknadstype.PP_SYKT_BARN:
        case Søknadstype.PP_ETTERSENDING:
            return søknad.søknad.mottatt;
        case Søknadstype.PP_SYKT_BARN_ENDRINGSMELDING:
            return søknad.opprettet;
    }
};
